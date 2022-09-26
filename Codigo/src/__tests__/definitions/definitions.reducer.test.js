import '@testing-library/jest-dom';
import definitionsReducer from "../../redux/definitions/definitions.reducer";
import * as types from "../../redux/definitions/definitions.types";

describe("Definitions reducer", () =>{
    it("Devuelve el estado inicial de Definitions", () =>{
        const INITIAL_STATE = {
            showDefinitionsModal: false,
            numLines: 1,
            text: [""],
            extraspace: false,
            addHowToSolve: false,
            listType: 'ul'
        }

        expect(definitionsReducer(undefined, {})).toEqual(INITIAL_STATE);
    });

    it("Abre el modal de Definitions", () =>{
        const state = {
            showDefinitionsModal: false,
            numLines: 1,
            text: [""],
            extraspace: false,
            addHowToSolve: false,
            listType: 'ul'
        }
        const action = {
            type: types.default.OPEN_DEFINITIONS_MODAL
        }
        const expectedResult = {
            ...state,
            showDefinitionsModal: true
        }
        expect(definitionsReducer(state, action)).toEqual(expectedResult);
    });

    it("Cierra el modal de Definitions", () =>{
        const state = {
            showDefinitionsModal: true,
            numLines: 1,
            text: [""],
            extraspace: false,
            addHowToSolve: false,
            listType: 'ul'
        }
        const action = {
            type: types.default.CLOSE_DEFINITIONS_MODAL
        }
        const expectedResult = {
            ...state,
            showDefinitionsModal: false
        }
        expect(definitionsReducer(state, action)).toEqual(expectedResult);
    });

    it("Reinicia los datos del modal de Definitions", () =>{
        const state = {
            showDefinitionsModal: true,
            numLines: 2,
            text: ['Concepto 1','Concepto 2'],
            extraspace: true,
            addHowToSolve: true,
            listType: 'ol'
        }
        const action = {
            type: types.default.RESET_DEFINITIONS_MODAL
        };
        const expectedResult = {
            ...state,
            numLines: 1,
            text: [''],
            extraspace: false,
            addHowToSolve: false,
            listType: 'ul'
        }
        expect(definitionsReducer(state, action)).toEqual(expectedResult);
    });

    it("Actualiza número de líneas de Definitions", () =>{
        const state ={
            showDefinitionsModal: true,
            numLines: 1,
            text: ['Concepto de prueba'],
            extraspace: false,
            addHowToSolve: false,
            listType: 'ul'
        };
        const action1 = {
            type: types.default.UPDATE_DEFINITIONS_NUMLINES,
            payload: 2
        };
        const expectedResult1 = {
            ...state,
            numLines: 2
        };
        const stateAfterAction1 ={
            showDefinitionsModal: true,
            numLines: 2,
            text: ['Concepto de prueba'],
            extraspace: false,
            addHowToSolve: false,
            listType: 'ul'
        }
        const action2 = {
            type: types.default.UPDATE_DEFINITIONS_NUMLINES,
            payload: 3
        };
        const expectedResult2 = {
            ...stateAfterAction1,
            numLines: 3
        };
        expect(definitionsReducer(state, action1)).toEqual(expectedResult1);
        expect(definitionsReducer(stateAfterAction1, action2)).toEqual(expectedResult2);
    });

    it("Actualiza las frases de Definitions", () =>{
        const state = {
            showDefinitionsModal: true,
            numLines: 1,
            text: [""],
            extraspace: false,
            addHowToSolve: false,
            listType: 'ul'
        }
        const text1 = "Concepto número 1";
        const text2 = "Concepto número 2";
        const action1 = {
            type: types.default.UPDATE_DEFINITIONS_TEXT,
            payload: {text: text1, index: 0}
        }
        const action2 = {
            type: types.default.UPDATE_DEFINITIONS_TEXT,
            payload: {text: text2, index: 1}
        }
        const action3 = {
            type: types.default.UPDATE_DEFINITIONS_TEXT,
            payload: {text: text2, index: 0}
        }

        const stateAfterAction1 = {
            showDefinitionsModal: true,
            numLines: 1,
            text: [text1],
            extraspace: false,
            addHowToSolve: false,
            listType: 'ul'
        }

        const stateAfterAction2 = {
            showDefinitionsModal: true,
            numLines: 1,
            text: [text1, text2],
            extraspace: false,
            addHowToSolve: false,
            listType: 'ul'
        }

        const expectedResult1 = {
            ...state,
            text: [text1]
        }

        const expectedResult2 = {
            ...stateAfterAction1,
            text: [text1, text2]
        }
        const expectedResult3 = {
            ...stateAfterAction2,
            text: [text2, text2]
        }

        expect(definitionsReducer(state, action1)).toEqual(expectedResult1);
        expect(definitionsReducer(stateAfterAction1, action2)).toEqual(expectedResult2);
        expect(definitionsReducer(stateAfterAction2, action3)).toEqual(expectedResult3);
    });

    it("Actualiza la selección de añadir espacio extra de Definitions", () =>{
        const state = {
            showDefinitionsModal: true,
            numLines: 1,
            text: ['Ejemplo de concepto de definition'],
            extraspace: false,
            addHowToSolve: false,
            listType: 'ul'
        }
        const action1 = {
            type: types.default.UPDATE_DEFINITIONS_EXTRASPACE,
            payload: true
        }
        const expectedResult1 = {
            ...state,
            extraspace: true
        }
        const stateAfterAction1 = {
            showDefinitionsModal: true,
            numLines: 1,
            text: ['Ejemplo de concepto de definition'],
            extraspace: true,
            addHowToSolve: false,
            listType: 'ul'
        }
        const action2 = {
            type: types.default.UPDATE_DEFINITIONS_EXTRASPACE,
            payload: false
        }
        const expectedResult2 = {
            ...stateAfterAction1,
            extraspace: false
        }
        expect(definitionsReducer(state, action1)).toEqual(expectedResult1);
        expect(definitionsReducer(stateAfterAction1, action2)).toEqual(expectedResult2);
    });

    it("Añade más conceptos de Definitions", () =>{
        const state = {
            showDefinitionsModal: true,
            numLines: 1,
            text: ["Concepto número 1"],
            extraspace: true,
            addHowToSolve: false,
            listType: 'ul'
        }
        const action = {
            type: types.default.ADD_MORE_DEFINITIONS
        }

        const stateAfterAction = {
            showDefinitionsModal: true,
            numLines: 1,
            text: ["Concepto número 1", ""],
            extraspace: true,
            addHowToSolve: false,
            listType: 'ul'
        }

        const expectedResult1 = {
            ...state,
            text: ["Concepto número 1", ""]
        }

        const expectedResult2 = {
            ...state,
            text: ["Concepto número 1", "", ""]
        }

        expect(definitionsReducer(state, action)).toEqual(expectedResult1);
        expect(definitionsReducer(stateAfterAction, action)).toEqual(expectedResult2);
    });

    it("Quita conceptos de Definitions", () =>{
        const state = {
            showDefinitionsModal: true,
            numLines: 1,
            text: ["Concepto número 1", "Concepto número 2", "Concepto número 3", "Concepto número 4"],
            extraspace: true,
            addHowToSolve: false,
            listType: 'ul'
        }
        const action1 = {
            type: types.default.DELETE_DEFINITION,
            payload: 3
        }

        const expectedResult1 = {
            ...state,
            text: ["Concepto número 1", "Concepto número 2", "Concepto número 3"]
        }

        const stateAfterAction1 = {
            showDefinitionsModal: true,
            numLines: 1,
            text: ["Concepto número 1", "Concepto número 2", "Concepto número 3"],
            extraspace: true,
            addHowToSolve: false,
            listType: 'ul'
        }
        const action2 = {
            type: types.default.DELETE_DEFINITION,
            payload: 1
        }

        const expectedResult2 = {
            ...stateAfterAction1,
            text: ["Concepto número 1", "Concepto número 3"] 
        }

        const stateAfterAction2 = {
            showDefinitionsModal: true,
            numLines: 1,
            text: ["Concepto número 1", "Concepto número 3"],
            extraspace: true,
            addHowToSolve: false,
            listType: 'ul'
        }
        const action3 = {
            type: types.default.DELETE_DEFINITION,
            payload: 0
        }

        const expectedResult3 = {
            ...stateAfterAction1,
            text: ["Concepto número 3"] 
        }
        expect(definitionsReducer(state, action1)).toEqual(expectedResult1);
        expect(definitionsReducer(stateAfterAction1, action2)).toEqual(expectedResult2);
        expect(definitionsReducer(stateAfterAction2, action3)).toEqual(expectedResult3);
    });

    it("Actualiza añadir ejemplo de Definitions", () =>{
        const state = {
            showDefinitionsModal: true,
            numLines: 1,
            text: ["Concepto número 1", "Concepto número 2", "Concepto número 3", "Concepto número 4"],
            extraspace: true,
            addHowToSolve: false,
            listType: 'ul'
        }

        const action1 = {
            type: types.default.UPDATE_DEFINITIONS_ADDHOWTOSOLVE,
            payload: true
        }

        const expectedResult1 = {
            ...state,
            addHowToSolve: true
        }

        const stateAfterAction1 = {
            showDefinitionsModal: true,
            numLines: 1,
            text: ["Concepto número 1", "Concepto número 2", "Concepto número 3", "Concepto número 4"],
            extraspace: true,
            addHowToSolve: true,
            listType: 'ul'
        }

        const action2 = {
            type: types.default.UPDATE_DEFINITIONS_ADDHOWTOSOLVE,
            payload: false
        }

        const expectedResult2 = {
            ...state,
            addHowToSolve: false
        }

        expect(definitionsReducer(state,action1)).toEqual(expectedResult1);
        expect(definitionsReducer(stateAfterAction1, action2)).toEqual(expectedResult2);
    });

    it("Actualiza el tipo de lista de Definitions", () =>{
        const state = {
            showDefinitionsModal: true,
            numLines: 1,
            text: ["Concepto número 1", "Concepto número 2", "Concepto número 3", "Concepto número 4"],
            extraspace: true,
            addHowToSolve: false,
            listType: 'ul'
        };

        const action1 = {
            type: types.default.UPDATE_DEFINITIONS_CHOOSELISTTYPE,
            payload: "ol"
        };

        const expectedResult1 = {
            ...state,
            listType: "ol"
        };

        const stateAfterAction1 = {
            showDefinitionsModal: true,
            numLines: 1,
            text: ["Concepto número 1", "Concepto número 2", "Concepto número 3", "Concepto número 4"],
            extraspace: true,
            addHowToSolve: false,
            listType: 'ol'
        };

        const action2 = {
            type: types.default.UPDATE_DEFINITIONS_CHOOSELISTTYPE,
            payload: "ul"
        };

        const expectedResult2 = {
            ...state,
            listType: "ul"
        };

        expect(definitionsReducer(state, action1)).toEqual(expectedResult1);
        expect(definitionsReducer(stateAfterAction1, action2)).toEqual(expectedResult2);
    });
});