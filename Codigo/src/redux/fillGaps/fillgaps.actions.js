import FillGapsActionTypes from './fillgaps.types';

export const openFillGapsModal = () => ({
    type: FillGapsActionTypes.OPEN_FILLGAPS_MODAL
});

export const closeFillGapsModal = () => ({
    type: FillGapsActionTypes.CLOSE_FILLGAPS_MODAL
});

export const updateFillGapsText = (text) => ({
    type: FillGapsActionTypes.UPDATE_FILLGAPS_TEXT,
    payload: text
});

export const updateFillGapsAddHowToSolve = (add) => ({
    type: FillGapsActionTypes.UPDATE_FILLGAPS_ADDHOWTOSOLVE,
    payload: add
});

export const resetFillGaps = () => ({
    type: FillGapsActionTypes.RESET_FILLGAPS
});

export const updateFillGapsMode = (mode) => ({
    type: FillGapsActionTypes.UPDATE_FILLGAPS_MODE,
    payload: mode
});

export const updateFillGapsTextSelection = () => ({
    type: FillGapsActionTypes.UPDATE_FILLGAPS_TEXTSELECTION
});

export const updateFillGapsAddSelectedWord = (word, i) => ({
    type: FillGapsActionTypes.UPDATE_FILLGAPS_ADDSELECTED,
    payload: {word: word, index: i}
});

export const updateFillGapsDeleteSelectedWord = (i) => ({
    type: FillGapsActionTypes.UPDATE_FILLGAPS_DELETESELECTED,
    payload: i
});

export const resetFillGapsWordSelection = () =>({
    type: FillGapsActionTypes.RESET_FILLGAPS_WORDSSELECTED
});