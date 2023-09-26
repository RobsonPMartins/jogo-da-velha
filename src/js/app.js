// app.js
const grid = document.getElementById("grid");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset-button");

let currentPlayer = "1º";
const playerSymbols = {
    "1º": "X",
    "2º": "O"
};

const cells = ["", "", "", "", "", "", "", "", ""]; // Representa o tabuleiro do jogo

function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a];
        }
    }

    if (cells.includes("")) {
        return null; // O jogo ainda não acabou
    } else {
        return "Empate"; // Todas as células estão preenchidas, é um empate
    }
}

function handleClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(grid.children).indexOf(cell);

    if (cells[cellIndex] !== "" || checkWinner()) {
        return; // A célula já está preenchida ou o jogo terminou
    }

    cells[cellIndex] = currentPlayer;
    cell.textContent = playerSymbols[currentPlayer];
    cell.classList.add("filled");

    const winner = checkWinner();
    if (winner) {
        status.textContent = winner === "Empate" ? "Empate!" : `Jogador ${winner} venceu!`;
    } else {
        currentPlayer = currentPlayer === "1º" ? "2º" : "1º";
        status.textContent = `Vez do jogador ${currentPlayer}`;
    }
}

function resetGame() {
    cells.fill("");
    const cellElements = document.querySelectorAll(".cell");
    cellElements.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("filled");
    });

    currentPlayer = "1º";
    status.textContent = `Vez do jogador ${currentPlayer}`;
}

grid.addEventListener("click", handleClick);
resetButton.addEventListener("click", resetGame);

// Inicializar o jogo
resetGame();
