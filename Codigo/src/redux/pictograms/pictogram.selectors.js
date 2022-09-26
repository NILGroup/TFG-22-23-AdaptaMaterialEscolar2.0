import { createSelector } from 'reselect';

const selectPictograms = state => state.pictogram;

export const selectPictogramSearchResults = createSelector(
    [selectPictograms],
    pictogram => pictogram.searchResults
  );

export const selectModalIsDisplayed = createSelector(
    [selectPictograms],
    pictogram => pictogram.showModal
  );

