// initial setup
makeGrid(16);
let cursorStyle = "black";

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
    div.addEventListener("mouseover", paintSquare);
  }
}

// creates the grid for drawing
function makeGrid(dimension) {
  // deletes the old playground and makes new one
  document.querySelector(".playground").remove();
  const playground = document.createElement("div");
  playground.classList.add("playground");
  const main = document.querySelector(".main");
  main.appendChild(playground);

  // fill playground with lines, fills lines with squares
  makeLines(dimension);
  const lines = document.querySelectorAll(".line");
  for (const line of lines) {
    makeSquares(line, dimension);
  }
}

// paints the square
function paintSquare() {
  if (cursorStyle === "black") {
    this.classList.add("blackSquare");
  }
  else if (cursorStyle === "rainbow") {
    this.style.backgroundColor = randomColor();
  }
}

// button for making new grid
const dimensionsBtn = document.querySelector("#dimensions");
dimensionsBtn.addEventListener("click", () => {
  makeGrid(prompt("Number of squares per side:"));
})

// generates random hex color
function randomColor() {
  return '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
}