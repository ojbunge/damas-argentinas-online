// ============================================================
//  EL MOTOR DE REGLAS COMPARTIDO
// ============================================================
// Estas cuatro funciones vivían inline en index.html. Se mudaron acá
// para que TANTO la página principal COMO el Web Worker del bot (que
// corre en su propio hilo, sin acceso al scope de index.html) puedan
// cargarlas — con esto, sigue habiendo una única fuente de verdad para
// las reglas del juego, nunca dos copias que puedan divergir.
//
// index.html las carga con <script src="rules-engine.js">, ANTES que
// bots.js y que el script principal (ambos las necesitan).
// El Web Worker las carga con importScripts('rules-engine.js').
//
// getLegalMoves y getGlobalBestMoves aceptan un tablero opcional
// (boardToUse), con el board global de index.html como valor por
// defecto — así todo el código existente que las llama sin ese
// argumento (asumiendo el tablero real de la partida) sigue funcionando
// exactamente igual que antes.

        function isEnemyPiece(piece, currentPiece) {

            if (!piece) {
                return false;
            }

            return piece.toLowerCase() !==
                currentPiece.toLowerCase();
        }

        function getLegalMoves(row, col, boardToUse = board) {

            const piece = boardToUse[row][col];

            if (!piece) {
                return [];
            }

            const moves = [];

            if (piece === "w") {

                const moveTargets = [
                    [row - 1, col - 1],
                    [row - 1, col + 1]
                ];

                moveTargets.forEach(([r, c]) => {

                    if (
                        r >= 0 &&
                        r < 10 &&
                        c >= 0 &&
                        c < 10 &&
                        boardToUse[r][c] === null
                    ) {
                        moves.push({
                            type: "move",
                            row: r,
                            col: c
                        });
                    }

                });

                const captureTargets = [
                    {
                        enemyRow: row - 1,
                        enemyCol: col - 1,
                        landingRow: row - 2,
                        landingCol: col - 2
                    },
                    {
                        enemyRow: row - 1,
                        enemyCol: col + 1,
                        landingRow: row - 2,
                        landingCol: col + 2
                    }
                ];

                captureTargets.forEach(target => {

                    const enemyPiece =
                        boardToUse[target.enemyRow]?.[target.enemyCol];

                    if (
                        isEnemyPiece(enemyPiece, piece) &&
                        target.landingRow >= 0 &&
                        target.landingRow < 10 &&
                        target.landingCol >= 0 &&
                        target.landingCol < 10 &&
                        boardToUse[target.landingRow][target.landingCol] === null
                    ) {
                        moves.push({
                            type: "capture",
                            row: target.landingRow,
                            col: target.landingCol,
                            capturedRow: target.enemyRow,
                            capturedCol: target.enemyCol
                        });
                    }

                });

            }

            if (piece === "b") {

                const moveTargets = [
                    [row + 1, col - 1],
                    [row + 1, col + 1]
                ];

                moveTargets.forEach(([r, c]) => {

                    if (
                        r >= 0 &&
                        r < 10 &&
                        c >= 0 &&
                        c < 10 &&
                        boardToUse[r][c] === null
                    ) {
                        moves.push({
                            type: "move",
                            row: r,
                            col: c
                        });
                    }

                });

                const captureTargets = [
                    {
                        enemyRow: row + 1,
                        enemyCol: col - 1,
                        landingRow: row + 2,
                        landingCol: col - 2
                    },
                    {
                        enemyRow: row + 1,
                        enemyCol: col + 1,
                        landingRow: row + 2,
                        landingCol: col + 2
                    }
                ];

                captureTargets.forEach(target => {

                    const enemyPiece =
                        boardToUse[target.enemyRow]?.[target.enemyCol];

                    if (
                        isEnemyPiece(enemyPiece, piece) &&
                        target.landingRow >= 0 &&
                        target.landingRow < 10 &&
                        target.landingCol >= 0 &&
                        target.landingCol < 10 &&
                        boardToUse[target.landingRow][target.landingCol] === null
                    ) {
                        moves.push({
                            type: "capture",
                            row: target.landingRow,
                            col: target.landingCol,
                            capturedRow: target.enemyRow,
                            capturedCol: target.enemyCol
                        });
                    }

                });

            }

            // --- LÓGICA DE LAS DAMAS (W y B) ---
            if (piece === "W" || piece === "B") {
                // Las 4 direcciones diagonales
                const directions = [
                    { dr: -1, dc: -1 }, // Arriba-Izquierda
                    { dr: -1, dc: 1 },  // Arriba-Derecha
                    { dr: 1, dc: -1 },  // Abajo-Izquierda
                    { dr: 1, dc: 1 }   // Abajo-Derecha
                ];

                directions.forEach(dir => {
                    let r = row + dir.dr;
                    let c = col + dir.dc;

                    // Mientras estemos dentro del tablero...
                    while (r >= 0 && r < 10 && c >= 0 && c < 10) {
                        if (boardToUse[r][c] === null) {
                            // CASILLA VACÍA: La dama puede moverse aquí (Vuelo)
                            moves.push({
                                type: "move",
                                row: r,
                                col: c
                            });
                            // Seguimos explorando en la misma dirección
                            r += dir.dr;
                            c += dir.dc;
                        } else {
                            // CHOCAMOS CON UNA PIEZA: ¿Es enemiga?
                            if (isEnemyPiece(boardToUse[r][c], piece)) {
                                const nextR = r + dir.dr;
                                const nextC = c + dir.dc;

                                // ¿La casilla de atrás está libre? (Art. 7)
                                if (
                                    nextR >= 0 && nextR < 10 &&
                                    nextC >= 0 && nextC < 10 &&
                                    boardToUse[nextR][nextC] === null
                                ) {
                                    moves.push({
                                        type: "capture",
                                        row: nextR,
                                        col: nextC,
                                        capturedRow: r,
                                        capturedCol: c
                                    });
                                }
                            }
                            // Después de chocar con cualquier pieza (amiga o enemiga), 
                            // la dama no puede seguir volando en esa dirección.
                            break;
                        }
                    }
                });
            }

            return moves;
        }

        function getBestCaptureSequences(row, col, currentBoard, isKing) {
            const piece = currentBoard[row][col];
            // Le pasamos currentBoard explícitamente: durante la simulación
            // de una secuencia de capturas, getLegalMoves ahora opera sobre
            // ESTE tablero (el de la simulación en curso), no sobre el board
            // global. Antes funcionaba solo porque currentBoard y board eran
            // siempre la misma referencia en la práctica — ya no depende de esa
            // coincidencia.
            const moves = getLegalMoves(row, col, currentBoard);
            const captures = moves.filter(m => m.type === "capture");

            if (captures.length === 0) {
                return { max: 0, sequences: [] };
            }

            let globalMax = 0;
            let allPaths = [];

            captures.forEach(c => {
                // --- SIMULACIÓN ---
                const originalEnemy = currentBoard[c.capturedRow][c.capturedCol];
                const originalPiece = currentBoard[row][col];

                // Ejecutamos salto
                currentBoard[c.row][c.col] = originalPiece;
                currentBoard[row][col] = null;
                currentBoard[c.capturedRow][c.capturedCol] = null;

                // Regla Art 5: Coronación detiene secuencia
                const isWhiteCoronation = originalPiece === "w" && c.row === 0;
                const isBlackCoronation = originalPiece === "b" && c.row === 9;

                let resultMax = 0;
                if (!(isWhiteCoronation || isBlackCoronation)) {
                    const nextResult = getBestCaptureSequences(c.row, c.col, currentBoard, isKing);
                    resultMax = nextResult.max;
                }

                const totalCaptures = 1 + resultMax;

                if (totalCaptures > globalMax) {
                    globalMax = totalCaptures;
                    allPaths = [c];
                } else if (totalCaptures === globalMax) {
                    allPaths.push(c);
                }

                // --- DESHACER (Crucial que sea exacto) ---
                currentBoard[row][col] = originalPiece;
                currentBoard[c.row][c.col] = null;
                currentBoard[c.capturedRow][c.capturedCol] = originalEnemy;
            });

            return { max: globalMax, sequences: allPaths };
        }

        function getGlobalBestMoves(player, boardToUse = board) {
            let kingCaptures = [];
            let pawnCaptures = [];
            let maxKingCaptures = 0;
            let maxPawnCaptures = 0;

            // Recorremos todo el tablero buscando piezas del jugador
            for (let r = 0; r < 10; r++) {
                for (let c = 0; c < 10; c++) {
                    const piece = boardToUse[r][c];
                    if (piece && piece.toLowerCase() === player) {
                        const isKing = (piece === "W" || piece === "B");
                        const result = getBestCaptureSequences(r, c, boardToUse, isKing);

                        if (result.max > 0) {
                            if (isKing) {
                                if (result.max > maxKingCaptures) {
                                    maxKingCaptures = result.max;
                                    kingCaptures = [{ row: r, col: c, moves: result.sequences }];
                                } else if (result.max === maxKingCaptures) {
                                    kingCaptures.push({ row: r, col: c, moves: result.sequences });
                                }
                            } else {
                                if (result.max > maxPawnCaptures) {
                                    maxPawnCaptures = result.max;
                                    pawnCaptures = [{ row: r, col: c, moves: result.sequences }];
                                } else if (result.max === maxPawnCaptures) {
                                    pawnCaptures.push({ row: r, col: c, moves: result.sequences });
                                }
                            }
                        }
                    }
                }
            }

            // APLICAMOS PRIORIDAD (Art. 11): Si hay damas que pueden capturar, ignoramos peones
            if (kingCaptures.length > 0) {
                return kingCaptures;
            }
            // Si no hay damas, devolvemos las mejores capturas de peones (Art. 10)
            return pawnCaptures;
        }

// Si este archivo corre dentro de un Web Worker (sin "window"), no hace
// falta exportar nada especial: importScripts() ya deja estas funciones
// directamente en el scope global del worker, igual que un <script> las
// deja en el scope global de la página.
