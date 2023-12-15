let difficulty = 'easy'; // Ajuste para 'easy', 'medium' ou 'hard'

function changeBackground() {
    const body = document.body;
    body.style.backgroundColor = getRandomColor();
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function showNotification() {
    const notification = document.getElementById('gameNotification');
    notification.classList.add('show');

    setTimeout(() => {
        hideNotification();
    }, 2000);
}

function hideNotification() {
    const notification = document.getElementById('gameNotification');
    notification.classList.remove('show');
}

let currentPlayer = 'X';
let gameMode = '';

function startGame(mode) {
    gameMode = mode;
    resetGame();

    setTimeout(() => {
        if (mode === 'PvP' || mode === 'PvC') {
            showNotification();
        } else {
            hideNotification();
        }
    }, 1000);
}

function makeMove(cell) {
    if (!cell.textContent && gameMode !== '') {
        cell.textContent = currentPlayer;
        if (checkWinner()) {
            alert(`Jogador ${currentPlayer} venceu!`);
            resetGame();
        } else if (checkTie()) {
            alert('Empate!');
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

            if (gameMode === 'PvC' && currentPlayer === 'O' && !checkWinner() && !checkTie()) {
                makeComputerMove();
            }
        }
    }
}

function makeComputerMove() {
    const emptyCells = Array.from(document.getElementsByClassName('cell')).filter(cell => !cell.textContent);

    if (emptyCells.length > 0) {
        const bestMove = getBestMove(emptyCells, currentPlayer);
        bestMove.textContent = currentPlayer;

        if (checkWinner()) {
            alert('Computador venceu!');
            resetGame();
        } else if (checkTie()) {
            alert('Empate!');
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function getBestMove(emptyCells, player) {
    let bestMove;
    let bestScore = player === 'O' ? -Infinity : Infinity;

    emptyCells.forEach(cell => {
        cell.textContent = player;
        const score = minimax(false, 0);
        cell.textContent = '';

        if ((player === 'O' && score > bestScore) || (player === 'X' && score < bestScore)) {
            bestScore = score;
            bestMove = cell;
        }
    });

    return bestMove;
}

function minimax(isMaximizing, depth) {
    if (checkWinner()) {
        return isMaximizing ? -10 + depth : 10 - depth;
    }

    if (checkTie()) {
        return 0;
    }

    const emptyCells = Array.from(document.getElementsByClassName('cell')).filter(cell => !cell.textContent);

    if (isMaximizing) {
        let bestScore = -Infinity;
        emptyCells.forEach(cell => {
            cell.textContent = 'O';
            const score = minimax(false, depth + 1);
            cell.textContent = '';
            bestScore = Math.max(score, bestScore);
        });

        if (difficulty === 'medium' && depth === 0) {
            bestScore -= depth;
        }

        return bestScore;
    } else {
        let bestScore = Infinity;
        emptyCells.forEach(cell => {
            cell.textContent = 'X';
            const score = minimax(true, depth + 1);
            cell.textContent = '';
            bestScore = Math.min(score, bestScore);
        });
        return bestScore;
    }
}

function checkWinner() {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const line of lines) {
        const [a, b, c] = line;
        if (document.getElementById('board').children[a].textContent &&
            document.getElementById('board').children[a].textContent ===
            document.getElementById('board').children[b].textContent &&
            document.getElementById('board').children[a].textContent ===
            document.getElementById('board').children[c].textContent) {
            return true;
        }
    }
    return false;
}

function checkTie() {
    const cells = document.getElementsByClassName('cell');
    for (const cell of cells) {
        if (!cell.textContent) {
            return false;
        }
    }
    return true;
}

function resetGame() {
    const cells = document.getElementsByClassName('cell');
    for (const cell of cells) {
        cell.textContent = '';
    }
    currentPlayer = 'X';
}