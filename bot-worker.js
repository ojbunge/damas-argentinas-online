// ============================================================
//  EL WORKER DEL BOT
// ============================================================
// Corre el motor de los bots (getBotMove, de bot-engine.js: la búsqueda
// minimax con poda alfa-beta y todo lo demás) en su propio hilo, aparte
// del hilo principal de la página — así, sin importar cuánto tarde una
// búsqueda profunda, la interfaz sigue respondiendo con normalidad
// (animaciones, clicks, scroll, todo) mientras el bot "piensa".
//
// importScripts carga rules-engine.js y bot-engine.js en el scope global
// de ESTE worker (que es su propio universo, sin acceso al DOM ni a las
// variables de index.html) — es la misma fuente de verdad que usa la
// página, no una copia aparte que se pueda desincronizar con el tiempo.
// Los personajes y el Pregonero (bots.js) no hacen falta acá.
importScripts('rules-engine.js', 'bot-engine.js');

self.onmessage = function (e) {
    const { requestId, board, level, player } = e.data;

    let move = null;
    let error = null;
    try {
        move = getBotMove(board, level, player);
    } catch (err) {
        error = err.message || String(err);
    }

    self.postMessage({ requestId, move, error });
};