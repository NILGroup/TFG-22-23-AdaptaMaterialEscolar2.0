import TrueFalseActionTypes from "./trueFalse.types";

export const openTrueFalseModal = () => ({
    type: TrueFalseActionTypes.OPEN_TRUEFALSE_MODAL,
});

export const closeTrueFalseModal = () => ({
    type: TrueFalseActionTypes.CLOSE_TRUEFALSE_MODAL,
});

export const updateTrueFalseText = (text, i) => ({
    type: TrueFalseActionTypes.UPDATE_TRUEFALSE_TEXT,
    payload: {text: text, index: i}
});

export const resetTrueFalseModal = () => ({
    type: TrueFalseActionTypes.RESET_TRUEFALSE_MODAL
});

export const addMoreTrueFalse = () =>({
    type: TrueFalseActionTypes.ADD_MORE_TRUEFALSE
});

export const deleteTrueFalse = (index) =>({
    type: TrueFalseActionTypes.DELETE_TRUEFALSE,
    payload: index
});

export const updateAddHowToSolve = (add) =>({
    type: TrueFalseActionTypes.UPDATE_TRUEFALSE_ADDHOWTOSOLVE,
    payload: add
});

export const updateChooseListType = (type) =>({
    type: TrueFalseActionTypes.UPDATE_TRUEFALSE_CHOOSELISTTYPE,
    payload: type
});