const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

// Página de Términos de Uso, en su propia ruta (según lo recomendado para
// que sea un link "de verdad", no solo un modal dentro del juego).
app.get('/terminos', (req, res) => {
    res.sendFile(path.join(__dirname, 'terminos.html'));
});

let connectedUsers = {}; // { socketId: { username, status, room } }
let activeGames = {};    // { roomName: { w: id, b: id, name, board, turn } }

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

io.on('connection', (socket) => {

    socket.on('set-username', (username) => {
        connectedUsers[socket.id] = { username: username, status: "lobby", room: null };

        // Le mandamos el historial reciente del chat antes que nada
        socket.emit('chat-history', chatHistory);

        // Y anunciamos su llegada (esto sí lo va a recibir también él mismo,
        // como mensaje en vivo, ya que io.emit llega a todos los conectados)
        pushSystemMessage(io, `🛡️ ${username} se encuentra en el Salón de los Caballeros`);

        broadcastStatus();
    });

    socket.on('send-challenge', (targetUsername) => {
        const targetId = Object.keys(connectedUsers).find(id => connectedUsers[id].username === targetUsername);
        if (targetId) {
            io.to(targetId).emit('receive-challenge', { fromName: connectedUsers[socket.id].username, fromId: socket.id });
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
            const roomName = `room_${challengerId}_${socket.id}`;

            // Si alguna de las dos partes venía espectando otra partida, la
            // sacamos prolijamente de ahí antes de meterla en la sala nueva.
            leaveSpectatingIfAny(challengerId, connectedUsers, activeGames, io);
            leaveSpectatingIfAny(socket.id, connectedUsers, activeGames, io);

            // Crear la sala (con su propia foto de tablero, arrancando en posición inicial)
            activeGames[roomName] = {
                w: challengerId,
                b: socket.id,
                name: `${connectedUsers[challengerId].username} vs ${connectedUsers[socket.id].username}`,
                board: createInitialBoard(),
                turn: "w",
                spectators: [], // <--- GODOFREDO PREPARA LA LISTA DE INVITADOS
                moveHistory: [] // <--- LA CRÓNICA DEL MENSAJERO: arranca en blanco
            };

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
                turn: activeGames[roomName].turn
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
                white: connectedUsers[game.w].username,
                black: connectedUsers[game.b].username,
                board: game.board,
                turn: game.turn,
                moveHistory: game.moveHistory || [] // <--- EL MENSAJERO LE CUENTA LO YA JUGADO
            };

            socket.emit('assign-role', 'spectator');
            socket.emit('start-game', gameInfo);

            // Avisamos a todos en la sala (incluidos jugadores) que la lista cambió
            io.to(roomName).emit('update-spectators-list', game.spectators);

            pushSystemMessage(io, `👀 ${username} está espectando el duelo ${game.name}`);

            broadcastStatus();
        }
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
            activeGames[room].board = data.boardState;
            activeGames[room].turn = data.currentPlayer;
            if (data.lastMoveEntry) {
                if (!activeGames[room].moveHistory) activeGames[room].moveHistory = [];
                activeGames[room].moveHistory.push(data.lastMoveEntry);
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
            }
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
            // Avisamos al otro jugador en la sala
            socket.to(room).emit('opponent-surrendered');

            // Anunciamos la victoria en el chat (una sola vez por partida)
            const game = activeGames[room];
            if (game && !game.concluded) {
                game.concluded = true;
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
                if (connectedUsers[game.w]) { connectedUsers[game.w].status = "lobby"; connectedUsers[game.w].room = null; }
                if (connectedUsers[game.b]) { connectedUsers[game.b].status = "lobby"; connectedUsers[game.b].room = null; }
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
            const winnerId = (data.winner === 'w') ? game.w : game.b;
            const loserId = (data.winner === 'w') ? game.b : game.w;
            const winnerName = connectedUsers[winnerId]?.username;
            const loserName = connectedUsers[loserId]?.username;
            if (winnerName && loserName) {
                pushSystemMessage(io, `🏆 ${winnerName} ha derrotado a ${loserName}`);
            }

            // --- GODOFREDO LOS DEVUELVE AL SALÓN --- (ver mismo comentario en player-surrendered)
            if (connectedUsers[game.w]) { connectedUsers[game.w].status = "lobby"; connectedUsers[game.w].room = null; }
            if (connectedUsers[game.b]) { connectedUsers[game.b].status = "lobby"; connectedUsers[game.b].room = null; }

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

    function broadcastStatus() {
        // Mandamos a TODOS los conectados con su status (lobby / spectating /
        // playing). El cliente decide qué mostrar como "desafiable" en el
        // Salón (todos menos los que están jugando), pero necesita conocer
        // también a los que están jugando para poder resaltar @menciones
        // a ellos en el chat.
        const allUsers = Object.values(connectedUsers)
            .map(u => ({ username: u.username, status: u.status }));

        const games = Object.keys(activeGames).map(id => ({
            id: id,
            name: activeGames[id].name
        }));

        io.emit('update-lobby', { users: allUsers, games: games });
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`--- TORNEO REAL ONLINE ---`));
