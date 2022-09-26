import FillGapsActionTypes from './fillgaps.types';
import update from 'react-addons-update';
import {createUnders, returnWord, returnIndexOfWord} from './fillgaps.utils';

const INITIAL_STATE = {
    showModal: false,
    text: '',
    addHowToSolve: false,
    mode: "edition",
    textSelection: [],
    wordsSelected: []
}

const fillGapsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case FillGapsActionTypes.OPEN_FILLGAPS_MODAL: 
           return {
                ...state,
                showModal: true
            };
        case FillGapsActionTypes.CLOSE_FILLGAPS_MODAL: 
            return {
                 ...state,
                 showModal: false
             };
        case FillGapsActionTypes.RESET_FILLGAPS:
            return{
                ...state,
                text: '',
                addHowToSolve: false,
                mode: "edition",
                textSelection: [],
                wordsSelected: []
            };
        case FillGapsActionTypes.UPDATE_FILLGAPS_TEXT:
            return{
                ...state,
                text: action.payload
            };
        case FillGapsActionTypes.UPDATE_FILLGAPS_ADDHOWTOSOLVE:
            return{
                ...state,
                addHowToSolve: action.payload
            };
        case FillGapsActionTypes.UPDATE_FILLGAPS_MODE:
            return{
                ...state,
                mode: action.payload
            };
        case FillGapsActionTypes.UPDATE_FILLGAPS_TEXTSELECTION:
            return{
                ...state,
                textSelection: state.text.split(" ").map(item => item.trim())
            };
        case FillGapsActionTypes.UPDATE_FILLGAPS_ADDSELECTED:
            return{
                ...state,
                wordsSelected: [...state.wordsSelected.slice(0, state.wordsSelected.length), {word: action.payload.word, index: action.payload.index}, ...state.wordsSelected.slice(state.wordsSelected.length + 1)],
                textSelection: update(state.textSelection, {[action.payload.index]: {$set: createUnders(action.payload.word)}})
            };
        case FillGapsActionTypes.UPDATE_FILLGAPS_DELETESELECTED:
            var index = returnIndexOfWord(state.wordsSelected, action.payload);
            return{
                ...state,
                textSelection: update(state.textSelection, {[action.payload]: {$set: returnWord(state.wordsSelected, action.payload)}}),
                wordsSelected: [...state.wordsSelected.slice(0,index), ...state.wordsSelected.slice(index + 1)]
            };
        case FillGapsActionTypes.RESET_FILLGAPS_WORDSSELECTED:
            return{
                ...state,
                wordsSelected:[]
            }
        default: 
            return state;
    }
};

export default fillGapsReducer;