// let's code here

let xClass = "x";
let circleClass = "circle";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let cellElement = document.querySelectorAll("[data-cell]");
let board = document.getElementById("board");
let winningMessageElement = document.getElementById('winningMessage');
let winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);

let restartButton = document.querySelector('#restartButton');
let circleTurn;

startGame();
restartButton.addEventListener('click', startGame);

function startGame() {
  circleTurn = false;
  cellElement.forEach((cell) => {
        cell.classList.remove(xClass);
        cell.classList.remove(circleClass);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? circleClass : xClass;
    placeMark(cell, currentClass);
    //place Mark
    //check for win
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        //check for draw
        endGame(true);
    } else {
        //switch turns
        swapTurns();
        setBoardHoverClass();
    }

    // swapTurns();
    // setBoardHoverClass();
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Game over! 😫";
  } else {
    winningMessageTextElement.innerText = `${
      circleTurn ? "O's" : "X's"
    } wins! 🎊`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElement].every((cell) => {
    return (
      cell.classList.contains(xClass) || cell.classList.contains(circleClass)
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(xClass);
  board.classList.remove(circleClass);

  if (circleTurn) {
    board.classList.add(circleClass);
  } else {
    board.classList.add(xClass);
  }
}

function checkWin(currentClass) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElement[index].classList.contains(currentClass);
    });
  });
}

