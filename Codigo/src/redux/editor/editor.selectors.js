import { createSelector } from 'reselect';

const selectEditor = state => state.editor;

export const selectEditorClass = createSelector(
  [selectEditor],
  editor => editor.editorClass
);

export const selectEditorContent = createSelector(
    [selectEditor],
    editor => editor.content
);