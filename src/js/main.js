function showCatFact() {
    fetch("https://catfact.ninja/fact")
        .then(response => response.json())
        .then(data => {
            document.getElementById("catFact").innerText = data.fact;
        })
        .catch(error => console.error("Kļūda:", error));
}

document.getElementById("darkModeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark");
});

document.getElementById("learnMoreBtn").addEventListener("click", function () {
    document.getElementById("custom").scrollIntoView({
        behavior: "smooth"
    });
});

const rows = 5;
const cols = 5;
const mineCount = 5;
let mines = [];
let revealedCells = 0;
let gameOver = false;

function generateBoard() {
    const board = document.getElementById("gameBoard");
    board.innerHTML = "";
    mines = generateMines();
    revealedCells = 0;
    gameOver = false;
    document.getElementById("gameMessage").innerText = "";

    for (let i = 0; i < rows * cols; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", () => revealCell(cell, i));
        board.appendChild(cell);
    }
}

function generateMines() {
    let mineSet = new Set();
    while (mineSet.size < mineCount) {
        mineSet.add(Math.floor(Math.random() * rows * cols));
    }
    return Array.from(mineSet);
}

function revealCell(cell, index) {
    if (gameOver || cell.classList.contains("revealed")) return;

    if (mines.includes(index)) {
        cell.classList.add("mine");
        cell.innerText = "💥";
        endGame(false);
    } else {
        cell.classList.add("revealed");
        cell.innerText = "🐱";
        revealedCells++;

        if (revealedCells === rows * cols - mineCount) {
            endGame(true);
        }
    }
}

function endGame(win) {
    gameOver = true;
    document.getElementById("gameMessage").innerText = win ? "🐱 Uzvara!" : "🐶 Spēle beigusies!";
    
    document.querySelectorAll(".cell").forEach((cell, i) => {
        if (mines.includes(i)) {
            cell.classList.add("mine");
            cell.innerText = "🐶";
        }
    });
}

function resetGame() {
    generateBoard();
}

document.addEventListener("DOMContentLoaded", generateBoard);