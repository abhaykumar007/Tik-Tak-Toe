// Two teams
const xClass = "x";
const circleClass = "circle";

// Winning Conditions of a board
const winning = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let circleTurn;

// Elements from HTML
const cellElement = document.querySelectorAll(".cell");
const board = document.querySelector(".container");
const winningShow = document.querySelector(".winning");
const winningMsg = document.querySelector(".winningMsg");
const restart = document.querySelector(".reset");

// Starting the game by reseting & adding Listener
startGame();
function startGame() {
  circleTurn = false;
  cellElement.forEach((cell) => {
    if (cell.classList.contains(xClass)) {
      cell.classList.remove(xClass);
    } else if (cell.classList.contains(circleClass)) {
      cell.classList.remove(circleClass);
    }
  });
  cellElement.forEach((cell) => {
    cell.addEventListener("click", handelClick, { once: true });
  });
  setHover();
}

// after every click
function handelClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? circleClass : xClass;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    // console.log(` winner '${currentClass}'`);
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
    setHover();
  }
}

// Adding X and O
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

// Shift the Turns
function swapTurn() {
  circleTurn = !circleTurn;
}

function checkWin(currentClass) {
  console.log("in checkWin");
  return winning.some((combo) => {
    return combo.every((index) => {
      return cellElement[index].classList.contains(currentClass);
    });
  });
}
function isDraw() {
  // [...name] is desturcturing read it
  return [...cellElement].every((cell) => {
    return (
      cell.classList.contains(xClass) || cell.classList.contains(circleClass)
    );
  });
}
function endGame(draw) {
  if (draw) {
    winningMsg.innerText = "Draw !!!";
  } else {
    winningMsg.innerText = ` ${circleTurn ? "O's" : "X's"} Wins!!!`;
  }

  winningShow.classList.add("show");
}

function setHover() {
  board.classList.remove(xClass);
  board.classList.remove(circleClass);

  if (circleTurn) {
    board.classList.add(circleClass);
  } else {
    board.classList.add(xClass);
  }
}

restart.addEventListener("click", () => {
  winningShow.classList.remove("show");
  startGame();
});
