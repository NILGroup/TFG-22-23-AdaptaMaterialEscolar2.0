import DevelopActionTypes from "./develop.types";

export const openDevelopModal = () => ({
    type: DevelopActionTypes.OPEN_DEVELOP_MODAL,
});

export const closeDevelopModal = () => ({
    type: DevelopActionTypes.CLOSE_DEVELOP_MODAL,
});

export const updateDevelopNumLines = (numLines) => ({
    type: DevelopActionTypes.UPDATE_DEVELOP_NUMLINES,
    payload: numLines
});

export const updateDevelopText = (text) => ({
    type: DevelopActionTypes.UPDATE_DEVELOP_TEXT,
    payload: text
});

export const resetDevelopModal = () => ({
    type: DevelopActionTypes.RESET_DEVELOP_MODAL
});

export const updateDevelopExtraSpace = (extraspace) => ({
    type: DevelopActionTypes.UPDATE_DEVELOP_EXTRASPACE,
    payload: extraspace
});

export const updateDevelopAddHowToSolve = (add) =>({
    type: DevelopActionTypes.UPDATE_DEVELOP_ADDHOWTOSOLVE,
    payload: add
});