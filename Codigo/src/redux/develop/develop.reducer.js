import DevelopActionTypes from "./develop.types";

const INITIAL_STATE = {
    showDevelopModal: false,
    numLines: 1,
    text: '',
    extraspace: false,
    addHowToSolve: false
}

const developReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case DevelopActionTypes.OPEN_DEVELOP_MODAL: 
           return {
                ...state,
                showDevelopModal: true
            };
        case DevelopActionTypes.CLOSE_DEVELOP_MODAL: 
            return {
                ...state,
                showDevelopModal: false
            };
        case DevelopActionTypes.UPDATE_DEVELOP_NUMLINES: 
            return {
                ...state,
                numLines: action.payload
            };
         case DevelopActionTypes.UPDATE_DEVELOP_TEXT: 
            return {
                ...state,
                text: action.payload
            };     
         case DevelopActionTypes.RESET_DEVELOP_MODAL: 
            return {
                ...state,
                numLines: 1,
                text: '',
                extraspace: false,
                addHowToSolve: false
            };
        case DevelopActionTypes.UPDATE_DEVELOP_EXTRASPACE:
            return{
                ...state,
                extraspace: action.payload
            };
        case DevelopActionTypes.UPDATE_DEVELOP_ADDHOWTOSOLVE:
            return{
                ...state,
                addHowToSolve: action.payload
            };
         default: 
             return state;
     }
 };
 

export default developReducer;