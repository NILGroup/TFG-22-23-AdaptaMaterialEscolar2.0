import { createSelector } from "reselect";

const selectDevelop = state => state.develop;

export const selectDevelopModalIsDisplayed = createSelector(
  [selectDevelop],
  develop => develop.showDevelopModal
);

export const selectDevelopNumLines = createSelector(
  [selectDevelop],
  develop => develop.numLines
);
export const selectDevelopText = createSelector(
  [selectDevelop],
  develop => develop.text
);

export const selectDevelopExtraSpace = createSelector(
  [selectDevelop],
  develop => develop.extraspace
);

export const selectDevelopAddHowToSolve = createSelector(
  [selectDevelop],
  develop => develop.addHowToSolve
);