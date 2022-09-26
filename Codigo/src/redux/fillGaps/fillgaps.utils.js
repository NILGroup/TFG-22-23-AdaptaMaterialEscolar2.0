/* Create the underscore for one word */
export const createUnders = (word) =>{
    var under = "______";
    for(let i = 0; i < word.length; ++i){
        under += "_";
    }

    return under;
}

/* Returns the word of wordsSelected given an index */
export const returnWord = (wordsSelected, index) =>{
    return wordsSelected.find(word => word.index === index).word;
}

/* Returns the index of word of textSelection given an index */
export const returnIndexOfWord = (wordSelected, index) =>{
    return wordSelected.findIndex(word => word.index === index);
}