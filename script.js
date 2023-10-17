const grid = document.getElementById('grid');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

// Creates the grid cells
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', () => handleCellClick(i));
    grid.appendChild(cell);
}

// Handle cell click event
function handleCellClick(index) {
    if (gameOver || gameBoard[index]) return;

    gameBoard[index] = currentPlayer;
    document.querySelector(`[data-index="${index}"]`).textContent = currentPlayer;
    document.querySelector(`[data-index="${index}"]`).classList.add(currentPlayer);

    if (checkWinner(currentPlayer)) {
        status.textContent = `Player ${currentPlayer} wins!`;
        gameOver = true;
    } else if (gameBoard.every((cell) => cell !== '')) {
        status.textContent = "It's a draw!";
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Checks for a winner
function checkWinner(player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => gameBoard[index] === player);
    });
}

// Resets the game
resetButton.addEventListener('click', () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    status.textContent = "Player X's turn";
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
});
