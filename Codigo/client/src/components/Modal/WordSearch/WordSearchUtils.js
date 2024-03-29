const WordSearch = require("@blex41/word-search");

export const createWordSearch = (
	numRows,
	numCols,
	directions,
	backwardsProbability,
	wordList,
	minDimension,
	maxDimension
) => {
	const ERROR_NO_DIRECTIONS =
		"Es necesario seleccionar alguna dirección principal (Horizontal, Vertical o Diagonal).";
	const ERROR_INVALID_DIMENSIONS = `Número de filas y/o columnas inválido. Deben ser números entre ${minDimension} y ${maxDimension}, ambos incluidos.`;
	const ERROR_NO_WORDS =
		"No se ha podido añadir ninguna palabra a la sopa de letras. Prueba a cambiar el número de filas/columnas y/o las direcciones permitidas.";
	const WARNING_NOT_ENOUGH_CELLS =
		"No todas las palabras introducidas están en la sopa de letras. Prueba a cambiar el número de filas/columnas y/o las direcciones permitidas.";

	const options = generateOptionsObject(numRows, numCols, directions, backwardsProbability);
	const noDirections = !directions.horizontal && !directions.vertical && !directions.diagonal;

	// Gestion de errores
	let errors = [];

	if (numRows < minDimension || numRows > maxDimension || numCols < minDimension || numCols > maxDimension)
		errors.push(ERROR_INVALID_DIMENSIONS);

	if (noDirections) errors.push(ERROR_NO_DIRECTIONS);

	try {
		// Gestion de avisos
		let warnings = [];

		const wordSearch = new WordSearch({
			...options,
			dictionary: wordList,
			maxWords: wordList.length,
		});

		if (wordSearch.words.length == 0) errors.push(ERROR_NO_WORDS);

		if (errors.length > 0) return { grid: null, warnings: null, errors };

		if (!wordSearch.words || wordSearch.words.length < wordList.length) warnings.push(WARNING_NOT_ENOUGH_CELLS);

		return {
			grid: wordSearch.grid,
			addedWords: wordSearch.words.map((word) => word.clean),
			warnings: warnings,
			errors: null,
		};
	} catch (error) {
		console.log(error);

		return null;
	}
};

const generateOptionsObject = (numRows, numCols, directions, backwardsProbability) => {
	let disabledDirections = [];

	if (!directions.horizontal) disabledDirections.push("W", "E");

	if (!directions.vertical) disabledDirections.push("N", "S");

	if (!directions.diagonal) disabledDirections.push("NW", "NE", "SW", "SE");

	return {
		cols: parseInt(numCols),
		rows: parseInt(numRows),
		disabledDirections,
		backwardsProbability,
		diacritics: true,
	};
};
