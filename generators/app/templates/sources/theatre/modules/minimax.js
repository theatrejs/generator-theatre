function Minimax(heuristic, childhood) {

    function maximize(start, depth) {

        // return negamax implementation of a maximized move
        return negamax(start, depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, 1, true);
    }

    function minimize(start, depth) {

        // return negamax implementation of a minimized move
        return negamax(start, depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, -1, true);
    }

    function negamax(move, distance, alpha, beta, color, caller) {

        // return current move as leaf when it doesn't have any depth left
        if (distance === 0) {

            return move;
        }

        // retrieve child moves of current move
        const moves = childhood(move);

        // return current move as leaf when it doesn't have any child moves
        if (moves.length === 0) {

            return move;
        }

        let bestScore = Number.NEGATIVE_INFINITY;
        let bestLeaf = null;
        let bestMove = null;

        // iterate through child moves
        for (let iterator = 0, length = moves.length; iterator < length; iterator++) {

            const currentMove = moves[iterator];
            const currentLeaf = negamax(currentMove, distance - 1, -beta, -alpha, -color, false);
            const currentScore = color * heuristic(currentLeaf);

            // save the best move
            if (currentScore > bestScore)  {

                bestScore = currentScore;
                bestLeaf = currentLeaf;
                bestMove = currentMove;
            }

            alpha = Math.max(alpha, currentScore);

            // alpha-beta pruning
            if (alpha >= beta)  {

                break;
            }
        }

        // return best leaf of tree when iterate and best move for the caller
        return caller !== true ? bestLeaf : bestMove;
    }

    this.maximize = maximize;
    this.minimize = minimize;
}

// exports current module as an object
export {Minimax};
