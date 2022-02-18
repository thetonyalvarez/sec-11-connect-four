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
	for (let y = 0; y < HEIGHT; y++) {
		board.push(Array.from({ length: WIDTH }));
	}
};

/** makeHtmlBoard: make HTML table and row of column tops. */

const makeHtmlBoard = () => {
	// get "htmlBoard" variable from the item in HTML w/ID of "board"
	const htmlBoard = document.getElementById("board");

	// set header row for the board
	const top = document.createElement("tr");
	top.setAttribute("id", "column-top");
	top.addEventListener("click", handleClick);

	for (let x = 0; x < WIDTH; x++) {
		const headCell = document.createElement("td");
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

	document.getElementById(`player-info__details--p1`).style.backgroundColor = 'red'
	document.getElementById('player-callout').innerText = `Player ${currPlayer}...`
	document.getElementById('fight').style.color = 'red'
};

/** findSpotForCol: given column x, return top empty y (null if filled) */

const findSpotForCol = (x) => {
	for (let y = HEIGHT - 1; y >= 0; y--) {
		if (!board[y][x]) {
			return y;
		}
	}
	return null;
};

/** placeInTable: update DOM to place piece into HTML table of board */

const placeInTable = (y, x) => {
	// make a div and insert into correct table cell
	const piece = document.createElement("div");
	piece.classList.add("piece");
	piece.classList.add(`p${currPlayer}`);
	piece.style.top = -50 * (y + 2);

	const cell = document.getElementById(`${y}-${x}`);
	cell.appendChild(piece);
	// cell.append(piece);
};

/** endGame: announce game end */

const endGame = (msg) => {
	// pop up alert message
	alert(msg);
};

/** handleClick: handle click of column top to play piece */

const handleClick = (e) => {
	// get x from ID of clicked cell
	const x = +e.target.id;

	// get next spot in column (if none, ignore click)
	const y = findSpotForCol(x);
	if (y === null) {
		return;
	}

	// place piece in board and add to HTML table
	board[y][x] = currPlayer;
	placeInTable(y, x);

	// check for win
	if (checkForWin()) {
		return endGame(`Game over! Player ${currPlayer} is the winner!`);
	}

	// check for tie
	if (board.every((row) => row.every((cell) => cell))) {
		return endGame("Tie!");
	}

	// switch players
	
	currPlayer = currPlayer === 1 ? 2 : 1;
	notCurrPlayer = currPlayer === 1 ? 2 : 1;
	
	activePlayer = document.getElementById(`player-info__details--p${currPlayer}`);
	activePlayer.style.backgroundColor = currPlayer === 1 ? 'red' : 'green'
	inactivePlayer = document.getElementById(`player-info__details--p${notCurrPlayer}`);
	inactivePlayer.style.backgroundColor = ''

	document.getElementById('player-callout').innerText = `Player ${currPlayer}...`
	document.getElementById('fight').style.color = currPlayer === 1 ? 'red' : 'green'

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

	// Create the 4 win scenarios as arrays.
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
			if (_win(horiz) || _win(vert) || _win(diagDL) || _win(diagDR)) {
				return true;
			}
		}
	}
};

makeBoard();
makeHtmlBoard();
