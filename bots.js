// ============================================================
//  LOS GUERREROS DE LA SALA DE ARMAS
// ============================================================
// Datos de los 10 personajes que representan los niveles de dificultad
// de los bots (1 = más fácil, 10 = más difícil), los tiempos con los que
// el bot "piensa" y mueve en pantalla, y al final El Pregonero: el
// detector de los momentos de la partida que los personajes comentan
// (sus frases viven en bot-dialogue.js). El motor que decide las jugadas
// vive aparte, en bot-engine.js: lo corre bot-worker.js, en un hilo
// aparte del de la página, y la configuración de cada nivel está ahí
// (BOT_LEVEL_CONFIG, cuya clave es el campo level de cada personaje).
// Este archivo vive separado de index.html a propósito, para no seguir
// engordando el archivo principal. Lo carga solo index.html, después de
// bot-engine.js: el Pregonero usa countTotalPieces y STARTING_PIECE_COUNT
// de ahí.
//
// El nombre, la historia y las descripciones de cada personaje se
// pueden cambiar cuando se quiera, sin que eso afecte en nada la
// arquitectura de abajo. El id, en cambio, conviene no tocarlo: es con
// lo que la Arena identifica a cada bot, y la clave de sus frases en
// bot-dialogue.js.
//
// Cada bot espera su imagen de perfil en:
//   assets/bots/<id>.jpg
// Todas las imágenes son cuadradas (ancho == alto), aunque de
// resoluciones distintas entre sí. Si el archivo todavía no existe,
// la Sala de Armas muestra un ícono de reemplazo (🛡️) en su lugar —
// no hace falta placeholder.jpg ni nada especial: simplemente subís el
// archivo con el nombre correcto a assets/bots/ y aparece solo, sin
// tocar código.

const BOT_CHARACTERS = [
    {
        id: "neanderthalius",
        level: 1,
        name: "Neanderthalius",
        image: "assets/bots/neanderthalius.jpg",
        description: "Desde el albor de los tiempos llega nuestro más primitivo participante, un ejemplar de homínido que se preservó congelado en un glaciar durante 300.000 años. Junta palitos, golpea piedras y ahora también juega a las damas. Comele las fichas antes de que se las coma él. Si te gana probablemente seas el eslabón perdido.",
        description_en: "From the dawn of time comes our most primitive contender, a specimen of hominid preserved frozen in a glacier for 300,000 years. He gathers sticks, bangs rocks together, and now also plays checkers. Eat his pieces before he eats them himself. If you lose to him, you're probably the missing link."
    },
    {
        id: "termidor",
        level: 2,
        name: "Monsieur Fisure Termidor",
        image: "assets/bots/termidor.jpg",
        description: "Un jugador que sólo sirve para desafiar a altas horas de la madrugada cuando vas por el quinto fernet, como mínimo, para que la cosa sea pareja. Este desaliñado noble asegura con total convicción que juega mejor cuando está \u201cun poquito entonado\u201d, pero nunca lo sabremos ya que el estado de ebriedad en el que vive supera ampliamente esa medida. ¡Salud!",
        description_en: "A player only worth challenging in the small hours of the morning, once you're at least five fernets in, just to keep things even. This disheveled nobleman insists, with total conviction, that he plays better when \u201ca little tipsy,\u201d but we'll never know for sure, since the state of drunkenness he lives in far exceeds that measure. Cheers!"
    },
    {
        id: "aquitapia",
        level: 3,
        name: "Leonor de Aquitapia",
        image: "assets/bots/aquitapia.jpg",
        description: "La tenebrosa reina del predio de Ezeiza y organizadora oficial de los torneos del reino, jura que todos ellos han sido perfectamente transparentes. Una dama con más asados que impedimentos morales; en días de calor aparecen siervos por detrás suyo y le secan la nuca. ¡Investigá sus habilidades!",
        description_en: "The fearsome queen of the Ezeiza grounds and official organizer of the kingdom's tournaments, who swears every single one of them has been perfectly transparent. A lady with more barbecues than moral qualms; on hot days, servants appear behind her to fan the back of her neck. Look into her skills!"
    },
    {
        id: "marolio",
        level: 4,
        name: "Fray Marolio",
        image: "assets/bots/marolio.jpg",
        description: "Religioso encargado de la despensa de nuestro castillo, Marolio está desde el comienzo del día entrenando para las damas y apilando paté, caballa, arroz y arvejas, sardinas y atún, choclo y lentejas. Sus habilidades en el juego son como los productos que maneja: de bajo presupuesto.",
        description_en: "The friar in charge of our castle's pantry, Marolio has been training for checkers since the crack of dawn, all while stacking paté, mackerel, rice and peas, sardines and tuna, corn and lentils. His skills at the game are just like the products he stocks: bargain-bin."
    },
    {
        id: "icardio",
        level: 5,
        name: "Icardio de Milán",
        image: "assets/bots/icardio.jpg",
        description: "Aficionado a las damas desde hace mucho tiempo (al juego de mesa lo acaba de descubrir), este agraciado juglar es experto en comer reinas ajenas y, apenas logres tener una, intentará arrebatártela sin escrúpulos — así que nunca te fíes de él. Ideal para jugar en el día del amigo.",
        description_en: "A longtime fan of the ladies — he only just discovered the board game. This charming minstrel is an expert at taking other men's queens, and the moment you manage to get one, he'll try to snatch her away without a shred of scruple — so never trust him. Perfect for playing on Friend's Day."
    },
    {
        id: "empecid",
        level: 6,
        name: "Empecid Campeador",
        image: "assets/bots/empecid.jpg",
        description: "Aromático caballero que galopa por las planicies del reino en busca de rivales que no le huyan. Su olor a pata es tan abrumador que a veces se siente hasta por internet y provoca que las fichas se capturen solas intentando escapar de él. Intentará erradicarte del tablero como erradicó a los moros de España, aunque también se dice que huyeron ellos solos por el olor.",
        description_en: "A fragrant knight who gallops across the kingdom's plains in search of rivals who won't run from him. His foot odor is so overwhelming that it can sometimes be sensed even over the internet, causing pieces to capture themselves just trying to escape him. He'll try to wipe you off the board the way he wiped the Moors from Spain — though it's also said they simply fled on their own, on account of the smell."
    },
    {
        id: "myrthlagrande",
        level: 7,
        name: "Myrth La Grande",
        image: "assets/bots/myrthlagrande.jpg",
        description: "Myrth La Grande es realmente muy grande, por no decir vieja. La reina madre de nuestro castillo, siempre sentada a la cabecera de su mesa, es culta y refinada, pero también mordaz e incisiva, lo que se muestra tanto en sus comentarios como en su juego. Hay quien dice que tuvo a un dinosaurio de mascota y que envenena a sus invitados. ¡Desafiala en su propia me-sa-za!",
        description_en: "Myrth La Grande is, as her name suggests, great — as much as she is old. The queen mother of our castle, always seated at the head of her table, is cultured and refined, but also sharp-tongued and incisive, which comes through both in her remarks and in her play. Some say she once kept a dinosaur as a pet, and that she poisons her guests. Challenge her at her own giant table!"
    },
    {
        id: "godofredo",
        level: 8,
        name: "Godofredo",
        image: "assets/bots/godofredo.jpg",
        description: "El mítico peón que fuera protagonista en la construcción de este castillo —encontrarás referencias a él a lo largo de todo el código del sitio— deja la pala y el martillo a un lado, se pone la armadura y empuña la espada, decidido a demostrar que él también sabe combatir y que conocer la arena como nadie le da una ventaja sobre otros participantes. ¡A la orden, mi señor!",
        description_en: "The legendary pawn who starred in the building of this very castle — you'll find references to him throughout the site's entire code — sets aside his shovel and hammer, dons his armor, and takes up his sword, determined to prove that he too knows how to fight, and that knowing the arena like no other gives him an edge over the other contenders. At your command, my lord!"
    },
    {
        id: "mariaeugenia",
        level: 9,
        name: "Princesa María Eugenia de China",
        image: "assets/bots/mariaeugenia.jpg",
        description: "Esta avezada doncella china de sangre japonesa conoce a la perfección todos los movimientos que una dama debe realizar para que cualquier afamado caballero caiga en su trampa. No te distraigas con su belleza, o cuando te quieras acordar se habrá llevado la mitad de tus fichas.",
        description_en: "This seasoned maiden, Chinese by nationality and Japanese by blood, knows to perfection every move a lady must make to lure even the most famous knight into her trap. Don't get distracted by her beauty, or before you know it she'll have carried off half your pieces."
    },
    {
        id: "carlosaulmagno",
        level: 10,
        name: "Carlosaúlmagno",
        image: "assets/bots/carlosaulmagno.jpg",
        description: "Este carismático caballero proveniente del lejano reino de Anillaco parece invencible, pero tiene momentos en que su mente se remonta a la estratósfera, momentos que tendrás que aprovechar para ganar el 1 a 1. No dejes que su corta estatura te engañe: es capaz de todo con tal de ganar, y si no puede hacerlo privatizará el tablero. ¡Seguilo, no te va a defraudar!",
        description_en: "This charismatic knight, hailing from the distant realm of Anillaco, seems unbeatable — but there are moments when his mind drifts off into the stratosphere, moments you'll need to seize to win it one-for-one. Don't let his short stature fool you: he's capable of anything to win, and if he can't, he'll privatize the board. Follow him, he won't let you down!"
    }
];

function getBotById(id) {
    return BOT_CHARACTERS.find(b => b.id === id) || null;
}

// ============================================================
//  EL RETRASO PENSATIVO DEL BOT
// ============================================================
// Con el motor corriendo en un Web Worker (ver bot-worker.js), el
// cálculo real ya varía naturalmente según la complejidad de la
// posición — no hace falta simular una demora artificial grande encima.
// Esto es solo un PISO mínimo (con un poco de variación) para que ni
// siquiera el nivel 1, que calcula casi instantáneo, se sienta
// robóticamente inmediato. Si el cálculo real tarda más que este piso
// (los niveles profundos, en posiciones complejas), no se le suma nada
// encima — el tiempo de espera total es el que ya tardó pensando de
// verdad, no piso + cálculo. Con el modo lento (🐢) prendido, la Arena
// usa en su lugar un piso más largo (SLOW_MODE_MIN_MS y
// SLOW_MODE_MAX_MS, en index.html), con la misma cuenta.
// Tocá estos dos números directamente si querés ajustar la sensación,
// no hace falta pedírmelo.
const BOT_THINK_FLOOR_MS = 700;       // piso mínimo, en milisegundos
const BOT_THINK_JITTER_MS = 400;      // variación aleatoria por encima del piso

function getBotThinkFloor() {
    return BOT_THINK_FLOOR_MS + Math.random() * BOT_THINK_JITTER_MS;
}

// Pausa entre cada salto de una captura múltiple del bot (para que se vea
// como una cadena de jugadas, no un salto instantáneo de punta a punta).
// Independiente del "retraso pensativo" de arriba, que solo aplica antes
// del PRIMER salto del turno.
const BOT_HOP_DELAY_MS = 550;

// ============================================================
//  EL PREGONERO — reacciones de los personajes durante la partida
// ============================================================
// Motor de DETECCIÓN de eventos "dignos de comentario" durante una
// partida contra un bot (una captura múltiple, una coronación, un
// marcador que se desnivela mucho y se sostiene, etc.) — para que cada
// personaje pueda reaccionar con una frase propia (algunos, incluso,
// con un sonido propio en vez de texto -- ver bot-dialogue.js). Este
// archivo SOLO detecta qué pasó y le pone una etiqueta — no sabe nada
// de qué dice cada personaje ni de cómo se muestra en pantalla; eso
// vive aparte, en bot-dialogue.js (el contenido) e index.html (la
// presentación: el globo de diálogo junto al retrato del personaje,
// ver botSpeak y showBotSpeechBubble). Lo llama solamente la pantalla
// del humano que juega; los espectadores reciben la frase ya elegida.
//
// Mismo espíritu "sin memoria propia" que el motor (bot-engine.js):
// esta función no guarda nada entre llamadas — recibe el estado de la
// vez anterior como parámetro, y devuelve el estado actualizado para
// que el llamador (index.html) lo guarde y se lo vuelva a pasar en la
// próxima jugada, tal como ya se hace con moveHistory y compañía.

// Los dieciséis eventos (los tres desenlaces, los doce de mitad de
// partida y el saludo inicial), con su prioridad (1 = se prioriza
// primero). Si en una misma jugada calificara más de uno a la vez (por
// ejemplo, una captura múltiple que además corona), se elige uno solo —
// nunca se muestra más de un comentario por jugada.
const COMMENTARY_EVENTS = {
    // Los tres desenlaces de la partida tienen prioridad absoluta -- si
    // la jugada que se acaba de jugar terminó el partido, ninguno de
    // los doce eventos "de mitad de partida" de más abajo compite con
    // ellos (ver el parámetro gameEndedWinner en detectCommentaryEvent,
    // que directamente devuelve uno de estos tres sin llegar a mirar el
    // resto). El orden entre ellos tres no importa, porque son
    // mutuamente excluyentes -- un partido no puede terminar de dos
    // formas distintas a la vez.
    VICTORIA: { priority: 1 },
    DERROTA: { priority: 2 },
    EMPATE: { priority: 3 },

    CORONACION_SUFRIDA: { priority: 4 },
    CORONACION_PROPIA: { priority: 5 },
    CAPTURA_MULTIPLE_SUFRIDA: { priority: 6 },
    CAPTURA_MULTIPLE_PROPIA: { priority: 7 },
    TODO_DAMAS: { priority: 8 },
    POCAS_FICHAS_EN_DESVENTAJA: { priority: 9 },
    DIFERENCIA_GRANDE_EN_CONTRA: { priority: 10 },
    DIFERENCIA_GRANDE_A_FAVOR: { priority: 11 },
    PARIDAD_POCAS_FICHAS: { priority: 12 },
    PARTIDO_LARGO: { priority: 13 },
    INICIO_HOSTILIDADES: { priority: 14 },
    COMENTARIO_ALEATORIO: { priority: 15 },

    // INICIO_PARTIDA no pasa nunca por el arbitraje de prioridad de acá
    // abajo -- index.html lo dispara aparte, directo (botSpeak), justo al
    // arrancar la partida (antes de que exista ningún turno del que
    // hablar). Nunca puede coincidir con ningún otro evento, así que el
    // número de prioridad es puramente decorativo/documentación.
    INICIO_PARTIDA: { priority: 16 }
};

// Números ajustables a mano, todos juntos acá para que sea fácil
// retocarlos sin tener que buscar entre la lógica de detección.
const DIFERENCIA_GRANDE_UMBRAL = 3;              // fichas de diferencia para considerarla "grande"
const DIFERENCIA_GRANDE_TURNOS_SOSTENIDOS = 2;   // cuántos turnos seguidos tiene que sostenerse para contar
const POCAS_FICHAS_DESVENTAJA_MAX_FICHAS = 4;    // el bot tiene que tener esta cantidad o menos...
const POCAS_FICHAS_DESVENTAJA_MIN_DIFERENCIA = 3; // ...Y estar perdiendo por al menos esta diferencia
const PARIDAD_POCAS_FICHAS_CANTIDAD = 4;         // ambos lados con esta cantidad exacta
const PARTIDO_LARGO_UMBRAL_JUGADAS = 110;
const COMENTARIO_ALEATORIO_MIN_JUGADAS = 15;
const COMENTARIO_ALEATORIO_MAX_JUGADAS = 25;

// Estado inicial: se crea una vez al empezar una partida contra un bot,
// y se le va pasando de ida y vuelta a detectCommentaryEvent en cada
// jugada. Si el llamador arranca un partido nuevo, tiene que volver a
// llamar a esta función — nunca reciclar el estado de un partido
// anterior.
function createInitialCommentaryState() {
    return {
        sustainedDiff: { direction: null, count: 0 },
        allKingsFired: false,
        hostilitiesFired: false,
        longGameFired: false,
        pocasFichasDesventajaPrev: false,
        paridadPocasFichasPrev: false,
        movesSinceRandomComment: 0,
        nextRandomThreshold: COMENTARIO_ALEATORIO_MIN_JUGADAS + Math.floor(Math.random() * (COMENTARIO_ALEATORIO_MAX_JUGADAS - COMENTARIO_ALEATORIO_MIN_JUGADAS + 1))
    };
}

function countPiecesByColor(boardForSearch, color) {
    let count = 0;
    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
            const piece = boardForSearch[r][c];
            if (piece && piece.toLowerCase() === color) count++;
        }
    }
    return count;
}

// true si hay al menos una pieza en el tablero y NINGUNA es peón (de
// cualquiera de los dos colores). Una vez que esto es verdad, se queda
// siendo verdad el resto de la partida (las piezas solo se capturan,
// nunca "descoronan"), así que alcanza con dispararlo una sola vez.
function boardIsAllKings(boardForSearch) {
    let hasAnyPiece = false;
    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
            const piece = boardForSearch[r][c];
            if (!piece) continue;
            hasAnyPiece = true;
            if (piece === piece.toLowerCase()) return false; // es un peón
        }
    }
    return hasAnyPiece;
}

// board: el tablero YA CON el turno completo aplicado (index.html llama
//     a esta función desde changeTurn(), apenas termina el turno).
// turnHops: los saltos de ESTE turno nada más (para un movimiento
//     simple, un solo elemento; para una captura múltiple, uno por cada
//     escalón de la cadena) — cada uno con AL MENOS {captured, crowned},
//     que es exactamente la forma de las entradas que index.html ya
//     agrega a moveHistory. El llamador arma este array tomando la cola
//     de moveHistory (las últimas entradas consecutivas del mismo
//     color que se acaba de mover).
// moverColor: 'w' o 'b', quién jugó este turno.
// botColor: el color que juega el bot (el contrario del que eligió el
//     humano en la Sala de Armas; index.html pasa currentBotColor).
// moveNumber: cuántas jugadas van en total en la partida hasta ahora
//     (alcanza con pasar moveHistory.length).
// state: el estado devuelto la vez anterior (o createInitialCommentaryState()
//     si es la primera jugada del partido).
// gameEndedWinner: undefined/null mientras la partida sigue en curso, o
//     'w' | 'b' | 'draw' si la jugada que se acaba de jugar TERMINÓ la
//     partida (index.html ya sabe esto por su propio checkGameOver, y
//     nos lo pasa acá). Cuando viene informado, se devuelve VICTORIA,
//     DERROTA o EMPATE directamente, sin ni siquiera calcular el resto
//     de los doce eventos de mitad de partido — no hace falta, porque
//     estos tres tienen prioridad absoluta y siempre le ganarían igual.
//
// Devuelve { event, state }: event es el código de UN evento (o null si
// no pasó nada digno de comentario esta jugada), y state es el estado
// actualizado para la próxima llamada.
function detectCommentaryEvent(board, turnHops, moverColor, botColor, moveNumber, state, gameEndedWinner) {
    const newState = {
        ...state,
        sustainedDiff: { ...state.sustainedDiff }
    };

    if (gameEndedWinner) {
        let event;
        if (gameEndedWinner === "draw") event = "EMPATE";
        else if (gameEndedWinner === botColor) event = "VICTORIA";
        else event = "DERROTA";
        return { event, state: newState };
    }

    const opponentColor = (botColor === "w") ? "b" : "w";
    const candidates = [];

    // --- Eventos instantáneos, ligados a los saltos de este turno ---
    const wasMultipleCapture = turnHops.length >= 2 && turnHops.every(h => h.captured);
    const didCrown = turnHops.some(h => h.crowned);

    if (moverColor === opponentColor) {
        if (didCrown) candidates.push("CORONACION_SUFRIDA");
        if (wasMultipleCapture) candidates.push("CAPTURA_MULTIPLE_SUFRIDA");
    } else if (moverColor === botColor) {
        if (didCrown) candidates.push("CORONACION_PROPIA");
        if (wasMultipleCapture) candidates.push("CAPTURA_MULTIPLE_PROPIA");
    }

    // --- Eventos de estado del tablero ---
    const botPieces = countPiecesByColor(board, botColor);
    const oppPieces = countPiecesByColor(board, opponentColor);
    const diff = botPieces - oppPieces; // positivo = a favor del bot

    if (boardIsAllKings(board) && !newState.allKingsFired) {
        candidates.push("TODO_DAMAS");
        newState.allKingsFired = true;
    }

    const pocasFichasDesventajaNow =
        botPieces <= POCAS_FICHAS_DESVENTAJA_MAX_FICHAS &&
        (oppPieces - botPieces) >= POCAS_FICHAS_DESVENTAJA_MIN_DIFERENCIA;
    if (pocasFichasDesventajaNow && !newState.pocasFichasDesventajaPrev) {
        candidates.push("POCAS_FICHAS_EN_DESVENTAJA");
    }
    newState.pocasFichasDesventajaPrev = pocasFichasDesventajaNow;

    // Diferencia grande sostenida: solo dispara EXACTAMENTE cuando el
    // contador llega al umbral de turnos seguidos (no antes, y no se
    // repite en los turnos posteriores mientras se mantenga la misma
    // racha — para eso habría que perderla y que vuelva a aparecer).
    let currentDirection = null;
    if (diff >= DIFERENCIA_GRANDE_UMBRAL) currentDirection = "favor";
    else if (diff <= -DIFERENCIA_GRANDE_UMBRAL) currentDirection = "contra";

    if (currentDirection && currentDirection === newState.sustainedDiff.direction) {
        newState.sustainedDiff.count += 1;
    } else {
        newState.sustainedDiff = { direction: currentDirection, count: currentDirection ? 1 : 0 };
    }
    if (newState.sustainedDiff.count === DIFERENCIA_GRANDE_TURNOS_SOSTENIDOS) {
        if (newState.sustainedDiff.direction === "favor") candidates.push("DIFERENCIA_GRANDE_A_FAVOR");
        else if (newState.sustainedDiff.direction === "contra") candidates.push("DIFERENCIA_GRANDE_EN_CONTRA");
    }

    const paridadPocasFichasNow = botPieces === PARIDAD_POCAS_FICHAS_CANTIDAD && oppPieces === PARIDAD_POCAS_FICHAS_CANTIDAD;
    if (paridadPocasFichasNow && !newState.paridadPocasFichasPrev) {
        candidates.push("PARIDAD_POCAS_FICHAS");
    }
    newState.paridadPocasFichasPrev = paridadPocasFichasNow;

    if (moveNumber >= PARTIDO_LARGO_UMBRAL_JUGADAS && !newState.longGameFired) {
        candidates.push("PARTIDO_LARGO");
        newState.longGameFired = true;
    }

    if (countTotalPieces(board) < STARTING_PIECE_COUNT && !newState.hostilitiesFired) {
        candidates.push("INICIO_HOSTILIDADES");
        newState.hostilitiesFired = true;
    }

    // Comentario aleatorio: el contador avanza en TODAS las jugadas
    // (propias y del rival por igual, ya que es puro "ambiente" y no
    // depende de quién jugó), y dispara al llegar al umbral sorteado
    // — que se vuelve a sortear para la próxima vez.
    newState.movesSinceRandomComment += 1;
    if (newState.movesSinceRandomComment >= newState.nextRandomThreshold) {
        candidates.push("COMENTARIO_ALEATORIO");
        newState.movesSinceRandomComment = 0;
        newState.nextRandomThreshold = COMENTARIO_ALEATORIO_MIN_JUGADAS + Math.floor(Math.random() * (COMENTARIO_ALEATORIO_MAX_JUGADAS - COMENTARIO_ALEATORIO_MIN_JUGADAS + 1));
    }

    // --- Se elige UNA sola por prioridad ---
    if (candidates.length === 0) return { event: null, state: newState };
    candidates.sort((a, b) => COMMENTARY_EVENTS[a].priority - COMMENTARY_EVENTS[b].priority);
    return { event: candidates[0], state: newState };
}
