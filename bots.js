// ============================================================
//  LOS GUERREROS DE LA SALA DE ARMAS
// ============================================================
// Datos de los 10 personajes que representan los niveles de dificultad
// de los bots (1 = más fácil, 10 = más difícil). Este archivo vive
// separado de index.html a propósito: es puro dato + los puntos de
// enganche del motor, para no seguir engordando el archivo principal.
//
// IMPORTANTE: el "cerebro" que decide las jugadas del bot TODAVÍA NO
// EXISTE — ver getBotMove() al final de este archivo. Por ahora este
// archivo es el elenco y el esqueleto, no el motor. Eso queda para una
// próxima vuelta.
//
// Personajes provisorios (tal como aclaró Otto): pueden cambiar de
// nombre, historia o temática más adelante sin que eso afecte en nada
// la arquitectura de abajo.
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
        description: "Desde el albor de los tiempos llega nuestro más primitivo participante, un ejemplar de homínido que se preservó congelado en un glaciar durante 300.000 años. Junta palitos, golpea piedras y ahora también juega a las damas. Comele las fichas antes de que se las coma él. Si perdés contra él probablemente seas el eslabón perdido."
    },
    {
        id: "termidor",
        level: 2,
        name: "Monsieur Fisure Termidor",
        image: "assets/bots/termidor.jpg",
        description: "Un jugador que sólo sirve para desafiar a altas horas de la madrugada cuando vas por el quinto fernet, como mínimo, para que la cosa sea pareja. Este desaliñado noble asegura con total convicción que juega mejor cuando está \u201cun poquito entonado\u201d, pero nunca lo sabremos ya que el estado de ebriedad en el que vive supera ampliamente esa medida. ¡Salud!"
    },
    {
        id: "aquitapia",
        level: 3,
        name: "Leonor de Aquitapia",
        image: "assets/bots/aquitapia.jpg",
        description: "La tenebrosa reina del predio de Ezeiza y organizadora oficial de los torneos del reino, jura que todos ellos han sido perfectamente transparentes. Una dama con más asados que impedimentos morales; en días de calor aparecen siervos por detrás suyo y le secan la nuca. ¡Investigá sus habilidades!"
    },
    {
        id: "marolio",
        level: 4,
        name: "Fray Marolio",
        image: "assets/bots/marolio.jpg",
        description: "Religioso encargado de la despensa de nuestro castillo, Marolio está desde el comienzo del día entrenando para las damas y apilando paté, caballa, arroz y arvejas, sardinas y atún, choclo y lentejas. Sus habilidades en el juego son como los productos que maneja: de bajo presupuesto."
    },
    {
        id: "icardio",
        level: 5,
        name: "Icardio de Milán",
        image: "assets/bots/icardio.jpg",
        description: "Aficionado a las damas desde hace mucho tiempo (al juego de mesa lo acaba de descubrir), este agraciado juglar es experto en comer reinas ajenas y, apenas logres tener una, intentará arrebatártela sin escrúpulos — así que nunca te fíes de él. Ideal para jugar en el día del amigo."
    },
    {
        id: "empecid",
        level: 6,
        name: "Empecid Campeador",
        image: "assets/bots/empecid.jpg",
        description: "Aromático caballero que galopa por las planicies del reino en busca de rivales que no le huyan. Su olor a pata es tan abrumador que a veces se siente hasta por internet y provoca que las fichas se capturen solas intentando escapar de él. Intentará erradicarte del tablero como erradicó a los moros de España, aunque también se dice que huyeron ellos solos por el olor."
    },
    {
        id: "loraprodigio",
        level: 7,
        name: "Lora Prodigio",
        image: "assets/bots/loraprodigio.jpg",
        description: "El pájaro más inteligente y malhablado de las redes sociales trae sus legendarias puteadas a nuestro castillo, intentando desconcentrarte con cuanta frase picante se cruce por su pico. Esta hábil y locuaz jugadora lo dará todo a cambio de unas pipas, y si te gana, habrás perdido contra un animal. ¡A tomar por culo!"
    },
    {
        id: "godofredo",
        level: 8,
        name: "Godofredo",
        image: "assets/bots/godofredo.jpg",
        description: "El mítico peón que fuera protagonista en la construcción de este castillo —encontrarás referencias a él a lo largo de todo el código del sitio— deja la pala y el martillo a un lado, se pone la armadura y empuña la espada, decidido a demostrar que él también sabe combatir y que conocer la arena como nadie le da una ventaja sobre otros participantes. ¡A la orden, mi señor!"
    },
    {
        id: "mariaeugenia",
        level: 9,
        name: "Princesa María Eugenia de China",
        image: "assets/bots/mariaeugenia.jpg",
        description: "Esta avezada doncella china de sangre japonesa conoce a la perfección todos los movimientos que una dama debe realizar para que cualquier afamado caballero caiga en su trampa. No te distraigas con su belleza, o cuando te quieras acordar se habrá llevado la mitad de tus fichas."
    },
    {
        id: "carlosaulmagno",
        level: 10,
        name: "Carlosaúlmagno",
        image: "assets/bots/carlosaulmagno.jpg",
        description: "Este carismático caballero proveniente del lejano reino de Anillaco parece invencible, pero tiene momentos en que su mente se remonta a la estratósfera, momentos que tendrás que aprovechar para ganar el 1 a 1. No dejes que su corta estatura te engañe: es capaz de todo con tal de ganar, y si no puede hacerlo privatizará el tablero. ¡Seguilo, no te va a defraudar!"
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
// verdad, no piso + cálculo.
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
//  EL CEREBRO DEL BOT
// ============================================================
// Motor compartido por los 10 niveles: minimax con poda alfa-beta sobre
// una función de evaluación, combinado con ruido deliberado en los
// niveles más flojos. Reutiliza el motor de reglas de index.html
// (getLegalMoves, getBestCaptureSequences) en vez de reimplementarlo —
// así el bot queda 100% atado a las mismas reglas que ya rigen las
// partidas humanas, sin posibilidad de que diverjan con el tiempo.
//
// Todo lo de acá abajo es deliberadamente "puro": ninguna función toca
// el DOM, sockets, ni las variables globales de la partida en curso
// (board/currentPlayer/etc de index.html). Reciben el tablero como
// parámetro y devuelven una decisión — eso es lo que las hace testeables
// de forma aislada (incluso desde Node, sin navegador) y reutilizables
// tanto para una partida real como para el simulador de auto-partidas
// que se usa para calibrar cada nivel.

function cloneBoard(sourceBoard) {
    return sourceBoard.map(row => row.slice());
}

// Dado un tablero y una pieza puntual que YA capturó al menos una vez
// (o que todavía no capturó ninguna), devuelve TODAS las secuencias
// COMPLETAS de captura máxima posibles desde ahí — a diferencia de
// getBestCaptureSequences(), que solo devuelve el/los primer(os) salto(s)
// (es lo que necesita el juego humano, que avanza click a click). Acá
// necesitamos la cadena entera de una sola vez, porque en el árbol de
// búsqueda un turno completo (por más saltos que tenga) es UNA sola
// jugada — el rival no "responde" en el medio de nuestra propia cadena.
//
// Devuelve un array de secuencias, cada una un array de saltos
// {row, col, capturedRow, capturedCol}. Si la pieza no tiene ninguna
// captura disponible, devuelve [[]] (una única secuencia vacía) — así el
// llamador no tiene que tratar "sin captura" como un caso especial.
function expandCaptureSequences(boardForSearch, row, col, isKing) {
    const result = getBestCaptureSequences(row, col, boardForSearch, isKing);
    if (result.max === 0) return [[]];

    const allFullSequences = [];

    result.sequences.forEach(hop => {
        const originalPiece = boardForSearch[row][col];
        const originalEnemy = boardForSearch[hop.capturedRow][hop.capturedCol];

        // --- SIMULACIÓN (mismo patrón que getBestCaptureSequences) ---
        boardForSearch[hop.row][hop.col] = originalPiece;
        boardForSearch[row][col] = null;
        boardForSearch[hop.capturedRow][hop.capturedCol] = null;

        const isWhiteCoronation = originalPiece === "w" && hop.row === 0;
        const isBlackCoronation = originalPiece === "b" && hop.row === 9;

        if (isWhiteCoronation || isBlackCoronation) {
            // La coronación corta la secuencia en el acto (misma regla que
            // ya aplica getBestCaptureSequences) — este salto es el último.
            allFullSequences.push([hop]);
        } else {
            const continuations = expandCaptureSequences(boardForSearch, hop.row, hop.col, isKing);
            continuations.forEach(rest => {
                allFullSequences.push([hop, ...rest]);
            });
        }

        // --- DESHACER ---
        boardForSearch[row][col] = originalPiece;
        boardForSearch[hop.row][hop.col] = null;
        boardForSearch[hop.capturedRow][hop.capturedCol] = originalEnemy;
    });

    return allFullSequences;
}

// Enumera TODAS las jugadas completas legales de un jugador en un
// tablero dado — un "turno entero", no un solo salto. Reimplementa la
// misma orquestación que getGlobalBestMoves() de index.html (captura
// obligatoria, prioridad de dama sobre peón, máxima captura), pero
// parametrizada por tablero (no depende del board global) y devolviendo
// secuencias COMPLETAS en vez de solo el primer salto — las dos cosas
// que getGlobalBestMoves() no puede darnos tal como está, porque está
// pensada para la UI humana (que avanza de a un click), no para un
// árbol de búsqueda.
//
// Cada jugada devuelta tiene la forma:
//   { type: 'simple', from: {row,col}, to: {row,col} }
//   { type: 'capture-sequence', from: {row,col}, hops: [{row,col,capturedRow,capturedCol}, ...] }
function enumerateFullMoves(boardForSearch, player) {
    let kingCaptureInfos = [];
    let pawnCaptureInfos = [];
    let maxKingCaptures = 0;
    let maxPawnCaptures = 0;

    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
            const piece = boardForSearch[r][c];
            if (!piece || piece.toLowerCase() !== player) continue;

            const isKing = (piece === "W" || piece === "B");
            const result = getBestCaptureSequences(r, c, boardForSearch, isKing);

            if (result.max > 0) {
                if (isKing) {
                    if (result.max > maxKingCaptures) {
                        maxKingCaptures = result.max;
                        kingCaptureInfos = [{ row: r, col: c, isKing }];
                    } else if (result.max === maxKingCaptures) {
                        kingCaptureInfos.push({ row: r, col: c, isKing });
                    }
                } else {
                    if (result.max > maxPawnCaptures) {
                        maxPawnCaptures = result.max;
                        pawnCaptureInfos = [{ row: r, col: c, isKing }];
                    } else if (result.max === maxPawnCaptures) {
                        pawnCaptureInfos.push({ row: r, col: c, isKing });
                    }
                }
            }
        }
    }

    // Prioridad de dama sobre peón (misma regla que getGlobalBestMoves)
    const captureInfos = kingCaptureInfos.length > 0 ? kingCaptureInfos : pawnCaptureInfos;

    if (captureInfos.length > 0) {
        // Captura obligatoria: solo son legales las secuencias completas
        // de máxima captura de las piezas elegibles.
        const fullMoves = [];
        captureInfos.forEach(info => {
            const sequences = expandCaptureSequences(boardForSearch, info.row, info.col, info.isKing);
            sequences.forEach(hops => {
                if (hops.length > 0) {
                    fullMoves.push({ type: "capture-sequence", from: { row: info.row, col: info.col }, hops });
                }
            });
        });
        return fullMoves;
    }

    // Sin capturas disponibles: cualquier movimiento simple de cualquier pieza.
    const fullMoves = [];
    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
            const piece = boardForSearch[r][c];
            if (!piece || piece.toLowerCase() !== player) continue;

            const moves = getLegalMoves(r, c, boardForSearch).filter(m => m.type === "move");
            moves.forEach(m => {
                fullMoves.push({ type: "simple", from: { row: r, col: c }, to: { row: m.row, col: m.col } });
            });
        }
    }
    return fullMoves;
}

// Aplica una jugada completa (de las que devuelve enumerateFullMoves) a
// un tablero, devolviendo un tablero NUEVO — nunca muta el que recibe.
// Usar copias en vez de simular-y-deshacer in-place es más lento, pero
// muchísimo más simple de razonar correctamente durante una búsqueda
// recursiva con ramas — y en un tablero de 100 casillas, copiar es
// igualmente barato de sobra.
function applyFullMove(sourceBoard, fullMove) {
    const b = cloneBoard(sourceBoard);

    if (fullMove.type === "simple") {
        let piece = b[fullMove.from.row][fullMove.from.col];
        b[fullMove.from.row][fullMove.from.col] = null;

        if (piece === "w" && fullMove.to.row === 0) piece = "W";
        if (piece === "b" && fullMove.to.row === 9) piece = "B";

        b[fullMove.to.row][fullMove.to.col] = piece;
        return b;
    }

    // capture-sequence
    let piece = b[fullMove.from.row][fullMove.from.col];
    b[fullMove.from.row][fullMove.from.col] = null;

    let landingRow = fullMove.from.row;
    let landingCol = fullMove.from.col;

    fullMove.hops.forEach(hop => {
        b[hop.capturedRow][hop.capturedCol] = null;
        landingRow = hop.row;
        landingCol = hop.col;
    });

    if (piece === "w" && landingRow === 0) piece = "W";
    if (piece === "b" && landingRow === 9) piece = "B";

    b[landingRow][landingCol] = piece;
    return b;
}

// ============================================================
//  LA FUNCIÓN DE EVALUACIÓN
// ============================================================
// Le pone un número a un tablero, desde el punto de vista de botColor
// (positivo = bueno para el bot, negativo = bueno para el rival).
// evalMode 'material' (niveles bajos): solo cuenta fichas.
// evalMode 'full' (niveles altos): además de avance y posición, suma
// nociones tácticas básicas — fichas colgadas, respaldo entre fichas
// propias, retención de la fila de fondo — que apuntan a que el bot
// entienda QUÉ está buscando, no solo a que mire más lejos.
const PAWN_VALUE = 100;
const KING_VALUE = 175;

function countMobility(boardForSearch, color) {
    let count = 0;
    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
            const piece = boardForSearch[r][c];
            if (piece && piece.toLowerCase() === color) {
                count += getLegalMoves(r, c, boardForSearch).length;
            }
        }
    }
    return count;
}

// Cuánto material de "color" está expuesto a que el rival lo capture
// AHORA MISMO (sin importar de quién sea el turno en rigor — es una
// señal estructural de vulnerabilidad, más barata de calcular que
// simular el turno exacto, y sigue apuntando en la dirección correcta:
// una ficha colgada tiende a seguir colgada un rato). Reutiliza
// enumerateFullMoves (las mismas reglas de captura obligatoria/máxima
// captura de siempre) para no reinventar qué es "estar en peligro".
function hangingMaterialValue(boardForSearch, color) {
    const opponent = (color === "w") ? "b" : "w";
    const opponentMoves = enumerateFullMoves(boardForSearch, opponent);
    if (opponentMoves.length === 0 || opponentMoves[0].type !== "capture-sequence") return 0;

    // Todas las secuencias en opponentMoves empatan en cantidad de
    // capturas (por la regla de máxima captura) — cualquiera sirve de
    // muestra representativa de cuánto material está en juego.
    let value = 0;
    opponentMoves[0].hops.forEach(hop => {
        const capturedPiece = boardForSearch[hop.capturedRow][hop.capturedCol];
        const isKing = (capturedPiece === capturedPiece.toUpperCase());
        value += isKing ? KING_VALUE : PAWN_VALUE;
    });
    return value;
}

// Cuántos peones de "color" tienen un compañero diagonal "atrás" (del
// lado de su propia fila de largada) que podría reocupar/recapturar esa
// posición — una aproximación simple pero clásica de "formación sólida
// vs. ficha aislada", sin necesitar simular la recaptura exacta.
function supportedPawnCount(boardForSearch, color) {
    const backDr = (color === "w") ? 1 : -1; // "atrás" es hacia la fila de largada propia
    let count = 0;
    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
            const piece = boardForSearch[r][c];
            if (!piece || piece.toLowerCase() !== color || piece !== piece.toLowerCase()) continue; // solo peones
            const backRow = r + backDr;
            const hasSupport =
                (boardForSearch[backRow]?.[c - 1]?.toLowerCase() === color) ||
                (boardForSearch[backRow]?.[c + 1]?.toLowerCase() === color);
            if (hasSupport) count++;
        }
    }
    return count;
}

// Cuántas piezas de "color" siguen en su propia fila de fondo (la fila 9
// para blancas, la fila 0 para negras) — retenerla un rato dificulta que
// el rival encuentre coronación fácil y mantiene la retaguardia cubierta.
function backRowCount(boardForSearch, color) {
    const row = (color === "w") ? 9 : 0;
    let count = 0;
    for (let c = 0; c < 10; c++) {
        const piece = boardForSearch[row][c];
        if (piece && piece.toLowerCase() === color) count++;
    }
    return count;
}

// Cuántos rivales hay cerca del camino de avance INMEDIATO (las 2 filas
// siguientes, dentro del cono diagonal alcanzable) de un peón puntual —
// una aproximación barata de "qué tan despejado está el camino hacia
// la coronación" ahí delante, sin tener que simular varios turnos hacia
// adelante (eso es trabajo de la búsqueda, no de la evaluación: acá solo
// le damos una pista posicional barata).
function clearPathObstacles(boardForSearch, row, col, color) {
    const dir = (color === "w") ? -1 : 1; // hacia dónde avanza este color
    const enemyColor = (color === "w") ? "b" : "w";
    let obstacles = 0;
    for (let step = 1; step <= 2; step++) {
        const r = row + dir * step;
        if (r < 0 || r > 9) break;
        for (let dc = -step; dc <= step; dc++) {
            const c = col + dc;
            if (c < 0 || c > 9) continue;
            const piece = boardForSearch[r][c];
            if (piece && piece.toLowerCase() === enemyColor) obstacles++;
        }
    }
    return obstacles;
}

function evaluateBoard(boardForSearch, botColor, evalMode) {
    const opponentColor = (botColor === "w") ? "b" : "w";
    let score = 0;

    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
            const piece = boardForSearch[r][c];
            if (!piece) continue;

            const color = piece.toLowerCase();
            const isKing = (piece === "W" || piece === "B");
            let value = isKing ? KING_VALUE : PAWN_VALUE;

            if (evalMode === "full") {
                if (!isKing) {
                    // Avance hacia la coronación: 0 en la fila de largada,
                    // máximo justo antes de coronar.
                    const advancement = (color === "w") ? (9 - r) : r;
                    value += advancement * 2;

                    // --- CAMINO DESPEJADO HACIA LA CORONACIÓN ---
                    // Una ficha avanzada Y sin rivales en su camino
                    // inmediato vale más que una avanzada pero rodeada —
                    // "avanzar de verdad" no es solo estar cerca de la
                    // última fila, es tener chances reales de llegar. El
                    // bono solo aplica a partir de cierto avance (no tiene
                    // sentido cerca de la fila de largada, todavía falta
                    // demasiado camino para que "despejado ahora" prediga
                    // mucho) y es proporcional a cuán avanzada ya está.
                    if (advancement >= 4) {
                        const obstacles = clearPathObstacles(boardForSearch, r, c, color);
                        if (obstacles === 0) value += advancement * 3;
                    }
                }
                // Las columnas de borde (0 y 9) tienen menos casillas
                // diagonales disponibles: mínima penalización posicional.
                if (c === 0 || c === 9) value -= 4;
            }

            score += (color === botColor) ? value : -value;
        }
    }

    if (evalMode === "full") {
        const myMobility = countMobility(boardForSearch, botColor);
        const oppMobility = countMobility(boardForSearch, opponentColor);
        score += (myMobility - oppMobility) * 3;

        // --- FICHAS COLGADAS --- (el término con más peso de los nuevos:
        // directamente proporcional al material realmente en juego)
        score -= hangingMaterialValue(boardForSearch, botColor);
        score += hangingMaterialValue(boardForSearch, opponentColor);

        // --- RESPALDO ENTRE FICHAS --- (formación sólida vs. aislada)
        score += (supportedPawnCount(boardForSearch, botColor) - supportedPawnCount(boardForSearch, opponentColor)) * 8;

        // --- RETENCIÓN DE LA FILA DE FONDO ---
        score += (backRowCount(boardForSearch, botColor) - backRowCount(boardForSearch, opponentColor)) * 6;
    }

    return score;
}

// ============================================================
//  MINIMAX CON PODA ALFA-BETA + BÚSQUEDA DE QUIETUD
// ============================================================
// "depth" cuenta turnos completos (plies), alternando jugador en cada
// nivel — un turno con una cadena de 4 capturas sigue contando como
// UN solo nivel de profundidad, porque para el rival es indistinguible
// de cualquier otro turno: no responde en el medio de nuestra cadena.
//
// Puntaje de victoria/derrota ponderado por la profundidad restante:
// así el motor prefiere la victoria MÁS RÁPIDA entre varias posibles, y
// la derrota MÁS LENTA cuando ya no puede evitarla, en vez de resignarse
// apenas detecta que un mal resultado es inevitable.
const WIN_SCORE = 1000000;

// Tope de seguridad para la búsqueda de quietud: cuántos turnos EXTRA,
// más allá de la profundidad normal, está dispuesto a seguir explorando
// mientras sigan apareciendo capturas obligatorias pendientes — nunca
// evalúa una posición "a mitad de un tiroteo". Es la forma concreta de
// atacar el efecto horizonte (regalar una captura múltiple que queda
// justo en el borde de lo que el motor alcanza a mirar).
const QUIESCENCE_MAX_EXTRA_PLIES = 6;

function minimaxSearch(boardForSearch, player, depth, alpha, beta, botColor, evalMode, qBudget) {
    const moves = enumerateFullMoves(boardForSearch, player);

    if (moves.length === 0) {
        // Este jugador no tiene ninguna jugada legal: perdió (por
        // aniquilación o por bloqueo, da igual para la búsqueda).
        const sign = (player === botColor) ? -1 : 1;
        return sign * (WIN_SCORE + depth);
    }

    if (depth === 0) {
        // Como las capturas son SIEMPRE obligatorias en este juego, si
        // enumerateFullMoves devuelve algo, o son TODO secuencias de
        // captura o son TODO movimientos simples — nunca una mezcla.
        const hasForcedCapture = moves[0].type === "capture-sequence";

        if (!(hasForcedCapture && qBudget > 0)) {
            return evaluateBoard(boardForSearch, botColor, evalMode);
        }
        // Si hay una captura pendiente y todavía queda presupuesto de
        // quietud, NO evaluamos todavía: seguimos bajando (ver más abajo,
        // depth se queda en 0 pero qBudget baja en su lugar).
    }

    const opponent = (player === "w") ? "b" : "w";
    const maximizing = (player === botColor);
    const nextDepth = depth > 0 ? depth - 1 : 0;
    const nextQBudget = depth > 0 ? qBudget : qBudget - 1;

    // --- ORDENAMIENTO DE JUGADAS ---
    // Antes de recorrer las jugadas candidatas en profundidad, las
    // ordenamos por una evaluación ESTÁTICA rápida (sin recursión) del
    // tablero resultante — así las jugadas más prometedoras se exploran
    // primero, lo que le da a la poda alfa-beta muchas más oportunidades
    // de cortar ramas enteras. No cambia QUÉ explora la búsqueda ni el
    // resultado final (sigue siendo exacto), solo el ORDEN — y en
    // alfa-beta, el orden es lo que determina cuánto se puede podar.
    const children = moves.map(move => {
        const nextBoard = applyFullMove(boardForSearch, move);
        return { move, nextBoard, staticScore: evaluateBoard(nextBoard, botColor, evalMode) };
    });
    children.sort((a, b) => maximizing ? (b.staticScore - a.staticScore) : (a.staticScore - b.staticScore));

    if (maximizing) {
        let best = -Infinity;
        for (const child of children) {
            const val = minimaxSearch(child.nextBoard, opponent, nextDepth, alpha, beta, botColor, evalMode, nextQBudget);
            if (val > best) best = val;
            if (best > alpha) alpha = best;
            if (beta <= alpha) break; // poda beta
        }
        return best;
    } else {
        let best = Infinity;
        for (const child of children) {
            const val = minimaxSearch(child.nextBoard, opponent, nextDepth, alpha, beta, botColor, evalMode, nextQBudget);
            if (val < best) best = val;
            if (best < beta) beta = best;
            if (beta <= alpha) break; // poda alfa
        }
        return best;
    }
}

// Punto de entrada del motor "de verdad" (sin ruido): evalúa cada jugada
// legal disponible y devuelve TODAS las que empatan en el mejor puntaje
// (el llamador elige entre ellas al azar — así, aunque el nivel sea muy
// fuerte, no repite mecánicamente la misma línea cuando hay varias
// jugadas objetivamente equivalentes).
//
// A diferencia de una primera versión de esta función, acá SÍ propagamos
// alfa entre las jugadas de primer nivel (no solo dentro de cada una) —
// sin eso, cada jugada top-level arrancaba con una ventana alfa-beta
// completamente nueva, perdiendo toda la poda que se podía haber
// heredado de las jugadas hermanas ya evaluadas. No cortamos por beta a
// este nivel (beta se mantiene en +Infinity a propósito): necesitamos
// evaluar TODAS las jugadas de primer nivel igual, para poder recolectar
// todas las que empatan en el mejor puntaje — pero cada una sigue
// aprovechando el alfa ya conocido para podar SUS PROPIAS ramas internas.
// Compara dos jugadas completas por igualdad estructural (mismo origen,
// mismo destino o misma cadena de saltos) — necesario para poder
// "reconocer" si la jugada preferida de la profundidad anterior sigue
// siendo una opción legal en la profundidad nueva.
function movesEqual(a, b) {
    if (!a || !b) return false;
    if (a.type !== b.type) return false;
    if (a.from.row !== b.from.row || a.from.col !== b.from.col) return false;
    if (a.type === "simple") {
        return a.to.row === b.to.row && a.to.col === b.to.col;
    }
    if (a.hops.length !== b.hops.length) return false;
    return a.hops.every((h, i) => {
        const h2 = b.hops[i];
        return h.row === h2.row && h.col === h2.col && h.capturedRow === h2.capturedRow && h.capturedCol === h2.capturedCol;
    });
}

// preferredMove (opcional): si viene, se prueba PRIMERO entre las
// jugadas candidatas, antes de cualquier otra por más prometedora que
// parezca según la evaluación estática. Dos motivos para esto: (1) poda
// mejor — si esa jugada YA demostró ser buena en una profundidad más
// chica, probarla primero le da a alfa-beta el mejor punto de partida
// posible para cortar ramas; (2) estabilidad — cuando una profundidad
// nueva encuentra un EMPATE entre esa jugada y una candidata nueva,
// tener una razón para preferir la continuidad es mejor que un
// desempate puramente al azar (que es lo que hacíamos antes).
function pickBestFullMoves(boardForSearch, player, depth, evalMode, preferredMove) {
    const moves = enumerateFullMoves(boardForSearch, player);
    if (moves.length === 0) return [];

    const opponent = (player === "w") ? "b" : "w";

    const children = moves.map(move => {
        const nextBoard = applyFullMove(boardForSearch, move);
        return { move, nextBoard, staticScore: evaluateBoard(nextBoard, player, evalMode) };
    });
    children.sort((a, b) => b.staticScore - a.staticScore);

    if (preferredMove) {
        const idx = children.findIndex(c => movesEqual(c.move, preferredMove));
        if (idx > 0) {
            const [preferred] = children.splice(idx, 1);
            children.unshift(preferred);
        }
    }

    let bestScore = -Infinity;
    let bestMoves = [];
    let alpha = -Infinity;
    const beta = Infinity;

    for (const child of children) {
        const score = minimaxSearch(child.nextBoard, opponent, depth - 1, alpha, beta, player, evalMode, QUIESCENCE_MAX_EXTRA_PLIES);

        if (score > bestScore) {
            bestScore = score;
            bestMoves = [child.move];
        } else if (score === bestScore) {
            bestMoves.push(child.move);
        }
        if (bestScore > alpha) alpha = bestScore;
    }

    return bestMoves;
}

// ============================================================
//  PROFUNDIZACIÓN ITERATIVA CON LÍMITE DE TIEMPO
// ============================================================
// En vez de apostar a un número de profundidad fijo, busca a
// profundidad 1, después 2, después 3... quedándose siempre con el
// mejor resultado de la última profundidad que llegó a TERMINAR, hasta
// que se acaba el presupuesto de tiempo o llega a maxDepth. Es la misma
// técnica que usan los motores de ajedrez de verdad para este problema
// exacto: la profundidad "ideal" varía muchísimo según la posición (en
// nuestras propias mediciones, la misma profundidad tardó desde 200ms
// hasta más de 11 segundos según el tablero) — un número fijo o
// desperdicia tiempo en posiciones simples, o se pasa de la raya en
// posiciones complejas. Esto se adapta solo a cada posición.
//
// No corta a mitad de una profundidad en curso (eso requeriría poder
// interrumpir la recursión a mitad de camino, bastante más complejo) —
// en cambio, ANTES de arrancar la siguiente profundidad, ESTIMA cuánto
// podría llegar a tardar y solo arranca si esa estimación entra en el
// tiempo que queda.
//
// Encontrar el equilibrio correcto acá costó dos vueltas (queda anotado
// porque es información real sobre cómo se comporta esta búsqueda, no
// solo prueba y error): un múltiplo fijo de 8x resultó demasiado
// conservador (dejaba sin usar hasta el 80% del presupuesto real). Un
// criterio más simple ("no arrancar pasado el 50% del tiempo gastado")
// resultó PEOR, no mejor: al no poner ningún techo a cuánto puede tardar
// la profundidad recién arrancada, la mitad de las pruebas terminó
// pasándose del presupuesto, alguna hasta casi 18 segundos. La razón:
// el salto de una profundidad a la siguiente no crece de forma pareja
// acá — la búsqueda de quietud (ver QUIESCENCE_MAX_EXTRA_PLIES) puede
// disparar mucho trabajo extra de golpe en una profundidad que la
// anterior no dejaba entrever.
//
// Este criterio combina un piso fijo conservador (4x lo que tardó la
// última profundidad) con el crecimiento real observado entre las
// últimas dos profundidades (con el doble de margen encima) — usando
// el que sea MÁS restrictivo de los dos. Es más seguro que cualquiera
// de los dos intentos anteriores por separado.
//
// NOVEDAD: lleva una "jugada preferida" de una profundidad a la
// siguiente (ver comentario en pickBestFullMoves). Esto surgió de un
// hallazgo real jugando contra el bot: en algunas posiciones, el valor
// que la búsqueda le asigna a una misma jugada oscila de una profundidad
// a la siguiente — no por ningún bug de la poda (se confirmó
// comparando contra una búsqueda sin podar, da exactamente los mismos
// valores), sino porque es una característica conocida de la búsqueda
// minimax con una evaluación heurística: profundidades distintas "ven"
// porciones distintas del futuro, y pueden legítimamente discrepar antes
// de asentarse.
//
// IMPORTANTE — esto también costó una vuelta de más para hacerlo bien:
// la primera versión de esta idea llevaba la MISMA preferencia desde el
// origen (la primera profundidad que la sugirió) hasta el final, sin
// volver a cuestionarla mientras siguiera "sobreviviendo" entre los
// empates de cada profundidad nueva. El problema: eso podía anclarse en
// una opinión de una profundidad temprana y poco informada, y sostenerla
// por pura inercia aunque profundidades intermedias ya la hubieran
// contradicho. Ahora la preferencia se recalcula EN CADA VUELTA, como
// la superposición entre la profundidad recién calculada y la
// INMEDIATAMENTE anterior (no un origen lejano) — así solo se confía en
// algo que dos lecturas consecutivas y recientes coincidieron en
// sostener, no en una corazonada vieja que el camino ya dejó atrás.
function pickBestFullMovesIterativeDeepening(boardForSearch, player, evalMode, timeLimitMs, maxDepth) {
    const startTime = Date.now();
    let bestMoves = [];
    let previousMoves = null;
    let preferredMove = null;
    let depth = 1;
    const durations = [];

    while (depth <= maxDepth) {
        const elapsed = Date.now() - startTime;
        const remaining = timeLimitMs - elapsed;
        if (remaining <= 0) break;

        if (depth > 1) {
            const lastDuration = durations[durations.length - 1];
            let estimate = lastDuration * 4; // piso conservador
            if (durations.length >= 2) {
                const observedRatio = lastDuration / Math.max(1, durations[durations.length - 2]);
                estimate = Math.max(estimate, lastDuration * observedRatio * 2);
            }
            if (estimate > remaining) break;
        }

        const depthStart = Date.now();
        const result = pickBestFullMoves(boardForSearch, player, depth, evalMode, preferredMove);
        durations.push(Date.now() - depthStart);

        if (result.length > 0) {
            bestMoves = result;
            if (previousMoves) {
                const overlap = result.find(m => previousMoves.some(pm => movesEqual(m, pm)));
                preferredMove = overlap || result[0];
            } else {
                preferredMove = result[0];
            }
            previousMoves = result;
        }
        depth++;
    }

    return { moves: bestMoves, preferred: preferredMove };
}

// ============================================================
//  CONFIGURACIÓN POR NIVEL
// ============================================================
// Cada nivel puede definirse de dos formas:
//   { depth: N, ... }                          -> profundidad fija
//   { timeLimitMs: T, maxDepth: N, ... }        -> profundización
//                                                  iterativa con límite
//                                                  de tiempo (para
//                                                  niveles donde vale la
//                                                  pena aprovechar todo
//                                                  el presupuesto de
//                                                  tiempo disponible)
// noise: probabilidad (0 a 1) de ignorar la búsqueda por completo y
//        elegir una jugada legal al azar — nunca una jugada ILEGAL
//        (eso enumerateFullMoves ya lo impide siempre), solo una jugada
//        sin ninguna intención táctica detrás.
// evalMode: 'material' (solo cuenta fichas) o 'full' (suma avance,
//        posición, movilidad, fichas colgadas, respaldo y fila de fondo).
//
// SOLO los niveles 1 y 10 están calibrados en esta entrada — son los
// dos extremos de referencia para probar que el motor compartido
// funciona de punta a punta. Los niveles 2 a 9 tienen una configuración
// PROVISORIA (interpolada a mano entre los dos extremos, nada más que
// un punto de partida razonable) — juegan de verdad, sin trampa ni
// bugs, pero sus números todavía no pasaron por ninguna ronda de
// calibración real. Eso es trabajo para las próximas entradas.
//
// El nivel 10 pasó de profundidad fija (6) a profundización iterativa
// con límite de tiempo: con la evaluación nueva (más cara de calcular)
// y la búsqueda de quietud, medimos que profundidad 7 sola ya varía
// entre 200ms y más de 11 segundos según la posición — un número fijo
// ya no tenía sentido. Con el Web Worker (ver bot-worker.js) ya no hay
// que preocuparse por trabar la página, así que el límite de 8
// segundos es puro margen de comodidad para la persona esperando, no
// una restricción técnica.
// ============================================================
//  LA ZONA DE AZAR DE GODOFREDO (funciones de apoyo)
// ============================================================
// Todo lo que sigue es NUEVO, agregado aparte de lo de arriba (que es
// el motor tal como funcionaba, sin ningún cambio) — a propósito, para
// no repetir el problema real que tuvimos la vez pasada: ahí,
// compartir una misma función entre "la zona de azar" y "el resto de
// la partida" terminó afectando, sin que lo notáramos a tiempo, al
// juego de fuera de esa zona también. Esta vez, cero código compartido
// entre ambos caminos — la zona de azar es una rama aparte, con su
// propia función, que ni siquiera se llama durante el resto de la
// partida.

// Cuenta el total de piezas (de cualquier color) que quedan sobre el
// tablero. Como cada captura saca exactamente una ficha, comparar esto
// contra STARTING_PIECE_COUNT es la forma más simple de saber si
// todavía no hubo NINGUNA captura en la partida — sin necesitar que
// nadie le pase historial ni contador aparte, con solo mirar el
// tablero actual.
function countTotalPieces(boardForSearch) {
    let count = 0;
    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
            if (boardForSearch[r][c]) count++;
        }
    }
    return count;
}

// Evalúa TODAS las jugadas candidatas a la profundidad dada, y devuelve
// el RANKING COMPLETO (jugada + puntaje), ordenado de mejor a peor —
// necesario para poder sortear entre las que están "cerca" de la mejor
// (dentro de un margen), no solo quedarse con la ganadora.
//
// A diferencia de pickBestFullMoves (de arriba, sin tocar), acá CADA
// jugada candidata se explora con una ventana de cálculo COMPLETA
// (-Infinity, +Infinity) propia, sin heredar nada de sus hermanas.
// Hace falta así, y no alcanza con simplemente "podar menos": la poda
// alfa-beta normal puede devolver una COTA optimista en vez del valor
// real en cualquier punto profundo del árbol de una jugada candidata,
// no solo en el nivel superior — confirmado con un caso real durante
// las pruebas, donde una jugada marcada con -25 (aparentando estar
// dentro del margen) resultó valer -31 de verdad (afuera) al
// recalcularla sin ninguna poda. La única forma de garantizar
// precisión real es esta: ventana completa para cada candidata. Es más
// lento que el camino de siempre (por eso NO se usa fuera de la zona
// de azar, donde no hace falta), pero a la profundidad fija y modesta
// que usamos acá (ver OPENING_ZONE_DEPTH) el costo es bajo.
function pickScoredFullMoves(boardForSearch, player, depth, evalMode) {
    const moves = enumerateFullMoves(boardForSearch, player);
    if (moves.length === 0) return [];

    const opponent = (player === "w") ? "b" : "w";
    const scored = moves.map(move => {
        const nextBoard = applyFullMove(boardForSearch, move);
        const score = minimaxSearch(nextBoard, opponent, depth - 1, -Infinity, Infinity, player, evalMode, QUIESCENCE_MAX_EXTRA_PLIES);
        return { move, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored;
}

// La profundidad de la zona de azar es FIJA y MODESTA a propósito — no
// compite por la misma profundidad que alcanza el resto de la partida
// (con su búsqueda por tiempo, mucho más profunda). No hace falta que
// compita: como discutimos, en la apertura, antes de cualquier
// contacto, el costo de no jugar la jugada absolutamente óptima es
// mínimo — así que preferimos una búsqueda barata y rápida acá, en vez
// de intentar igualar la fuerza máxima del resto de la partida (que es
// justamente lo que, al intentarlo la vez pasada, terminó costando
// hasta una jugada entera de profundidad en CADA jugada de la zona de
// azar, y esa pérdida se repetía varias veces antes de la primera
// captura). Medido: a esta profundidad, con ventana completa, cada
// jugada tarda bien por debajo de 1 segundo.
const OPENING_ZONE_DEPTH = 5;
const STARTING_PIECE_COUNT = 30; // 15 fichas por lado en el tablero de 10x10
const OPENING_ZONE_SCORE_MARGIN = 20; // referencia: una ficha vale 100 en esta escala

const BOT_LEVEL_CONFIG = {
    1: { depth: 1, noise: 0.85, evalMode: "material" },
    2: { depth: 1, noise: 0.68, evalMode: "material" },   // provisorio, sin calibrar todavía
    3: { depth: 2, noise: 0.51, evalMode: "material" },   // provisorio, sin calibrar todavía
    4: { depth: 2, noise: 0.34, evalMode: "material" },   // provisorio, sin calibrar todavía
    5: { depth: 3, noise: 0.17, evalMode: "full" },       // provisorio, sin calibrar todavía
    6: { depth: 3, noise: 0.00, evalMode: "full" },       // provisorio, sin calibrar todavía
    7: { depth: 4, noise: 0.00, evalMode: "full" },       // provisorio, sin calibrar todavía
    8: { depth: 5, noise: 0.00, evalMode: "full" },       // provisorio, sin calibrar todavía
    9: { depth: 6, noise: 0.00, evalMode: "full" },       // provisorio, sin calibrar todavía
    10: { timeLimitMs: 8000, maxDepth: 16, noise: 0.00, evalMode: "full" }
};

// ============================================================
//  API PÚBLICA
// ============================================================
// Dado un tablero y un nivel, devuelve UNA jugada completa elegida por
// ese nivel (o null si no hay ninguna jugada legal — no debería pasar
// nunca en una partida real, porque el juego ya termina la partida por
// bloqueo/aniquilación antes de que esto se llegue a llamar). El
// parámetro player es opcional y por defecto es 'b', porque en una
// partida real el bot siempre juega con Negras — pero el simulador de
// auto-partidas (para calibrar) lo va a llamar también con 'w', para
// poder enfrentar dos niveles entre sí desde cualquier lado del tablero.
function getBotMove(boardForSearch, level, player = "b") {
    const config = BOT_LEVEL_CONFIG[level];
    if (!config) return null;

    const legalMoves = enumerateFullMoves(boardForSearch, player);
    if (legalMoves.length === 0) return null;

    const useRandom = Math.random() < config.noise;
    if (useRandom) {
        return legalMoves[Math.floor(Math.random() * legalMoves.length)];
    }

    // --- LA ZONA DE AZAR DE GODOFREDO ---
    // Mientras nadie perdió ninguna ficha todavía (tablero completo,
    // sin ninguna captura de por medio), en vez de la única mejor
    // jugada, sorteamos entre todas las que estén dentro de un margen
    // de puntaje chico respecto de la mejor — así el bot no reacciona
    // siempre igual ante una apertura humana que se repite. Camino
    // COMPLETAMENTE APARTE del resto de la función (ver comentario en
    // pickScoredFullMoves): en cuanto cae la primera ficha de
    // cualquier lado, esta rama ni se toca, y el resto de la partida
    // sigue el camino de abajo, sin cambios.
    if (countTotalPieces(boardForSearch) === STARTING_PIECE_COUNT) {
        const scored = pickScoredFullMoves(boardForSearch, player, OPENING_ZONE_DEPTH, config.evalMode);
        if (scored.length > 0) {
            const bestScore = scored[0].score;
            const withinMargin = scored.filter(s => s.score >= bestScore - OPENING_ZONE_SCORE_MARGIN).map(s => s.move);
            return withinMargin[Math.floor(Math.random() * withinMargin.length)];
        }
        // Si por algún motivo no hubiera resultado (no debería pasar
        // nunca, ya descartamos arriba el caso de "sin jugadas
        // legales"), cae al camino de siempre de abajo.
    }

    // --- A PARTIR DE ACÁ: EXACTAMENTE EL CAMINO DE SIEMPRE, SIN NINGÚN CAMBIO ---
    let candidates;
    let preferred = null;
    if (config.timeLimitMs) {
        const result = pickBestFullMovesIterativeDeepening(boardForSearch, player, config.evalMode, config.timeLimitMs, config.maxDepth);
        candidates = result.moves;
        preferred = result.preferred;
        if (candidates.length === 0) candidates = legalMoves; // cinturón de seguridad
    } else {
        candidates = pickBestFullMoves(boardForSearch, player, config.depth, config.evalMode);
        if (candidates.length === 0) candidates = legalMoves; // cinturón de seguridad
    }

    // Si hay una jugada que se sostuvo de una profundidad a la siguiente
    // y sigue entre las empatadas finales, la preferimos directamente en
    // vez de desempatar al azar — no porque la evaluación la distinga
    // de las demás (están empatadas, por definición), sino porque tiene
    // a favor haber demostrado ser consistentemente buena, no solo
    // buena en el último vistazo.
    if (preferred && candidates.some(m => movesEqual(m, preferred))) {
        return preferred;
    }

    return candidates[Math.floor(Math.random() * candidates.length)];
}

