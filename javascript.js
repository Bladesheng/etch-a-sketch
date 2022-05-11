// initial setup
makeGrid(16);
let cursorStyle = "black";

// buttons for selecting cursor type
const blackBtn = document.querySelector("#black");
blackBtn.addEventListener("click", () => {
  cursorStyle = "black";
}) 

const rainbowBtn = document.querySelector("#rainbow");
rainbowBtn.addEventListener("click", () => {
  cursorStyle = "rainbow";
})

const darkenBtn = document.querySelector("#darken");
darkenBtn.addEventListener("click", () => {
  cursorStyle = "darken";
})

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
  else if (cursorStyle === "darken") {
    // returns current css backgroundImage property
    let cssBackground = getComputedStyle(this).backgroundImage;
    // extracts current alpha of the gradient
    let gradientAlpha1 = cssBackground.substring(30, 33);
    let gradientAlpha2 = cssBackground.substring(50, 53);

    // doesn't go to 1.0 alpha to avoid bugs
    // (1.0 rgba gets converted to normal rgb)
    if (gradientAlpha2 < 0.9) {
      // increments both alphas by 0.1
      gradientAlpha1 = +gradientAlpha1 + 0.1;
      gradientAlpha2 = +gradientAlpha2 + 0.1;

      // creates new backgroundImage string
      cssBackground = `linear-gradient(rgba(0, 0, 0, ${gradientAlpha1}), rgba(0, 0, 0, ${gradientAlpha2}))`;

      // changes the backgroundImage property of the DOM element
      this.style.backgroundImage = cssBackground;
    }
    // lighten if condtion goes here?

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