import { createSelector } from "reselect";

const selectTrueFalse = state => state.trueFalse;

export const selectTrueFalseModalIsDisplayed = createSelector(
    [selectTrueFalse],
    trueFalse => trueFalse.showTrueFalseModal
);

export const selectTrueFalseText = createSelector(
    [selectTrueFalse],
    trueFalse => trueFalse.text
);

export const selectTrueFalseModalAddHowToSolve = createSelector(
    [selectTrueFalse],
    trueFalse => trueFalse.addHowToSolve
);

export const selectTrueFalseModalChooseListType = createSelector(
    [selectTrueFalse],
    trueFalse => trueFalse.listType
);