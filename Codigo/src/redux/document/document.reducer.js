import DocumentActionTypes from './document.types';

const INITIAL_STATE = {
    fileIsLoaded: false, 
    fileL: null
};

const documentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case DocumentActionTypes.LOAD_FILE: 
           return {
                ...state,
                fileL: action.payload.fileL,
                fileIsLoaded: true
            };
        case DocumentActionTypes.GET_FILE: 
            return {
                 ...state
             };
        default: 
            return state;
    }
    
};

export default documentReducer;