import { createSelector } from "reselect";

const selectToolbar = state => state.toolbar;

export const selectToolbarLastOpened = createSelector(
    [selectToolbar],
    toolbar => toolbar.lastOpened
);