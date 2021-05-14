var canvasW = 770;
var canvasH = 770;

var cellRow = [];
var cellHistory = []; // To be a 2D array in setup
var gen = 0;
var rowsOfCells = 0;
var scrollY = canvasH;

var cols = 51;                  // ##### EDIT THIS TO ADD COLUMNS OF CELLS #####
var cellW = canvasW / cols;
var rows = canvasH / cellW

var reachedTop = false;

var genCounter; // to be displayed on page

//var ruleset = [0, 0, 0, 1, 1, 1, 1, 0]; // rule 30
var ruleset = [0, 1, 0, 1, 1, 0, 1, 0]; // rule 90
//var ruleset = [1, 0, 0, 1, 0, 1, 1, 0]; // rule 150
//var ruleset = [1, 0, 1, 1, 1, 1, 0, 0]; // rule 188
//var ruleset = [1, 0, 0, 1, 0, 1, 1, 1]; // rule 151 (cool)

function setup() {
  var cnv = createCanvas(canvasW, canvasH);
  noStroke();
  frameRate(60);                    // ##### EDIT THIS TO CHANGE SPEED #####

  // initialise first row of cells
  for (var i = 0; i < cols; i++) {
    cellRow[i] = 0;
  }
  cellRow[floor(cols / 2)] = 1;

  // initilise 2d array of all cells with first row of cells
  cellHistory[0] = cellRow; // 2D array of cells

  genCounter = createP("Gen: 0").position(10, 10);
  frameDisplay = createP("FPS: 0").position(10, 30);
}

function draw() {
  background(200);
  drawCells();
  deleteRow(gen); // delete row that is offscreen to keep performance stable

  // keep going for x generations
  generate(); // generate next row of cells
  genCounter.html("Gen: " + gen); // displays generation count
  frameDisplay.html("FPS: " + getFrameRate().toFixed(1));
}

function drawCells() {
  // draw the row of cells
  for (var row = 0; row < cellHistory.length; row++) {
    for (var col = 1; col < cols - 1; col++) { // don't check edge cells
      if (cellHistory[row][col] == 1) {
        fill(0);
      } else {
        fill(255);
      }
      rect(cellW * col, scrollY + (cellW * row), cellW, cellW);
    }
  }
}

function deleteRow(rowIndex) {
  var maxRows = (canvasH / cellW) + 1;
  if (cellHistory.length >= maxRows && cellHistory.length > 0) {
    reachedTop = true;
    cellHistory.splice(0, 1);
    rowsOfCells--;
  }
}

function generate() {
  var newCells = [];
  for (var i = 0; i < cols; i++) {
    // change each cell colour based on rules
    newCells[i] = nextGen(cellRow[i - 1], cellRow[i], cellRow[i + 1]);
  }
  cellRow = newCells;
  cellHistory[rowsOfCells] = cellRow;

  rowsOfCells++;
  gen++;
  if (!reachedTop) scrollY -= cellW; // move the top of the pattern up by one cell height
}

function nextGen(left, self, right) {
  var index = (4*left + 2*self + right);
  if (index >= 0 && index <= 7) {
    return ruleset[7 - index];
  } else {
    return 0; // if cell only has 1 neighbour (on edge) make it white
  }
}
