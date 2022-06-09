/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  // this loops through the HEIGHT x WIDTH matrix. For every x (row) there is a y (column)

  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  // this part of the function is creating the x-axis (columns) of the visual board.
  // there should be a player piece dropped into the board when clicked via the click event listener.
  const htmlBoard = document.getElementById("board");
  const top = document.createElement("tr"); // creates top row inside of board.
  top.setAttribute("id", "column-top"); // adds id, column-top to the top row.
  top.addEventListener("click", handleClick); // makes top row clickable.

  for (let x = 0; x < WIDTH; x++) { // creates cell in the top row of the given width.
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x); // adds id of x position to each cell.
    top.append(headCell); // apppends each cell to the top row
  }

  htmlBoard.append(top); // appends the whole top row to the htmlBoard. 

  // this part of the function is creating the y-axis (rows) of the visual board. gives it a coordinate id. 
  for (let y = 0; y < HEIGHT; y++) { // creates a row for the given height.
    const row = document.createElement("tr"); // creates table rows
    for (let x = 0; x < WIDTH; x++) { // creates cells within the row for the given width
      const cell = document.createElement("td"); // creates table data cells
      cell.setAttribute("id", `${y}-${x}`); // gives each cell an id of its coordiates.
      row.append(cell); // add cell to the given row.
    }
    htmlBoard.append(row); // places the table rows to the board table. 
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // this loops through the y index for the given x index. returns the y index if empty, returns null if all y indices for given x are full.
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div"); // creates new piece.
  piece.classList.add("piece"); // adds piece class.
  piece.classList.add(`p${currPlayer}`); // adds current player class.
  const spot = document.getElementById(`${y}-${x}`); // gets current cell.
  spot.append(piece); // appends new piece to current cell. 
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = evt.target.id;
  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every((row) => row.every((cell) => cell))) {
    return endGame("Tie!");
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  // Checking if there are 4 same color pieces horizontally, vertically or diagonally.
  // Based on that we will know the winneer.
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      const vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      const diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      const diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

