/* section for utils */
const wordBank = ['vapid', 'overt', 'later', 'hello', 'rapid'];
const gameinput = document.getElementById('gameinput');
const gameboard = document.getElementById('gameboard');

let gameBoardState = {
	hiddenWord: wordBank[Math.floor(Math.random() * wordBank.length)],
	gameBoardGrid: Array(6)
		.fill()
		.map(() => Array(5).fill('')),
	currentRow: 0,
	currentCol: 0,
};

const createBoard = (gameboard) => {
	const letterSquareGrid = document.createElement('div');
	letterSquareGrid.className = 'letterSquareGrid';
	for (let i = 0; i < 6; i++) {
		for (let j = 0; j < 5; j++) {
			createlsq(letterSquareGrid, i, j);
		}
	}
	gameboard.appendChild(letterSquareGrid);
};

const createlsq = (letterSquareGrid, row, col, letter = '') => {
	const letsqs = document.createElement('div');
	letsqs.className = 'letsq';
	letsqs.textContent = letter;
	letsqs.id = `letsqs${row}${col}`;
	letterSquareGrid.appendChild(letsqs);
	return letsqs;
};

const updateLetterSquareGrid = () => {
	document.body.onkeydown = (e) => {
		const { currentRow, currentCol } = gameBoardState;

		if (e.key === 'Enter') {
			if (currentCol < 5) {
				alert("You haven't filled all the letters in this row yet!");
				return;
			}
			gameBoardState.currentRow++;
			gameBoardState.currentCol = 0;
		} else if (e.key === 'Backspace') {
			if (currentCol > 0) {
				const previousLetterSquare = document.getElementById(
					`letsqs${currentRow}${currentCol - 1}`
				);
				previousLetterSquare.textContent = '';
				gameBoardState.gameBoardGrid[currentRow][currentCol - 1] = '';
				gameBoardState.currentCol--;
			}
		} else if (e.key.match(/[a-z]/i)) {
			if (currentCol > 4) {
				alert("You've reached the maximum number of letters per row!");
				return;
			}
			const letterSquare = document.getElementById(
				`letsqs${currentRow}${currentCol}`
			);
			letterSquare.textContent = e.key;
			gameBoardState.gameBoardGrid[currentRow][currentCol] = e.key;
			gameBoardState.currentCol++;
		}
	};
};

const initGame = () => {
	createBoard(gameboard);
	alert('welcome to hackneyWordle');
	console.log(gameBoardState.hiddenWord);
	updateLetterSquareGrid();
};

/* initialising the game */
initGame();
