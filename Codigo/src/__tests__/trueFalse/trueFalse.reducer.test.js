import '@testing-library/jest-dom';
import trueFalseReducer from "../../redux/trueFalse/trueFalse.reducer";
import * as types from "../../redux/trueFalse/trueFalse.types";

describe("TrueFalse Reducer", () =>{
    it("Devuelve el estado inicial de TrueFalse", () =>{
        const INITIAL_STATE = {
            showTrueFalseModal: false,
            text: [""],
            addHowToSolve: false,
            listType: 'ul'
        }
        expect(trueFalseReducer(undefined, {})).toEqual(INITIAL_STATE);
    });

    it("Abre el modal de TrueFalse", () =>{
        const state = {
            showTrueFalseModal: false,
            text: [""],
            addHowToSolve: false,
            listType: 'ul'
        }
        const action = {
            type: types.default.OPEN_TRUEFALSE_MODAL
        }
        const expectedResult = {
            ...state,
            showTrueFalseModal: true
        }
        expect(trueFalseReducer(state, action)).toEqual(expectedResult);
    });

    it("Cierra el modal de TrueFalse", () =>{
        const state = {
            showTrueFalseModal: true,
            text: [""],
            addHowToSolve: false,
            listType: 'ul'
        }
        const action = {
            type: types.default.CLOSE_TRUEFALSE_MODAL
        }
        const expectedResult = {
            ...state,
            showTrueFalseModal: false
        }
        expect(trueFalseReducer(state, action)).toEqual(expectedResult);
    });

    it("Reinicia los datos del modal de TrueFalse", () =>{
        const state = {
            showTrueFalseModal: true,
            text: ["Frase 1", "Frase 2"],
            addHowToSolve: true,
            listType: 'ol'
        }
        const action = {
            type: types.default.RESET_TRUEFALSE_MODAL
        };
        const expectedResult = {
            ...state,
            text: [""],
            addHowToSolve: false,
            listType: "ul"
        }
        expect(trueFalseReducer(state, action)).toEqual(expectedResult);
    });

    it("Actualiza las frases de TrueFalse", () =>{
        const state = {
            showTrueFalseModal: true,
            text: [""],
            addHowToSolve: false,
            listType: 'ul'
        }
        const text1 = "Frase número 1";
        const text2 = "Frase número 2";
        const action1 = {
            type: types.default.UPDATE_TRUEFALSE_TEXT,
            payload: {text: text1, index: 0}
        }
        const action2 = {
            type: types.default.UPDATE_TRUEFALSE_TEXT,
            payload: {text: text2, index: 1}
        }
        const action3 = {
            type: types.default.UPDATE_TRUEFALSE_TEXT,
            payload: {text: text2, index: 0}
        }

        const stateAfterAction1 = {
            showTrueFalseModal: true,
            text: [text1],
            addHowToSolve: false,
            listType: 'ul'
        }

        const stateAfterAction2 = {
            showTrueFalseModal: true,
            text: [text1, text2],
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

        expect(trueFalseReducer(state, action1)).toEqual(expectedResult1);
        expect(trueFalseReducer(stateAfterAction1, action2)).toEqual(expectedResult2);
        expect(trueFalseReducer(stateAfterAction2, action3)).toEqual(expectedResult3);
    });
    
    it("Añade más frases de TrueFalse", () =>{
        const state = {
            showTrueFalseModal: true,
            text: ["Frase número 1"],
            addHowToSolve: false,
            listType: 'ul'
        }
        const action = {
            type: types.default.ADD_MORE_TRUEFALSE
        }

        const stateAfterAction = {
            showTrueFalseModal: true,
            text: ["Frase número 1", ""],
            addHowToSolve: false,
            listType: 'ul'
        }

        const expectedResult1 = {
            ...state,
            text: ["Frase número 1", ""]
        }

        const expectedResult2 = {
            ...state,
            text: ["Frase número 1", "", ""]
        }

        expect(trueFalseReducer(state, action)).toEqual(expectedResult1);
        expect(trueFalseReducer(stateAfterAction, action)).toEqual(expectedResult2);
    });

    it("Quita frases de TrueFalse", () =>{
        const state = {
            showTrueFalseModal: true,
            text: ["Frase número 1", "Frase número 2", "Frase número 3", "Frase número 4"],
            addHowToSolve: false,
            listType: 'ul'
        }
        const action1 = {
            type: types.default.DELETE_TRUEFALSE,
            payload: 3
        }

        const expectedResult1 = {
            ...state,
            text: ["Frase número 1", "Frase número 2", "Frase número 3"]
        }

        const stateAfterAction1 = {
            showTrueFalseModal: true,
            text: ["Frase número 1", "Frase número 2", "Frase número 3"],
            addHowToSolve: false,
            listType: 'ul'
        }
        const action2 = {
            type: types.default.DELETE_TRUEFALSE,
            payload: 1
        }

        const expectedResult2 = {
            ...stateAfterAction1,
            text: ["Frase número 1", "Frase número 3"] 
        }

        const stateAfterAction2 = {
            showTrueFalseModal: true,
            text: ["Frase número 1", "Frase número 3"],
            addHowToSolve: false,
            listType: 'ul'
        }
        const action3 = {
            type: types.default.DELETE_TRUEFALSE,
            payload: 0
        }

        const expectedResult3 = {
            ...stateAfterAction1,
            text: ["Frase número 3"] 
        }
        expect(trueFalseReducer(state, action1)).toEqual(expectedResult1);
        expect(trueFalseReducer(stateAfterAction1, action2)).toEqual(expectedResult2);
        expect(trueFalseReducer(stateAfterAction2, action3)).toEqual(expectedResult3);
    });

    it("Actualiza añadir ejemplo de TrueFalse", () =>{
        const state = {
            showTrueFalseModal: true,
            text: ["Frase número 1", "Frase número 2", "Frase número 3", "Frase número 4"],
            addHowToSolve: false,
            listType: 'ul'
        }

        const action1 = {
            type: types.default.UPDATE_TRUEFALSE_ADDHOWTOSOLVE,
            payload: true
        }

        const expectedResult1 = {
            ...state,
            addHowToSolve: true
        }

        const stateAfterAction1 = {
            showTrueFalseModal: true,
            text: ["Frase número 1", "Frase número 2", "Frase número 3", "Frase número 4"],
            addHowToSolve: true,
            listType: 'ul'
        }

        const action2 = {
            type: types.default.UPDATE_TRUEFALSE_ADDHOWTOSOLVE,
            payload: false
        }

        const expectedResult2 = {
            ...state,
            addHowToSolve: false
        }

        expect(trueFalseReducer(state,action1)).toEqual(expectedResult1);
        expect(trueFalseReducer(stateAfterAction1, action2)).toEqual(expectedResult2);
    });

    it("Actualiza el tipo de lista de TrueFalse", () =>{
        const state = {
            showTrueFalseModal: true,
            text: ["Frase número 1", "Frase número 2", "Frase número 3", "Frase número 4"],
            addHowToSolve: false,
            listType: 'ul'
        };

        const action1 = {
            type: types.default.UPDATE_TRUEFALSE_CHOOSELISTTYPE,
            payload: "ol"
        };

        const expectedResult1 = {
            ...state,
            listType: "ol"
        };

        const stateAfterAction1 = {
            showTrueFalseModal: true,
            text: ["Frase número 1", "Frase número 2", "Frase número 3", "Frase número 4"],
            addHowToSolve: false,
            listType: 'ol'
        };

        const action2 = {
            type: types.default.UPDATE_TRUEFALSE_CHOOSELISTTYPE,
            payload: "ul"
        };

        const expectedResult2 = {
            ...state,
            listType: "ul"
        };

        expect(trueFalseReducer(state, action1)).toEqual(expectedResult1);
        expect(trueFalseReducer(stateAfterAction1, action2)).toEqual(expectedResult2);
    });
});