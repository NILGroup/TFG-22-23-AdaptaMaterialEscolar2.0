import { combineReducers } from 'redux';
import definitionsReducer from './definitions/definitions.reducer';
import documentReducer from './document/document.reducer';
import editorReducer from './editor/editor.reducer';

import pictogramReducer from './pictograms/pictograms.reducer';
import trueFalseReducer from './trueFalse/trueFalse.reducer';
import wordSearchReducer from './wordSearch/wordsearch.reducer';

import developReducer from './develop/develop.reducer';
import toolbarReducer from './toolbar/toolbar.reducer';
import fillGapsReducer from './fillGaps/fillgaps.reducer';

export default combineReducers({
  document: documentReducer,
  pictogram: pictogramReducer,
  wordsearch: wordSearchReducer,
  definitions: definitionsReducer,
  editor: editorReducer,
  trueFalse: trueFalseReducer,
  develop: developReducer,
  toolbar: toolbarReducer,
  fillgaps: fillGapsReducer
});