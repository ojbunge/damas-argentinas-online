const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

let connectedUsers = {}; // { socketId: { username, status, room } }
let activeGames = {};    // { roomName: { w: id, b: id, name, board, turn } }
let activeLabs = {};     // { labRoomName: { ownerId, board, spectators: [usernames] } }
let botRoomCounter = 0;  // contador incremental para nombres de sala de partidas vs. bot (más robusto que Date.now(), que puede repetirse si dos arrancan en el mismo milisegundo)

// --- EL PERÍODO DE GRACIA DE GODOFREDO ---
// Volver al lobby después de una partida recarga la página (ver el
// "location.reload()" del botón "SALIR AL LOBBY"), lo que desconecta el
// socket viejo y reconecta uno nuevo un instante después -- indistinguible,
// desde el punto de vista del servidor, de que alguien realmente se fue del
// sitio. Por eso el aviso de despedida no se manda al toque: se espera un
// ratito (DEPARTURE_GRACE_MS) y, si el MISMO nombre de usuario se vuelve a
// conectar en ese lapso, se cancela -- nunca se fue de verdad, fue un
// reload. Guardado por nombre de usuario (no por socket.id, que cambia en
// cada reconexión).
const pendingDepartureTimers = {}; // { username: timeoutHandle }
const DEPARTURE_GRACE_MS = 4000;

// La posición inicial, igual a la que arranca en el cliente.
// La usamos para que el servidor tenga SIEMPRE una foto válida del tablero,
// aunque todavía no se haya jugado ningún movimiento.
function createInitialBoard() {
    return [
        [null, "b", null, "b", null, "b", null, "b", null, "b"],
        ["b", null, "b", null, "b", null, "b", null, "b", null],
        [null, "b", null, "b", null, "b", null, "b", null, "b"],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        ["w", null, "w", null, "w", null, "w", null, "w", null],
        [null, "w", null, "w", null, "w", null, "w", null, "w"],
        ["w", null, "w", null, "w", null, "w", null, "w", null]
    ];
}

// Si el usuario indicado está espectando una partida, lo saca prolijamente:
// lo borra de la lista de espectadores de esa sala, avisa a esa sala que la
// lista cambió, y lo hace abandonar la room de socket.io correspondiente
// (para que deje de recibir jugadas y demás eventos de esa partida vieja).
function leaveSpectatingIfAny(userId, connectedUsers, activeGames, io) {
    const user = connectedUsers[userId];
    if (user && user.status === "spectating" && user.room && activeGames[user.room]) {
        const game = activeGames[user.room];
        game.spectators = game.spectators.filter(name => name !== user.username);
        io.to(user.room).emit('update-spectators-list', game.spectators);

        const userSocket = io.sockets.sockets.get(userId);
        if (userSocket) userSocket.leave(user.room);
    }
}

// Si el usuario indicado ya estaba JUGANDO una partida (contra un bot, o
// contra otro humano) y está a punto de arrancar una nueva, cierra
// prolijamente la vieja antes de pisarla: avisa a quien la estuviera
// espectando (y al rival humano, si lo había, devolviéndolo al lobby) y la
// borra de activeGames. Sin esto, la sala vieja queda huérfana para
// siempre en "Torneos en Curso", y quien la estuviera espectando se queda
// mirando fijo un tablero que ya nadie va a volver a mover.
function abandonCurrentGameIfAny(userId, connectedUsers, activeGames, io) {
    const user = connectedUsers[userId];
    if (!user || !user.room) return;
    if (user.status !== "playing" && user.status !== "vsbot") return;

    const oldRoom = user.room;
    const game = activeGames[oldRoom];
    if (!game) return;

    if (!game.vsBot) {
        // Era una partida contra otro humano: a ese rival también hay que
        // devolverlo al lobby — no puede quedar "jugando" contra alguien
        // que se fue a aceptar otro desafío.
        const otherId = (game.w === userId) ? game.b : game.w;
        if (connectedUsers[otherId]) {
            connectedUsers[otherId].status = "lobby";
            connectedUsers[otherId].room = null;
        }
    }

    io.to(oldRoom).emit('opponent-left', { leaverName: user.username });
    delete activeGames[oldRoom];
}

// --- EL LABORATORIO: mismo par de funciones, pero para activeLabs ---
// Igual que abandonCurrentGameIfAny/leaveSpectatingIfAny de arriba, pero
// para el laboratorio -- se llaman EXACTAMENTE en los mismos lugares que
// esas dos (challenge-response para ambas partes, join-as-spectator,
// start-bot-game), así que sin importar de dónde venga alguien (dueño de
// un laboratorio, o espectador de uno), queda prolijamente limpio antes
// de arrancar cualquier otra cosa.
function leaveLabIfAny(userId, connectedUsers, activeLabs, io) {
    const user = connectedUsers[userId];
    if (!user || user.status !== "inlab" || !user.room) return;
    const labRoom = user.room;
    if (!activeLabs[labRoom]) return;

    io.to(labRoom).emit('lab-closed');
    delete activeLabs[labRoom];
}

function leaveLabSpectatingIfAny(userId, connectedUsers, activeLabs, io) {
    const user = connectedUsers[userId];
    if (user && user.status === "spectating" && user.room && activeLabs[user.room]) {
        const lab = activeLabs[user.room];
        lab.spectators = lab.spectators.filter(name => name !== user.username);
        io.to(user.room).emit('lab-spectators-update', lab.spectators);

        const userSocket = io.sockets.sockets.get(userId);
        if (userSocket) userSocket.leave(user.room);
    }
}

// --- EL CUERVO MENSAJERO DE GODOFREDO (Chat del Salón) ---
// Un feed único y global (no por partida) con los mensajes de los jugadores
// y los avisos automáticos del sistema (desafíos aceptados, espectadores,
// llegadas, victorias). Guardamos solo los últimos 30 en memoria: alcanza
// de sobra para el scroll hacia atrás, y no hace falta base de datos.
let chatHistory = [];
const CHAT_HISTORY_LIMIT = 30;
const CHAT_MAX_LENGTH = 300;

function pushChatMessage(io, msg) {
    chatHistory.push(msg);
    if (chatHistory.length > CHAT_HISTORY_LIMIT) chatHistory.shift();
    io.emit('chat-message', msg);
}

function pushSystemMessage(io, text) {
    pushChatMessage(io, { type: 'system', text: text, time: Date.now() });
}

// Mandamos a TODOS los conectados con su status (lobby / spectating /
// playing / vsbot). El cliente decide qué mostrar como "desafiable" en
// el Salón (todos menos los que están jugando contra un humano), pero
// necesita conocer también a los que están jugando para poder resaltar
// @menciones a ellos en el chat. botName y room solo importan para los
// que están en 'vsbot' (etiqueta "(vs. Nombre)" y el modal de
// desafiar-o-espectar), pero no cuesta nada mandarlos siempre.
//
// A nivel de MÓDULO (no adentro de io.on('connection', ...) como
// estaba antes) -- ahí adentro no era alcanzable desde afuera del
// closure de conexión, y handleTimeExpired (más abajo, también a nivel
// de módulo) la necesita para poder avisarle al lobby que la partida
// terminó por tiempo. Esta era la causa exacta del crash que reportó
// Otto ("ReferenceError: broadcastStatus is not defined"): apenas el
// reloj de alguien se agotaba, el servidor se caía entero al intentar
// llamar a una función que, desde ese punto del código, no existía.
function broadcastStatus() {
    const allUsers = Object.values(connectedUsers)
        .map(u => ({ username: u.username, status: u.status, botName: u.botName, room: u.room }));

    // Las partidas contra un bot NO entran acá: ya son accesibles
    // clickeando el nombre del jugador (desafiar/espectar), así que
    // listarlas también acá sería mostrar lo mismo dos veces. "Torneos
    // en Curso" queda reservado a los duelos humano contra humano.
    const games = Object.keys(activeGames)
        .filter(id => !activeGames[id].vsBot)
        .map(id => ({
            id: id,
            name: activeGames[id].name
        }));

    io.emit('update-lobby', { users: allUsers, games: games });
}

// ===================================================================
//  EL RELOJ DE ARENA DE GODOFREDO (modo contrarreloj)
// ===================================================================
// El servidor es la ÚNICA fuente de verdad del tiempo -- ni un cliente
// ni el otro deciden nunca cuándo alguien se quedó sin tiempo, solo lo
// escuchan. Cada partida con reloj (game.timeControl !== null) guarda:
//   - game.clocks: { w: ms, b: ms } -- el tiempo que le quedaba a cada
//     color la ÚLTIMA vez que se hizo esta cuenta (una "foto", no el
//     valor exacto de ahora mismo si el reloj de alguien sigue corriendo).
//   - game.turnStartedAt: Date.now() de cuándo arrancó el turno actual.
//   - game.timeoutHandle: el setTimeout ya armado para el instante
//     exacto en que el que tiene el turno llegaría a cero, si es que
//     nunca llega a mover antes de eso.
// Con esos dos datos (game.clocks + game.turnStartedAt) se puede
// calcular en cualquier momento el tiempo REAL que le queda a cada
// color, sin tener que estar actualizando nada a cada segundo.

// Devuelve el tiempo REAL vigente ahora mismo para cada color (o null
// si esta partida no tiene reloj) -- resta el tiempo transcurrido
// desde turnStartedAt SOLO al color que tiene el turno; el otro color
// no tiene su reloj corriendo, así que su valor no cambia.
function getLiveClocks(game) {
    if (!game || !game.timeControl) return null;
    const elapsed = Date.now() - game.turnStartedAt;
    const live = { w: game.clocks.w, b: game.clocks.b };
    live[game.turn] = Math.max(0, live[game.turn] - elapsed);
    return live;
}

function clearClockTimeout(game) {
    if (game && game.timeoutHandle) {
        clearTimeout(game.timeoutHandle);
        game.timeoutHandle = null;
    }
}

// Programa (reemplazando cualquier temporizador anterior) el instante
// exacto en que el color que tiene el turno ahora llegaría a cero, si
// es que no mueve antes.
function armClockTimeout(room) {
    const game = activeGames[room];
    if (!game || !game.timeControl) return;
    clearClockTimeout(game);
    const color = game.turn;
    const remaining = game.clocks[color];
    game.timeoutHandle = setTimeout(() => handleTimeExpired(room, color), remaining);
}

// Se ejecuta cuando el temporizador de arriba efectivamente vence sin
// que haya llegado ninguna jugada antes -- game.concluded ya puede
// estar en true acá (por ejemplo, si la partida se resolvió de otra
// forma un instante antes y este temporizador quedó viejo sin que
// llegáramos a cancelarlo a tiempo); en ese caso no hacemos nada.
function handleTimeExpired(room, color) {
    const game = activeGames[room];
    if (!game || game.concluded) return;
    game.concluded = true;
    game.clocks[color] = 0;

    const winnerColor = (color === 'w') ? 'b' : 'w';
    const winnerId = game[winnerColor];
    const loserId = game[color];
    const winnerName = connectedUsers[winnerId]?.username;
    const loserName = connectedUsers[loserId]?.username;

    // Mismo cartel para los dos jugadores (y espectadores): no hace
    // falta un mensaje distinto por bando, "fulano se quedó sin
    // tiempo" ya cuenta toda la historia sola.
    io.to(room).emit('game-over-by-time', { winnerColor, winnerName, loserName });

    if (winnerName && loserName) {
        pushSystemMessage(io, `⏱️ ${winnerName} le ha ganado por tiempo a ${loserName}`);
    }

    // --- GODOFREDO LOS DEVUELVE AL SALÓN --- (mismo patrón que surrender/game-over)
    if (connectedUsers[game.w]) { connectedUsers[game.w].status = "lobby"; connectedUsers[game.w].room = null; connectedUsers[game.w].botName = null; }
    if (connectedUsers[game.b]) { connectedUsers[game.b].status = "lobby"; connectedUsers[game.b].room = null; connectedUsers[game.b].botName = null; }

    delete activeGames[room];
    broadcastStatus();
}

io.on('connection', (socket) => {

    socket.on('set-username', (data) => {
        const username = data.username;
        connectedUsers[socket.id] = { username: username, status: "lobby", room: null };

        // Si había un aviso de despedida pendiente para este mismo
        // nombre, lo cancelamos: se acaba de reconectar a tiempo, así
        // que nunca se fue de verdad (fue un reload al volver al lobby
        // después de una partida, no un cierre de pestaña).
        if (pendingDepartureTimers[username]) {
            clearTimeout(pendingDepartureTimers[username]);
            delete pendingDepartureTimers[username];
        }

        // Le mandamos el historial reciente del chat antes que nada
        socket.emit('chat-history', chatHistory);

        // Y anunciamos su llegada -- pero SOLO la primera vez que este
        // jugador entra en su sesión de navegador (isFirstArrival lo
        // decide el cliente, mirando si ya tenía el nombre guardado de
        // antes). Si está volviendo al lobby después de terminar una
        // partida, no corresponde anunciarlo de nuevo -- eso pasaba
        // todo el tiempo y llenaba el chat de avisos poco relevantes.
        if (data.isFirstArrival) {
            pushSystemMessage(io, `🛡️ ${username} ha llegado al Castillo`);
        }

        broadcastStatus();
    });

    // data: { targetUsername, timeControl } -- timeControl es null para
    // modo normal, o { initialMs } para modo contrarreloj. Quien desafía
    // es SIEMPRE quien decide la modalidad (y, si corresponde, los
    // minutos) -- el servidor acá solo retransmite tal cual, sin validar
    // ni interpretar nada; la validación de rango (1 a 15 minutos) ya
    // pasó del lado del cliente que arma el desafío.
    socket.on('send-challenge', (data) => {
        const targetId = Object.keys(connectedUsers).find(id => connectedUsers[id].username === data.targetUsername);
        if (targetId) {
            io.to(targetId).emit('receive-challenge', {
                fromName: connectedUsers[socket.id].username,
                fromId: socket.id,
                timeControl: data.timeControl || null
            });
        }
    });

    // --- EL MENSAJERO QUE DA MEDIA VUELTA (cancelar un desafío ya enviado) ---
    // Mismo mecanismo de búsqueda que send-challenge: el que cancela solo sabe
    // el nombre del destinatario, no su socket id. Si el destinatario ya no
    // está conectado, simplemente no hay a quién avisarle (no pasa nada).
    socket.on('cancel-challenge', (targetUsername) => {
        const targetId = Object.keys(connectedUsers).find(id => connectedUsers[id].username === targetUsername);
        if (targetId) {
            io.to(targetId).emit('challenge-canceled', { fromId: socket.id, fromName: connectedUsers[socket.id]?.username });
        }
    });

    socket.on('challenge-response', (data) => {
        if (data.accepted) {
            const challengerId = data.fromId;

            // Guarda defensiva: si cualquiera de las dos partes no está
            // registrada (nunca mandó set-username todavía, o el
            // desafiante se desconectó justo antes de que le
            // respondieran), no seguimos -- sin esto, el servidor entero
            // se caía al intentar leer el nombre de alguien que no existe
            // en connectedUsers, tumbando la partida de TODOS los
            // conectados por una carrera de tiempos de una sola persona.
            if (!connectedUsers[challengerId] || !connectedUsers[socket.id]) return;

            const roomName = `room_${challengerId}_${socket.id}`;

            // Si alguna de las dos partes venía espectando otra partida, la
            // sacamos prolijamente de ahí antes de meterla en la sala nueva.
            // Y si alguna ya estaba JUGANDO otra partida (vs. bot o vs. otro
            // humano) que dejó a medias para aceptar este desafío, cerramos
            // esa vieja prolijamente también.
            leaveSpectatingIfAny(challengerId, connectedUsers, activeGames, io);
            leaveSpectatingIfAny(socket.id, connectedUsers, activeGames, io);
            abandonCurrentGameIfAny(challengerId, connectedUsers, activeGames, io);
            abandonCurrentGameIfAny(socket.id, connectedUsers, activeGames, io);
            // Si cualquiera de las dos partes estaba en su laboratorio (o
            // espectando el de otro), lo cerramos/lo sacamos prolijamente
            // antes de meterlo en la partida nueva -- así se cumple lo que
            // pidió Otto: aceptar un desafío abandona el laboratorio solo.
            leaveLabIfAny(challengerId, connectedUsers, activeLabs, io);
            leaveLabIfAny(socket.id, connectedUsers, activeLabs, io);
            leaveLabSpectatingIfAny(challengerId, connectedUsers, activeLabs, io);
            leaveLabSpectatingIfAny(socket.id, connectedUsers, activeLabs, io);

            // Crear la sala (con su propia foto de tablero, arrancando en posición inicial)
            // timeControl: null en modo normal. Cuando sí viene informado
            // ({ initialMs }), es una partida contrarreloj -- lo decide
            // siempre quien desafía, elegido en el modal correspondiente
            // (ver openChallengeModalityModal / trySendTimedChallenge en
            // index.html). Se arman los relojes de los dos colores con ese
            // mismo valor inicial, y el de Blancas arranca a correr de
            // entrada, antes incluso de su primer movimiento (así se
            // definió: nadie tiene una jugada "gratis" sin reloj).
            const timeControl = data.timeControl || null;
            activeGames[roomName] = {
                w: challengerId,
                b: socket.id,
                name: `${connectedUsers[challengerId].username} vs ${connectedUsers[socket.id].username}`,
                board: createInitialBoard(),
                turn: "w",
                spectators: [], // <--- GODOFREDO PREPARA LA LISTA DE INVITADOS
                moveHistory: [], // <--- LA CRÓNICA DEL MENSAJERO: arranca en blanco
                timeControl: timeControl,
                clocks: timeControl ? { w: timeControl.initialMs, b: timeControl.initialMs } : null,
                turnStartedAt: timeControl ? Date.now() : null,
                timeoutHandle: null
            };
            if (timeControl) armClockTimeout(roomName);

            // Actualizar estados Y ROLES en el censo (Vital para la desconexión)
            connectedUsers[challengerId].status = "playing";
            connectedUsers[challengerId].room = roomName;
            connectedUsers[challengerId].role = "w"; // <--- GODOFREDO ANOTA EL ROL

            connectedUsers[socket.id].status = "playing";
            connectedUsers[socket.id].room = roomName;
            connectedUsers[socket.id].role = "b"; // <--- GODOFREDO ANOTA EL ROL

            // Unirlos a la sala
            const challengerSocket = io.sockets.sockets.get(challengerId);
            if (challengerSocket) challengerSocket.join(roomName);
            socket.join(roomName);

            // Avisar roles e iniciar
            const gameInfo = {
                roomName: roomName,
                white: connectedUsers[challengerId].username,
                black: connectedUsers[socket.id].username,
                board: activeGames[roomName].board,
                turn: activeGames[roomName].turn,
                timeControl: timeControl,
                clocks: getLiveClocks(activeGames[roomName])
            };

            io.to(challengerId).emit('assign-role', 'w');
            io.to(socket.id).emit('assign-role', 'b');
            io.to(roomName).emit('start-game', gameInfo);

            pushSystemMessage(io, `⚔️ ${gameInfo.white} desafía a ${gameInfo.black} a duelo`);

            broadcastStatus();
        } else {
            io.to(data.fromId).emit('challenge-declined', connectedUsers[socket.id].username);
        }
    });

    // --- LÓGICA DE ESPECTADOR ---
    socket.on('join-as-spectator', (roomName) => {
        const game = activeGames[roomName];
        if (game) {
            // Si ya estaba espectando otra partida, lo sacamos prolijamente de
            // ahí antes de meterlo en esta (para no quedar "fantasma" en dos salas).
            leaveSpectatingIfAny(socket.id, connectedUsers, activeGames, io);
            leaveLabIfAny(socket.id, connectedUsers, activeLabs, io);
            leaveLabSpectatingIfAny(socket.id, connectedUsers, activeLabs, io);

            socket.join(roomName);
            connectedUsers[socket.id].status = "spectating";
            connectedUsers[socket.id].room = roomName;
            connectedUsers[socket.id].role = "spectator";

            // --- GODOFREDO ANOTA AL VISITANTE ---
            const username = connectedUsers[socket.id].username;
            if (!game.spectators.includes(username)) {
                game.spectators.push(username);
            }

            const gameInfo = {
                white: connectedUsers[game.w]?.username,
                // Contra un bot no hay un segundo socket real (game.b es null):
                // el nombre viene directo del propio registro de la partida.
                black: game.vsBot ? game.botName : connectedUsers[game.b]?.username,
                board: game.board,
                turn: game.turn,
                moveHistory: game.moveHistory || [], // <--- EL MENSAJERO LE CUENTA LO YA JUGADO
                vsBot: game.vsBot || false,
                botId: game.botId || null,
                // El valor REAL vigente ahora mismo (no la última foto guardada):
                // si no se calculara así, un espectador que se suma a mitad de
                // partida vería el reloj de quien tiene el turno "congelado" en
                // el valor de la última jugada, en vez del tiempo que de verdad
                // le queda en este instante.
                timeControl: game.timeControl || null,
                clocks: getLiveClocks(game)
            };

            socket.emit('assign-role', 'spectator');
            socket.emit('start-game', gameInfo);

            // Avisamos a todos en la sala (incluidos jugadores) que la lista cambió
            io.to(roomName).emit('update-spectators-list', game.spectators);

            pushSystemMessage(io, `👀 ${username} está espectando el duelo ${game.name}`);

            broadcastStatus();
        }
    });

    // --- LA ARENA CONTRA UN BOT ---
    // El "cerebro" del bot vive 100% en el cliente (ver bots.js) — acá el
    // servidor solo necesita saber que la partida existe, para poder
    // listarla en "Torneos en Curso" y dejar que alguien la espectee.
    // Reutilizamos activeGames y toda la maquinaria existente
    // (player-surrendered, disconnect, sync-board-state...) tratando al
    // bot como un "segundo jugador" sin socket real: game.b queda en
    // null, marcado con vsBot:true. No se anuncia en el chat global (a
    // diferencia de un desafío entre humanos) para no llenarlo de ruido.
    socket.on('start-bot-game', (data) => {
        const user = connectedUsers[socket.id];
        if (!user) return;

        const botId = data?.botId;
        const botName = data?.botName;
        const botLevel = data?.botLevel;
        if (!botId || !botName) return;

        // Si venía espectando otra partida, lo sacamos prolijamente de ahí primero.
        leaveSpectatingIfAny(socket.id, connectedUsers, activeGames, io);
        // Y si ya estaba jugando otra (vs. bot o vs. humano) sin cerrar, la cerramos.
        abandonCurrentGameIfAny(socket.id, connectedUsers, activeGames, io);
        leaveLabIfAny(socket.id, connectedUsers, activeLabs, io);
        leaveLabSpectatingIfAny(socket.id, connectedUsers, activeLabs, io);

        // Contador incremental en el nombre de sala: acá solo hay UN socket
        // real involucrado (a diferencia de un desafío entre dos ids
        // distintos), así que sin esto una revancha inmediata contra el
        // mismo bot podría generar el mismo nombre de sala que la partida
        // recién borrada (Date.now() puede repetirse si pasa poco tiempo).
        const roomName = `botroom_${socket.id}_${++botRoomCounter}`;

        activeGames[roomName] = {
            w: socket.id,
            b: null,
            vsBot: true,
            botId: botId,
            botName: botName,
            botLevel: botLevel,
            name: `${user.username} vs ${botName}`,
            board: createInitialBoard(),
            turn: "w",
            spectators: [],
            moveHistory: []
        };

        connectedUsers[socket.id].status = "vsbot";
        connectedUsers[socket.id].room = roomName;
        connectedUsers[socket.id].role = "w";
        connectedUsers[socket.id].botName = botName;

        socket.join(roomName);

        socket.emit('assign-role', 'w');
        socket.emit('start-game', {
            roomName: roomName,
            white: user.username,
            black: botName,
            board: activeGames[roomName].board,
            turn: "w",
            vsBot: true,
            botId: botId
        });

        broadcastStatus();
    });

    // --- EL LABORATORIO ---
    // A diferencia de una partida, acá no hay reglas que validar del lado
    // del servidor: es UNA sola persona manejando las dos fichas a su
    // antojo, así que el servidor no necesita saber nada de captura
    // obligatoria ni de turnos -- solo guarda la última foto del tablero
    // (para poder mandársela a quien se sume después) y la retransmite en
    // vivo a los espectadores. Reutiliza connectedUsers y broadcastStatus
    // tal cual, tratando "estar en el laboratorio" como una tercera forma
    // de estar ocupado, junto a "jugando" y "jugando contra un bot".
    socket.on('enter-lab', () => {
        const user = connectedUsers[socket.id];
        if (!user) return;

        leaveSpectatingIfAny(socket.id, connectedUsers, activeGames, io);
        abandonCurrentGameIfAny(socket.id, connectedUsers, activeGames, io);
        leaveLabIfAny(socket.id, connectedUsers, activeLabs, io);
        leaveLabSpectatingIfAny(socket.id, connectedUsers, activeLabs, io);

        const labRoom = `lab_${socket.id}`;
        activeLabs[labRoom] = {
            ownerId: socket.id,
            board: Array.from({ length: 10 }, () => Array(10).fill(null)),
            spectators: []
        };

        connectedUsers[socket.id].status = "inlab";
        connectedUsers[socket.id].room = labRoom;
        connectedUsers[socket.id].role = "labOwner";

        socket.join(labRoom);
        broadcastStatus();
    });

    // El dueño del laboratorio manda la foto actualizada del tablero cada
    // vez que coloca, saca o mueve una ficha -- la guardamos y se la
    // retransmitimos a quien esté espectando (nunca al dueño mismo, que
    // ya tiene el tablero al día del lado suyo).
    socket.on('sync-lab-board', (data) => {
        const user = connectedUsers[socket.id];
        if (!user || user.status !== "inlab" || !user.room) return;
        const lab = activeLabs[user.room];
        if (!lab) return;

        lab.board = data.board;
        socket.to(user.room).emit('lab-board-update', { board: lab.board });
    });

    // Alguien se suma a mirar un laboratorio ajeno -- mismo mecanismo que
    // join-as-spectator, pero apuntando a activeLabs en vez de
    // activeGames, y sin nada de turno/reloj/crónica (el laboratorio no
    // tiene ninguna de esas cosas).
    socket.on('join-lab-spectator', (labRoom) => {
        const lab = activeLabs[labRoom];
        if (!lab) {
            socket.emit('lab-not-found');
            return;
        }

        leaveSpectatingIfAny(socket.id, connectedUsers, activeGames, io);
        leaveLabSpectatingIfAny(socket.id, connectedUsers, activeLabs, io);

        socket.join(labRoom);
        connectedUsers[socket.id].status = "spectating";
        connectedUsers[socket.id].room = labRoom;
        connectedUsers[socket.id].role = "spectator";

        const username = connectedUsers[socket.id].username;
        if (!lab.spectators.includes(username)) {
            lab.spectators.push(username);
        }

        socket.emit('lab-init', {
            board: lab.board,
            ownerName: connectedUsers[lab.ownerId]?.username
        });

        io.to(labRoom).emit('lab-spectators-update', lab.spectators);
        broadcastStatus();
    });

    socket.on('make-move', (data) => {
        const room = connectedUsers[socket.id]?.room;
        if (room) {
            socket.to(room).emit('move-received', data);
        }
    });

    // --- LA FOTO ACTUALIZADA DE GODOFREDO ---
    // Evento separado de 'make-move': no se retransmite a nadie, solo actualiza
    // la foto que el servidor guarda de la partida. Así, cuando un espectador
    // (o un jugador reconectando) se une, el servidor ya sabe cómo está el
    // tablero de verdad, en vez de tener que esperar al próximo movimiento.
    socket.on('sync-board-state', (data) => {
        const room = connectedUsers[socket.id]?.room;
        if (room && activeGames[room]) {
            const game = activeGames[room];

            // --- EL RELOJ DE ARENA: contabilizar el tiempo real gastado ---
            // Comparamos contra game.turn (el valor ANTES de esta sincronización)
            // -- si es igual a data.currentPlayer, es un salto intermedio de
            // una captura múltiple (el mismo jugador sigue moviendo, el turno
            // no pasó de verdad todavía) y no tocamos el reloj para nada. Solo
            // cuando de verdad cambia le restamos al que jugó el tiempo que
            // usó, y le rearmamos el temporizador de vencimiento al que le
            // toca ahora. Guardamos el resultado en una variable ANTES de
            // reasignar game.turn más abajo, y la reusamos para decidir si
            // corresponde rearmar+sincronizar -- si no, un salto intermedio
            // reprogramaría igual el temporizador (con el mismo valor, pero
            // calculado desde un "ahora" un poquito más tardío), regalándole
            // al jugador unos milisegundos gratis en cada salto.
            const turnActuallyChanged = game.timeControl && data.currentPlayer !== game.turn;
            if (turnActuallyChanged) {
                const moverColor = game.turn;
                const elapsed = Date.now() - game.turnStartedAt;
                game.clocks[moverColor] = Math.max(0, game.clocks[moverColor] - elapsed);
                game.turnStartedAt = Date.now();
            }

            game.board = data.boardState;
            game.turn = data.currentPlayer;
            if (data.lastMoveEntry) {
                if (!game.moveHistory) game.moveHistory = [];
                game.moveHistory.push(data.lastMoveEntry);
            }

            if (turnActuallyChanged) {
                armClockTimeout(room);
                // A TODOS en la sala (jugadores Y espectadores), no solo al
                // rival -- todos tienen que ver los dos relojes en vivo.
                io.to(room).emit('clock-sync', { clocks: game.clocks, turn: game.turn });
            }
        }
    });

    socket.on('disconnect', () => {
        const user = connectedUsers[socket.id];
        if (user) {
            if (user.room && activeGames[user.room]) {
                if (user.role === 'w' || user.role === 'b') {
                    // --- EL PREGÓN DEL MENSAJERO (quién abandonó, quién gana) ---
                    // Lo calculamos ANTES de borrar la sala: así el rival Y
                    // los espectadores del balcón (ambos siguen en esta room
                    // de socket.io) reciben el nombre de quien se fue y el de
                    // quien gana por abandono, en vez de un aviso genérico.
                    const game = activeGames[user.room];
                    const winnerId = (user.role === 'w') ? game.b : game.w;
                    const winnerName = connectedUsers[winnerId]?.username;
                    clearClockTimeout(game); // si había reloj corriendo, no hace falta que siga armado
                    socket.to(user.room).emit('opponent-left', {
                        leaverName: user.username,
                        winnerName: winnerName
                    });
                    delete activeGames[user.room];
                } else if (user.role === 'spectator') {
                    // --- GODOFREDO BORRA AL VISITANTE QUE SE VA ---
                    const game = activeGames[user.room];
                    game.spectators = game.spectators.filter(name => name !== user.username);
                    io.to(user.room).emit('update-spectators-list', game.spectators);
                }
            } else if (user.room && activeLabs[user.room]) {
                if (user.role === 'labOwner') {
                    // El dueño se fue -- el laboratorio se cierra, y quien
                    // lo estuviera espectando se entera (ver lab-closed en
                    // laboratorio.html, que lo devuelve al lobby).
                    io.to(user.room).emit('lab-closed');
                    delete activeLabs[user.room];
                } else if (user.role === 'spectator') {
                    const lab = activeLabs[user.room];
                    lab.spectators = lab.spectators.filter(name => name !== user.username);
                    io.to(user.room).emit('lab-spectators-update', lab.spectators);
                }
            }
            if (pendingDepartureTimers[user.username]) clearTimeout(pendingDepartureTimers[user.username]);
            pendingDepartureTimers[user.username] = setTimeout(() => {
                pushSystemMessage(io, `🚪 ${user.username} se ha ido del Castillo`);
                delete pendingDepartureTimers[user.username];
            }, DEPARTURE_GRACE_MS);
            delete connectedUsers[socket.id];
            broadcastStatus();
        }
    });

    socket.on('player-surrendered', () => {
        const user = connectedUsers[socket.id];
        if (user && user.room) {
            // Guardamos el nombre de sala en su propia variable ANTES de
            // tocar nada más. 'user' es el MISMO objeto que
            // connectedUsers[game.w] o connectedUsers[game.b] (quien se
            // rinde es uno de los dos jugadores) — así que resetear su
            // .room más abajo, si siguiéramos leyendo de user.room al
            // final, terminaría borrando activeGames[null] en vez de la
            // sala real, dejándola huérfana para siempre en "Torneos en
            // Curso" aunque el censo ya mostrara a ambos como libres.
            const room = user.room;

            console.log(`El caballero ${user.username} ha tirado la toalla.`);
            // Avisamos al otro jugador (y a espectadores) en la sala,
            // mandando quién se rindió: así el que lo recibe arma el
            // mensaje correcto sin tener que adivinarlo a partir de su
            // propio color, que es lo que hacía el cliente antes y le daba
            // vuelta los nombres a los espectadores cuando se rendían las Negras.
            socket.to(room).emit('opponent-surrendered', { loserName: user.username });

            // Anunciamos la victoria en el chat (una sola vez por partida)
            const game = activeGames[room];
            if (game && !game.concluded) {
                game.concluded = true;
                clearClockTimeout(game); // si había reloj corriendo, no hace falta que siga armado
                const winnerId = (user.role === 'w') ? game.b : game.w;
                const winnerName = connectedUsers[winnerId]?.username;
                if (winnerName) {
                    pushSystemMessage(io, `🏆 ${winnerName} ha derrotado a ${user.username}`);
                }

                // --- GODOFREDO LOS DEVUELVE AL SALÓN ---
                // La partida terminó: ambos vuelven a estar "libres" en el censo
                // (antes quedaban con status "playing" para siempre, invisible
                // porque el único botón post-partida recargaba la página; ahora
                // que existe el botón de Revancha, hace falta que el lobby los
                // vuelva a mostrar como disponibles de verdad).
                if (connectedUsers[game.w]) { connectedUsers[game.w].status = "lobby"; connectedUsers[game.w].room = null; connectedUsers[game.w].botName = null; }
                if (connectedUsers[game.b]) { connectedUsers[game.b].status = "lobby"; connectedUsers[game.b].room = null; connectedUsers[game.b].botName = null; }
            }

            // La partida terminó: la sacamos de "Torneos en Curso"
            delete activeGames[room];
            broadcastStatus();
        }
    });

    // --- LA CRÓNICA DE GODOFREDO ---
    // Cuando un cliente detecta localmente que la partida terminó "de forma
    // natural" (captura total o bloqueo, a diferencia de la rendición, que
    // ya se maneja arriba), nos avisa acá para anunciarlo en el chat. Como
    // AMBOS jugadores detectan el mismo final de forma independiente en sus
    // pantallas, los dos van a mandar este evento — por eso usamos la bandera
    // "concluded" para asegurarnos de anunciarlo una sola vez.
    socket.on('game-over', (data) => {
        const room = connectedUsers[socket.id]?.room;
        const game = activeGames[room];
        if (game && !game.concluded) {
            game.concluded = true;
            clearClockTimeout(game); // si había reloj corriendo, no hace falta que siga armado

            if (data.winner === 'draw') {
                const whiteName = connectedUsers[game.w]?.username;
                const blackName = connectedUsers[game.b]?.username;
                if (whiteName && blackName) {
                    pushSystemMessage(io, `🤝 ${whiteName} y ${blackName} han empatado`);
                }
            } else {
                const winnerId = (data.winner === 'w') ? game.w : game.b;
                const loserId = (data.winner === 'w') ? game.b : game.w;
                const winnerName = connectedUsers[winnerId]?.username;
                const loserName = connectedUsers[loserId]?.username;
                if (winnerName && loserName) {
                    pushSystemMessage(io, `🏆 ${winnerName} ha derrotado a ${loserName}`);
                }
            }

            // --- GODOFREDO LOS DEVUELVE AL SALÓN --- (ver mismo comentario en player-surrendered)
            if (connectedUsers[game.w]) { connectedUsers[game.w].status = "lobby"; connectedUsers[game.w].room = null; connectedUsers[game.w].botName = null; }
            if (connectedUsers[game.b]) { connectedUsers[game.b].status = "lobby"; connectedUsers[game.b].room = null; connectedUsers[game.b].botName = null; }

            // La partida terminó: la sacamos de "Torneos en Curso"
            delete activeGames[room];
            broadcastStatus();
        }
    });

    // --- EL CUERVO MENSAJERO: mensajes de chat de los propios jugadores ---
    socket.on('chat-message', (data) => {
        const user = connectedUsers[socket.id];
        if (!user) return; // todavía no puso su nombre

        const text = String(data?.text || '').slice(0, CHAT_MAX_LENGTH).trim();
        if (!text) return;

        pushChatMessage(io, {
            type: 'user',
            username: user.username,
            text: text,
            time: Date.now()
        });
    });

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`--- TORNEO REAL ONLINE ---`));
