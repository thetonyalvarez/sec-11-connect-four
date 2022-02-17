// TODO: Can I test click events?
describe("Click event testing", () => {
	// 	let spyEvent;
	// 	beforeEach(() => {});
	// 	it("should listen for a click event", () => {
	// 		spyEvent = spyOnEvent(window, "click");
	// 		expect(handleClick(e));
	// 	});
});

// describe("Creating DOM elements", () => {
// 	beforeEach(() => {
// 		makeBoard();
// 	});

// 	// TODO: create tests for creating elements - see other exercises
// 	// makeBoard;
// 	// makeHtmlBoard;
// 	// placeInTable;
// 	it("should place the piece into the correct cell", () => {});

// 	afterEach(() => {
// 		let board = [];
// 	});
// });

describe("Connect Four testing", () => {
	beforeEach(() => {
		makeBoard();
	});
	it("create a table matrix based on WIDTH and HEIGHT", () => {
		makeBoard();
		expect(board[0][2]).toEqual("empty");
		expect(() => board[0][99]).toThrowError;
		expect(() => board[99][0]).toThrowError;
	});

	// it("should return top empty y value in the table matrix using findSpotForCol(x)", () => {
	// 	board[4][2] = "piece";
	// 	board[5][2] = "piece";
	// 	board[5][3] = "piece";
	// 	// expect(findSpotForCol(1)).toEqual("empty");
	// 	// expect(findSpotForCol(2)).toEqual(null);
	// 	// expect(findSpotForCol(3)).toEqual(null);
	// 	// expect(() => findSpotForCol(44)).toThrowError;
	// });

	it("should show an alert when endGame() is run", () => {
		// spyOn(window, "alert");
		// expect(window.alert).toHaveBeenCalledWith(endGame());
	});

	afterEach(() => {
		let board = [];
	});
});
