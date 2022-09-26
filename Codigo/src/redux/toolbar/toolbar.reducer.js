import ToolbarActionTypes from "./toolbar.types";
import PictogramsActionTypes from "../pictograms/pictograms.types";
import WordSearchActionTypes from "../wordSearch/wordsearch.types";
import TrueFalseActionTypes from "../trueFalse/trueFalse.types";
import FillGapsActionTypes from "../fillGaps/fillgaps.types";
import DevelopActionTypes from "../develop/develop.types";
import DefinitionsActionTypes from "../definitions/definitions.types";

const INITIAL_STATE = {
    lastOpened: undefined
}

const toolbarReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case ToolbarActionTypes.UPDATE_LAST_OPENED:
           return {
                ...state,
                lastOpened: action.payload
            };
        case PictogramsActionTypes.CLOSE_PICTOGRAMS_MODAL:
            return{
                ...state,
                lastOpened: "pictogram"
            };
        case WordSearchActionTypes.CLOSE_WORDSEARCH_MODAL:
            return{
                ...state,
                lastOpened: "wordsearch"
            };
        case TrueFalseActionTypes.CLOSE_TRUEFALSE_MODAL:
            return{
                ...state,
                lastOpened: "truefalse"
            };
        case FillGapsActionTypes.CLOSE_FILLWORDS_MODAL:
            return{
                ...state,
                lastOpened: "fillGaps"
            };
        case DevelopActionTypes.CLOSE_DEVELOP_MODAL:
            return{
                ...state,
                lastOpened: "develop"
            };
        case DefinitionsActionTypes.CLOSE_DEFINITIONS_MODAL:
            return{
                ...state,
                lastOpened: "definitions"
            };
         default: 
             return state;
     }
 };

export default toolbarReducer;