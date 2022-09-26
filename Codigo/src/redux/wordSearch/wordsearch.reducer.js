import WordSearchActionTypes from './wordsearch.types';
import { backwardsProb, createWordSearch, diagonalDirs, horizontalDirs, manageError, manageReadyToPreview, verticalDirs } from './wordsearch.utils';
import update from 'react-addons-update';

const INITIAL_STATE = {
    showWordSearchModal: false,
    rows: '',
    cols: '',
    dictionary: [""],
    vertical: false,
    horizontal: false,
    diagonal: false,
    maxWords: 20,
    activateBackwards: false,
    backwardsProbability: 0.0, //init to 0.3 when activateBackwards is true
    error: "",
    disabledDirections: ["N", "S", "W", "E", "NW", "NE", "SW", "SE"],
    wordSearchObject: null,
    hiddenWords: false,
    readyToPreview: false,
    addHowToSolve: false
}

const wordSearchReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case WordSearchActionTypes.OPEN_WORDSEARCH_MODAL:
            return{
                ...state,
                showWordSearchModal: true
            };
        case WordSearchActionTypes.CLOSE_WORDSEARCH_MODAL:
            return{
                ...state,
                showWordSearchModal: false
            };
        case WordSearchActionTypes.UPDATE_WORDSEARCH_ROWS:
            return{
                ...state,
                rows: action.payload
            };
        case WordSearchActionTypes.UPDATE_WORDSEARCH_COLS:
            return{
                ...state,
                cols: action.payload
            };
        case WordSearchActionTypes.UPDATE_WORDSEARCH_DICTIONARY:
            return{
                ...state,
                dictionary: update(state.dictionary, {[action.payload.index]: {$set: action.payload.dictionary}})
            };
        case WordSearchActionTypes.UPDATE_WORDSEARCH_VERTICAL:
            return{
                ...state,
                vertical: action.payload,
                disabledDirections: verticalDirs(state.disabledDirections, action.payload)
            };
        case WordSearchActionTypes.UPDATE_WORDSEARCH_HORIZONTAL:
            return{
                ...state,
                horizontal: action.payload,
                disabledDirections: horizontalDirs(state.disabledDirections, action.payload)
            };
        case WordSearchActionTypes.UPDATE_WORDSEARCH_DIAGONAL:
            return{
                ...state,
                diagonal: action.payload,
                disabledDirections: diagonalDirs(state.disabledDirections, action.payload)
            };
        case WordSearchActionTypes.UPDATE_WORDSEARCH_MAXWORDS:
            return{
                ...state,
                maxWords: action.payload
            };
        case WordSearchActionTypes.UPDATE_WORDSEARCH_ACTIVATEBACKWARDS:
            return{
                ...state,
                activateBackwards: action.payload,
                backwardsProbability: backwardsProb(state.backwardsProbability, action.payload)
            };
        case WordSearchActionTypes.UPDATE_WORDSEARCH_BACKWARDSPROBABILITY:
            return{
                ...state,
                backwardsProbability: action.payload
            };
        case WordSearchActionTypes.UPDATE_WORDSEARCH_ERROR:
            return{
                ...state,
                error: manageError(state.error, state.wordSearchObject, state.dictionary.length)
            };
        case WordSearchActionTypes.RESET_WORDSEARCH:
            return{
                ...state,
                rows: '',
                cols: '',
                dictionary: [""],
                vertical: false,
                horizontal: false,
                diagonal: false,
                maxWords: 20,
                activateBackwards: false,
                backwardsProbability: 0.0,
                error: "",
                disabledDirections: ["N", "S", "W", "E", "NW", "NE", "SW", "SE"],
                wordSearchObject: null,
                readyToPreview: false,
                hiddenWords: false,
                addHowToSolve: false
            };
        case WordSearchActionTypes.CREATE_WORDSEARCH:
            return{
                ...state,
                wordSearchObject: createWordSearch(state.wordSearchObject, {rows: state.rows, cols: state.cols, dictionary: state.dictionary, disabledDirections: state.disabledDirections, 
                    maxWords: state.maxWords, backwardsProbability: state.backwardsProbability, diacritics:true})
            };
        case WordSearchActionTypes.UPDATE_WORDSEARCH_HIDDENWORDS:
            return{
                ...state,
                hiddenWords: action.payload
            };
        case WordSearchActionTypes.UPDATE_WORDSEARCH_READYTOPREVIEW:
            return{
                ...state,
                readyToPreview: (action.payload !== undefined ? action.payload : manageReadyToPreview(state.readyToPreview, state.wordSearchObject, state.error))
            };
        case WordSearchActionTypes.ADD_MORE_DICTIONARY:
            return{
                ...state,
                dictionary: [...state.dictionary.slice(0,state.dictionary.length), "", ...state.dictionary.slice(state.dictionary.length + 1)]
            };
        case WordSearchActionTypes.DELETE_DICTIONARY:
            return{
                ...state,
                dictionary: [...state.dictionary.slice(0,action.payload), ...state.dictionary.slice(action.payload + 1)]
            };
        case WordSearchActionTypes.UPDATE_WORDSEARCH_ADDHOWTOSOLVE:
            return{
                ...state,
                addHowToSolve: action.payload
            }
        default: 
            return state;
    }
};

export default wordSearchReducer;