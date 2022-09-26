import  DocumentActionTypes from './document.types';

export const loadDocument = document => ({
  type: DocumentActionTypes.LOAD_FILE,
  payload: document
});