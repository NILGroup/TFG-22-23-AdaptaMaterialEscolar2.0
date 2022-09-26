import TrueFalseActionTypes from "./trueFalse.types";
import update from 'react-addons-update';

const INITIAL_STATE = {
    showTrueFalseModal: false,
    text: [""],
    addHowToSolve: false,
    listType: 'ul'
}

const trueFalseReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case TrueFalseActionTypes.OPEN_TRUEFALSE_MODAL: 
           return {
                ...state,
                showTrueFalseModal: true
            };
        case TrueFalseActionTypes.CLOSE_TRUEFALSE_MODAL: 
            return {
                ...state,
                showTrueFalseModal: false
            };
        case TrueFalseActionTypes.UPDATE_TRUEFALSE_TEXT: 
            return {
                ...state,
                text: update(state.text, {[action.payload.index]: {$set: action.payload.text}})
            };     
        case TrueFalseActionTypes.RESET_TRUEFALSE_MODAL: 
            return {
                ...state,
                text: [""],
                addHowToSolve: false,
                listType: 'ul'
            };
        case TrueFalseActionTypes.ADD_MORE_TRUEFALSE:
            return{
                ...state,
                text: [...state.text.slice(0,state.text.length), "", ...state.text.slice(state.text.length + 1)]
            };
        case TrueFalseActionTypes.DELETE_TRUEFALSE:
            return{
                ...state,
                text: [...state.text.slice(0,action.payload), ...state.text.slice(action.payload + 1)]
            };
        case TrueFalseActionTypes.UPDATE_TRUEFALSE_ADDHOWTOSOLVE:
            return{
                ...state,
                addHowToSolve: action.payload
            };
        case TrueFalseActionTypes.UPDATE_TRUEFALSE_CHOOSELISTTYPE:
            return{
                ...state,
                listType: action.payload
            }
         default: 
             return state;
     }
 };

export default trueFalseReducer;