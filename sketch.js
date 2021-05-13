var canvasW = 500;
var cells = [];
var cols = 21;
var cellW = canvasW / cols;

function setup() {
  createCanvas(canvasW, canvasW);
  for (var i = 0; i < cols; i++) {
    cells[i] = 0;
  }
  cells[floor(cols / 2)] = 1; // start with state 1 in the middle of row
}

function draw() {
  background(220, 220, 220);

  // draw the row of cells
  for (var i = 0; i < cols; i++) {
    if (cells[i] == 0) fill(255);
    else if (cells[i] == 1) fill(0);

    rect(i * cellW, 0, cellW, cellW);
  }

  // change each cell colour based on rules
  
}
