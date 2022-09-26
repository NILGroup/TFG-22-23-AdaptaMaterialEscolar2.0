import { createSelector } from 'reselect';

const selectDocument = state => state.document;

export const selectCurrentDocument = createSelector(
  [selectDocument],
  document => document.fileL
);

export const selectDocumentIsLoaded = createSelector(
    [selectDocument],
    document => document.fileIsLoaded
  );

  export const selectDocumentFile = createSelector(
    [selectDocument],
    document => document.file
  );