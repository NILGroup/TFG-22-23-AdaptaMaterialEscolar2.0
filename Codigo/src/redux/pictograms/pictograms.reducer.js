import PictogramsActionTypes from './pictograms.types';
import {addPictogramToList} from './pictogram.utils';

const INITIAL_STATE = {
    searchResults: [],
    documentPictograms: [],
    showSearchComponent: false,
    showModal: false
}

const pictogramReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case PictogramsActionTypes.SEARCH_PICTOGRAMS: 
           return {
                ...state,
            };
        case PictogramsActionTypes.ADD_PICTOGRAM: 
            return {
                 ...state,
                 showSearchComponent: false,
                 searchResults: addPictogramToList(state.documentPictograms, action.payload)
             };
        case PictogramsActionTypes.FETCH_PICTOGRAMS_SUCCESS: 
            return {
                ...state,
                searchResults: action.payload
             };
        case PictogramsActionTypes.OPEN_PICTOGRAMS_MODAL:
            return{
                ...state,
                showModal: true
            }
        case PictogramsActionTypes.CLOSE_PICTOGRAMS_MODAL:
            return{
                ...state,
                showModal: false,
                searchResults: []
        }
        default: 
            return state;
    }
};

export default pictogramReducer;