import DefinitionsActionTypes from "./definitions.types";

export const openDefinitionsModal = () => ({
    type: DefinitionsActionTypes.OPEN_DEFINITIONS_MODAL,
});

export const closeDefinitionsModal = () => ({
    type: DefinitionsActionTypes.CLOSE_DEFINITIONS_MODAL,
});

export const updateDefinitionsNumLines = (numLines) => ({
    type: DefinitionsActionTypes.UPDATE_DEFINITIONS_NUMLINES,
    payload: numLines
});

export const updateDefinitionsText = (text, i) => ({
    type: DefinitionsActionTypes.UPDATE_DEFINITIONS_TEXT,
    payload: {text: text, index: i}
});

export const resetDefinitionsModal = () => ({
    type: DefinitionsActionTypes.RESET_DEFINITIONS_MODAL
});

export const updateDefinitionsExtraSpace = (extraspace) => ({
    type: DefinitionsActionTypes.UPDATE_DEFINITIONS_EXTRASPACE,
    payload: extraspace
});

export const addMoreDefinitions = () =>({
    type: DefinitionsActionTypes.ADD_MORE_DEFINITIONS
});

export const deleteDefinition = (index) =>({
    type: DefinitionsActionTypes.DELETE_DEFINITION,
    payload: index
});

export const updateAddHowToSolve = (add) =>({
    type: DefinitionsActionTypes.UPDATE_DEFINITIONS_ADDHOWTOSOLVE,
    payload: add
});

export const updateChooseListType = (type) =>({
    type: DefinitionsActionTypes.UPDATE_DEFINITIONS_CHOOSELISTTYPE,
    payload: type
});