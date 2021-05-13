var canvasW = 800;
var canvasH = 800;

var cells = [];
var gen = 0;

var cols = 100;
var cellW = canvasW / cols;

//var ruleset = [0, 0, 0, 1, 1, 1, 1, 0]; // rule 30
//var ruleset = [0, 1, 0, 1, 1, 0, 1, 0]; // rule 90
//var ruleset = [1, 0, 0, 1, 0, 1, 1, 0]; // rule 150
//var ruleset = [1, 0, 1, 1, 1, 1, 0, 0]; // rule 188
var ruleset = [1, 0, 0, 1, 0, 1, 1, 1]; // rule 151 (favourite)

function setup() {
  createCanvas(canvasW, canvasH);
  noStroke();

  for (var i = 0; i < cols; i++) {
    cells[i] = 0;
  }
  var middleish = floor(cols / 2);
  cells[middleish] = 1
  frameRate(60);
}

function draw() {
  // draw the row of cells
  for (var i = 0; i < cols; i++) {
    (cells[i] == 0) ? fill(255) : fill(0);
    rect(i * cellW, cellW * gen, cellW, cellW); // draw the cell
  }

  if (gen < canvasH / cellW) {
    generate(); // generate next row of cells
  }
}

function generate() {
  newCells = [];
  for (var i = 1; i < cols - 1; i++) {
    // change each cell colour based on rules
    newCells[i] = nextGen(cells[i - 1], cells[i], cells[i + 1]);
  }
  cells = newCells;

  gen++;
}

function nextGen(left, self, right) {
  var index = (4*left + 2*self + right);
  if (index >= 0 && index <= 7) {
    return ruleset[7 - index];
  } else {
    return 0;
  }
}
