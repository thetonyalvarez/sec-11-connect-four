describe("Connect Four testing", () => {
	beforeEach(() => {
		makeBoard();
	});

	it("create a table matrix based on WIDTH and HEIGHT", () => {
		for (let y = 0; y < HEIGHT; y++) {
			for (let x = 0; x < WIDTH; x++) {
				board[y][x] = "empty cell";
			}
		}
		expect(board[0][0]).toEqual("empty cell");
		expect(board[HEIGHT - 1][WIDTH - 1]).toEqual("empty cell");

		expect(() => board[HEIGHT][WIDTH]).toThrowError;
	});

	afterEach(() => {
		let board = [];
	});
});
