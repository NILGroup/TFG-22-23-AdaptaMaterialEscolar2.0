import DefinitionsActionTypes from "./definitions.types";
import update from 'react-addons-update';

const INITIAL_STATE = {
    showDefinitionsModal: false,
    numLines: 1,
    text: [""],
    extraspace: false,
    addHowToSolve: false,
    listType: 'ul'
}

const definitionsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case DefinitionsActionTypes.OPEN_DEFINITIONS_MODAL: 
           return {
                ...state,
                showDefinitionsModal: true
            };
        case DefinitionsActionTypes.CLOSE_DEFINITIONS_MODAL: 
            return {
                 ...state,
                 showDefinitionsModal: false
             };
        case DefinitionsActionTypes.UPDATE_DEFINITIONS_NUMLINES: 
            return {
                 ...state,
                numLines: action.payload
             };
        case DefinitionsActionTypes.UPDATE_DEFINITIONS_TEXT:
            return {
                 ...state,
                 text: update(state.text, {[action.payload.index]: {$set: action.payload.text}})
             };  
        case DefinitionsActionTypes.RESET_DEFINITIONS_MODAL: 
            return {
                 ...state,
                numLines: 1,
                text: [""],
                extraspace: false,
                addHowToSolve: false,
                listType: 'ul'
             };
        case DefinitionsActionTypes.UPDATE_DEFINITIONS_EXTRASPACE:
            return{
                ...state,
                extraspace: action.payload
            };
        case DefinitionsActionTypes.ADD_MORE_DEFINITIONS:
            return{
                ...state,
                text: [...state.text.slice(0,state.text.length), "", ...state.text.slice(state.text.length + 1)]
            };
        case DefinitionsActionTypes.DELETE_DEFINITION:
            return{
                ...state,
                text: [...state.text.slice(0,action.payload), ...state.text.slice(action.payload + 1)]
            }
        case DefinitionsActionTypes.UPDATE_DEFINITIONS_ADDHOWTOSOLVE:
            return{
                ...state,
                addHowToSolve: action.payload
            };
        case DefinitionsActionTypes.UPDATE_DEFINITIONS_CHOOSELISTTYPE:
            return{
                ...state,
                listType: action.payload
            }
        default: 
            return state;
    }
};

export default definitionsReducer;