const WordSearch = require("@blex41/word-search");

const generateOptionsObject = (numRows, numCols, directions) => {
	let disabledDirections = [];

	if (!directions.horizontal) disabledDirections.push("W", "E");

	if (!directions.vertical) disabledDirections.push("N", "S");

	if (!directions.diagonal) disabledDirections.push("NW", "NE", "SW", "SE");

	let backwardsProbability = 0.0;
	if (directions.backwards) backwardsProbability = 0.5;

	return {
		cols: parseInt(numCols),
		rows: parseInt(numRows),
		disabledDirections,
		backwardsProbability,
	};
};

export const createWordSearch = (numRows, numCols, directions, wordList) => {
	try {
		const options = generateOptionsObject(numRows, numCols, directions);

		const wordSearch = new WordSearch({
			...options,
			dictionary: wordList,
			maxWords: wordList.length,
		});

		const errors = checkErrors(
			wordList,
			wordSearch,
			numRows,
			numCols,
			directions
		);

		return {
			grid: wordSearch.data.grid,
			errors,
		};
	} catch (error) {
		return null;
	}
};

const checkErrors = (wordList, wordSearchObject, rows, cols, directions) => {
	const ERROR_NO_WORDS =
		"Es necesario introducir alguna palabra para la sopa de letras.";
	const ERROR_NO_DIRECTIONS =
		"Es necesario seleccionar alguna dirección principal (Horizontal, Vertical o Diagonal).";
	const ERROR_INVALID_DIMENSIONS =
		"Número de filas y/o columnas inválido. Deben ser números positivos mayores que cero.";
	const ERROR_NOT_ENOUGH_CELLS =
		"No todas las palabras introducidas están en la sopa de letras. Prueba a cambiar el valor de las filas, las columnas o las direcciones permitidas.";

	let errors = [];

	if (!wordList || wordList.length <= 0) {
		errors.push(ERROR_NO_WORDS);
	}

	const noDirections =
		!directions.horizontal && !directions.vertical && !directions.diagonal;

	if (noDirections) {
		errors.push(ERROR_NO_DIRECTIONS);
	}

	if (rows <= 0 || cols <= 0) {
		errors.push(ERROR_INVALID_DIMENSIONS);
	}

	if (
		!wordSearchObject.words ||
		wordSearchObject.words.length < wordList.length
	) {
		errors.push(ERROR_NOT_ENOUGH_CELLS);
	}

	return errors;
};
