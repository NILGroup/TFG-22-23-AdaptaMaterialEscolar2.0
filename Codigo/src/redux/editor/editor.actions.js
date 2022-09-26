import EditorActionTypes from "./editor.types";

export const setEditor = editor => ({
    type: EditorActionTypes.SET_EDITOR,
    payload: editor
});

/*export const loadEditor = (editor) => {
    return dispatch => {
        dispatch(setEditor(editor))
    }
}*/