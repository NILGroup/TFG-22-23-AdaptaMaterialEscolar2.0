import { createSelector } from 'reselect';

const selectFillGaps = state => state.fillgaps;

export const selectFillGapsModalIsDisplayed = createSelector(
    [selectFillGaps],
    fillgaps => fillgaps.showModal
);

export const selectFillGapsModalText = createSelector(
  [selectFillGaps],
  fillgaps => fillgaps.text
);

export const selectFillGapsModalAddHowToSolve = createSelector(
  [selectFillGaps],
  fillgaps => fillgaps.addHowToSolve
);

export const selectFillGapsModalMode = createSelector(
  [selectFillGaps],
  fillgaps => fillgaps.mode
);

export const selectFillGapsModalTextSelection = createSelector(
  [selectFillGaps],
  fillgaps => fillgaps.textSelection
);

export const selectFillGapsModalWordsSelected = createSelector(
  [selectFillGaps],
  fillgaps => fillgaps.wordsSelected
);