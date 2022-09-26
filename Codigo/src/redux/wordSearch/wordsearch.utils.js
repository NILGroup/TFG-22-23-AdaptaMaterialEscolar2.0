const WordSearch = require("@blex41/word-search");

/* Manages backwardsProbability */
export const backwardsProb = (backwardsProbability, activateBackwards) =>{
    if(activateBackwards === true){
        backwardsProbability = 0.3;
    }
    else backwardsProbability = 0.0;

    return backwardsProbability;
}

/* Manages vertical directions */
export const verticalDirs = (disabledDirections, vertical) =>{
    if(vertical === false){
        disabledDirections.push("N", "S");
    }
    else{
        disabledDirections = disabledDirections.filter((value) =>{
            return value !== "N" && value !== "S";
        });
    }

    return disabledDirections;
}

/* Manages horizontal directions */
export const horizontalDirs = (disabledDirections, horizontal) =>{
    if(horizontal === false){
        disabledDirections.push("W", "E");
    }
    else{
        disabledDirections = disabledDirections.filter((value) =>{
            return value !== "W" && value !== "E";
        });
    }

    return disabledDirections;
}

/* Manages diagonal directions */
export const diagonalDirs = (disabledDirections, diagonal) =>{
    if(diagonal === false){
        disabledDirections.push("NW", "NE", "SW", "SE");
    }
    else{
        disabledDirections = disabledDirections.filter((value) =>{
            return value !== "NW" && value !== "NE" && value !== "SW" && value !== "SE";
        });
    }

    return disabledDirections;
}

/* Creates the wordsearch object. If there is an error or exception, it returns null */
export const createWordSearch = (wordSearchObject, options) =>{
    try{
        options ={
            ...options,
            rows: parseInt(options.rows),
            cols: parseInt(options.cols),
            dictionary: options.dictionary.map(item => item.trim()),
            maxWords: parseInt(options.maxWords)
        }
        if(options.rows > 0 && options.cols > 0){
            const ws = new WordSearch(options);
            wordSearchObject = ws;
            
            return wordSearchObject;
        }
        else return null;
        
    }
    catch(error){
        return null;
    }
}

/* Manages errors */
export const manageError = (error, wordSearchObject, dictionaryLength) =>{
    if(wordSearchObject !== null){
        if(wordSearchObject.words.length < dictionaryLength){
            error = "No todas las palabras introducidas están en la sopa de letras. Prueba a cambiar el valor de las filas, columnas y/o número máximo de palabras";
        }
        else {
            error = "";
        }
    }
    else{
        error = "Las filas y columnas deben tener un valor positivo mayor que 0";
    }

    return error;
}

/* Manages readyToPreview variable */
export const manageReadyToPreview = (readyToPreview, wordSearchObject, error) =>{
    if((error === '' || error.startsWith('N')) && wordSearchObject !== null){
        readyToPreview = true;
    }
    else{
        readyToPreview = false;
    }

    return readyToPreview;
}