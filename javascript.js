// initial setup
makeGrid(16);

// creates x lines for the grid
function makeLines(lines) {
  const playground = document.querySelector(".playground");
  for (let i = 1; i <= lines; i++) {
    const div = document.createElement("div");
    div.classList.add("line");
    playground.appendChild(div);
  }
}

// creates x boxes in one line
function makeSquares(line, squares) {
  for (let i = 1; i <= squares; i++) {
    const div = document.createElement("div");
    div.classList.add("square");
    line.appendChild(div);
  }
}

// creates the grid for drawing
function makeGrid(dimension) {
  makeLines(dimension);
  const lines = document.querySelectorAll(".line");
  for (const line of lines) {
    makeSquares(line, dimension);
  }
}

// hooks up the event listeners

// removes the grid

