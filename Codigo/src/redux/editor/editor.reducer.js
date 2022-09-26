import EditorActionTypes from "./editor.types";

const INITIAL_STATE = {
    editorClass: null,
    content: ""
}

const editorReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case EditorActionTypes.SET_EDITOR: 
           return {
                ...state,
                editorClass: action.payload
            };
        default: 
            return state;
    }
    
};

export default editorReducer;