// ============================================================
//  EL WORKER DEL BOT
// ============================================================
// Corre la búsqueda (minimax + poda alfa-beta) en su propio hilo, aparte
// del hilo principal de la página — así, sin importar cuánto tarde una
// búsqueda profunda, la interfaz sigue respondiendo con normalidad
// (animaciones, clicks, scroll, todo) mientras el bot "piensa".
//
// importScripts carga rules-engine.js y bots.js en el scope global de
// ESTE worker (que es su propio universo, sin acceso al DOM ni a las
// variables de index.html) — es la misma fuente de verdad que usa la
// página, no una copia aparte que se pueda desincronizar con el tiempo.
importScripts('rules-engine.js', 'bots.js');

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
