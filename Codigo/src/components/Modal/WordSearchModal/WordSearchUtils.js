const WordSearch = require("@blex41/word-search");

export const generateOptionsObject = (numRows, numCols, directions) => {
    let disabledDirections = [];

    if (!directions.horizontal)
        disabledDirections.push("W", "E");

    if (!directions.vertical)
        disabledDirections.push("N", "S");

    if (!directions.diagonal)
        disabledDirections.push("NW", "NE", "SW", "SE");

    let backwardsProbability = 0.0;
    if (directions.backwards)
        backwardsProbability = 0.3;

    return {
        cols: parseInt(numCols),
        rows: parseInt(numRows),
        disabledDirections,
        backwardsProbability
    };
};

export const createWordSearch = (wordList, options) => {
    if (options.rows <= 0 || options.cols <= 0)
        return null;

    try {
        const wordSearch = new WordSearch({ ...options, dictionary: wordList, maxWords: wordList.length });

        return wordSearch;
    }
    catch (error) {
        return null;
    }
}

// export const manageError = (error, wordSearchObject, dictionaryLength) => {
//     if (wordSearchObject !== null) {
//         if (wordSearchObject.words.length < dictionaryLength) {
//             error = "No todas las palabras introducidas están en la sopa de letras. Prueba a cambiar el valor de las filas, columnas y/o número máximo de palabras";
//         }
//         else {
//             error = "";
//         }
//     }
//     else {
//         error = "Las filas y columnas deben tener un valor positivo mayor que 0";
//     }

//     return error;
// }