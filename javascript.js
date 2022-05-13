// initial setup
const isTouchDevice = 'ontouchstart' in document.documentElement;
let cursorStyle = "customColor";
makeGrid(16);

// buttons for selecting cursor type
const colorpicker = document.querySelector("#colorpicker");

const customColorBtn = document.querySelector("#customColor");
customColorBtn.addEventListener("click", () => {
  cursorStyle = "customColor";
}) 

const rainbowBtn = document.querySelector("#rainbow");
rainbowBtn.addEventListener("click", () => {
  cursorStyle = "rainbow";
})

const darkenBtn = document.querySelector("#darken");
darkenBtn.addEventListener("click", () => {
  cursorStyle = "darken";
})

const lightenBtn = document.querySelector("#lighten");
lightenBtn.addEventListener("click", () => {
  cursorStyle = "lighten";
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
    if (! isTouchDevice) { // to prevent mouseover bugs on mobile
      div.addEventListener("mouseover", paintSquare);
    }
  }
}

// creates the grid for drawing
function makeGrid(dimension) {
  // deletes the old playground and makes new one
  document.querySelector(".playground").remove();
  const playground = document.createElement("div");
  playground.classList.add("playground");
  const main = document.querySelector(".controls");
  main.after(playground);

  // fill playground with lines, fills lines with squares
  makeLines(dimension);
  const lines = document.querySelectorAll(".line");
  for (const line of lines) {
    makeSquares(line, dimension);
  }
}

// paints the square
function paintSquare(squareNode) {
  // correction for PC - eventListener passes mouseover event as squareNode
  if (squareNode.nodeType === undefined) {
    squareNode = this;
  }

  if (cursorStyle === "customColor") {
    squareNode.style.backgroundColor = colorpicker.value;
  }
  else if (cursorStyle === "rainbow") {
    squareNode.style.backgroundColor = randomColor();
  }
  else if (cursorStyle === "darken" || cursorStyle === "lighten") {
    // returns filter css property (containing brightness)
    let cssFilter = getComputedStyle(squareNode).filter;
    // extracts brightness from the filter property
    let brightness = cssFilter.match(/\(([^)]+)\)/)[1];
 
    // decreases or increases brightness
    if (cursorStyle === "darken") {
      brightness = +brightness - 0.1;
    }
    else if (cursorStyle === "lighten") {
      brightness = +brightness + 0.1;
    }
   
    // creates new filter property
    cssFilter = `brightness(${brightness})`;
    // inserts the filter property into the element
    squareNode.style.filter = cssFilter;
  }
}

// button for making new grid
// const dimensionsBtn = document.querySelector("#dimensions");
// dimensionsBtn.addEventListener("click", () => {
//   makeGrid(prompt("Number of squares per side:"));
// })

// generates random hex color
function randomColor() {
  return '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
}

// updates the grid size when sliding the slider
const slider = document.querySelector(".slider");
slider.onchange = () => {
  makeGrid(slider.value);
}

// wipes the board, keep current size
const wipeBtn = document.querySelector("#wipe");
wipeBtn.addEventListener("click", () => {
  makeGrid(slider.value);
});


// mobile version
// tracks finger position and paints on touch devices
// code borrowed from: https://stackoverflow.com/questions/60460226/what-is-the-best-way-to-simulate-mouseover-on-mobile-browsers-with-touch-events

if (isTouchDevice) { // mobile only
  // initial setup
  let isActivelyPainting = false;
  let currHoverTarget = null;

  // fires everytime you touch the screen for the first time
  document.addEventListener("touchstart", (evt) => {
    // first thing you touch
    let target = evt.target;

    // proceed only with elements that are paintable (squares)
    if (target.classList.contains("square")) {
      isActivelyPainting = true;
      currHoverTarget = target;

      // paints the touched square
      paintSquare(currHoverTarget);

      // stop mobile scrolling
      evt.preventDefault();
    }
  }, {
    passive: false // Needed to avoid errors in some browsers
  })

  // fires everytime you move your finger over the screen
  document.addEventListener("touchmove", (evt) => {
    // only if you already touched the screen
    if (isActivelyPainting) { 
      // the original square you touched
      let target = evt.target;
      
      // the if condition is probably not even necessary
      // just double checking
      if (target.classList.contains("square")) {
        // tracks finger position
        let x = evt.touches[0].clientX;
        let y = evt.touches[0].clientY;
        // selects element at finger position
        let hoveredElem = document.elementFromPoint(x, y);

        // checks if you moved out of the previous square to a different element and if that element is still square
        if (hoveredElem !== currHoverTarget && hoveredElem.classList.contains("square")) {
          // paints the newly selected square
          paintSquare(hoveredElem);

          // changes the current square to the newly hovered over square (the one you just paitned)
          currHoverTarget = hoveredElem;
        }
      }
    }
  })

  // disengages the touchmove tracking function when your finger is off the screen 
  document.addEventListener("touchend", () => {
    isActivelyPainting = false;
    currHoverTarget = null;
  })
}