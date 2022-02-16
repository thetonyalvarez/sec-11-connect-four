/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

const makeBoard = () => {
	// set "board" to empty HEIGHT x WIDTH matrix array
	for (let row = 0; row < HEIGHT; row++) {
		board[row] = new Array(row);
		for (let cell = 0; cell < WIDTH; cell++) {
			board[row][cell] = "empty";
		}
	}
	return board;
};

/** makeHtmlBoard: make HTML table and row of column tops. */

const makeHtmlBoard = () => {
	// get "htmlBoard" variable from the item in HTML w/ID of "board"
	const htmlBoard = document.getElementById("board");

	// set header row for the board
	let top = document.createElement("tr");
	top.setAttribute("id", "column-top");
	top.addEventListener("click", handleClick);

	for (let x = 0; x < WIDTH; x++) {
		let headCell = document.createElement("td");
		headCell.setAttribute("id", x);
		top.appendChild(headCell);
	}
	htmlBoard.appendChild(top);

	// set tr row, and td cells for each row
	for (let y = 0; y < HEIGHT; y++) {
		const row = document.createElement("tr");
		for (let x = 0; x < WIDTH; x++) {
			const cell = document.createElement("td");
			cell.setAttribute("id", `${y}-${x}`);
			row.appendChild(cell);
		}
		htmlBoard.appendChild(row);
	}
};

/** findSpotForCol: given column x, return top empty y (null if filled) */

const findSpotForCol = (x) => {
	for (let y = HEIGHT; y >= 0; y--) {
		if (board[x][y].length > 0 && board[x][y] !== "empty") {
			return null;
		} else if (board[x][y] == "empty") {
			return board[x][y];
		} else if (err) {
			return err;
		}
	}
};

/** placeInTable: update DOM to place piece into HTML table of board */

const placeInTable = (y, x) => {
	// make a div and insert into correct table cell
	const piece = document.createElement("div");
	const cell = document.getElementById(y + "-" + x);
	piece.className = "filled";
	cell.appendChild(piece);
};

/** endGame: announce game end */

const endGame = (msg) => {
	// pop up alert message
	alert(msg);
};

/** handleClick: handle click of column top to play piece */

const handleClick = (e) => {
	// get x from ID of clicked cell
	var x = +e.target.id;
	console.log(x);

	// get next spot in column (if none, ignore click)
	let y = findSpotForCol(x);
	if (y === "empty") {
		return;
	}

	// place piece in board and add to HTML table
	// add line to update in-memory board
	placeInTable(y, x);
	localStorage.setItem(y, x);

	// check for win
	if (checkForWin()) {
		endGame("Game over!");
	}

	// check for tie
	// check if all cells in board are filled; if so call, call endGame
	for (let y = 0; y < HEIGHT; y++) {
		for (let x = 0; x < WIDTH; x++) {
			if (x === "empty") {
				return;
			} else {
				alert("It's a tie!");
			}
		}
	}

	// switch players
	// switch currPlayer 1 <-> 2
	if (currPlayer % 2 === 0) {
		currPlayer = 1;
	} else {
		currPlayer++;
	}
};

/** checkForWin: check board cell-by-cell for "does a win start here?" */

const checkForWin = () => {
	const _win = (cells) => {
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
	};
	// TODO: read and understand this code. Add comments to help you.
	for (let y = 0; y < HEIGHT; y++) {
		for (let x = 0; x < WIDTH; x++) {
			let horiz = [
				[y, x],
				[y, x + 1],
				[y, x + 2],
				[y, x + 3],
			];
			let vert = [
				[y, x],
				[y + 1, x],
				[y + 2, x],
				[y + 3, x],
			];
			let diagDL = [
				[y, x],
				[y + 1, x - 1],
				[y + 2, x - 2],
				[y + 3, x - 3],
			];
			let diagDR = [
				[y, x],
				[y + 1, x + 1],
				[y + 2, x + 2],
				[y + 3, x + 3],
			];
			if (_win(horiz) || _win(vert) || _win(diagDL) || _win(diagDR)) {
				return true;
			}
		}
	}
};

makeBoard();
makeHtmlBoard();
