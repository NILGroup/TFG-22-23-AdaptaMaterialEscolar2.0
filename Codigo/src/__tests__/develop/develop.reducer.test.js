import '@testing-library/jest-dom';
import developReducer from "../../redux/develop/develop.reducer";
import * as types from "../../redux/develop/develop.types";

describe("Develop reducer", () =>{
    it("Devuelve el estado inicial de Develop", () =>{
        const INITIAL_STATE = {
            showDevelopModal: false,
            numLines: 1,
            text: '',
            extraspace: false,
            addHowToSolve: false
        }

        expect(developReducer(undefined, {})).toEqual(INITIAL_STATE);
    });

    it("Abre el modal de Develop", () =>{
        const state = {
            showDevelopModal: false,
            numLines: 1,
            text: '',
            extraspace: false,
            addHowToSolve: false
        }
        const action = {
            type: types.default.OPEN_DEVELOP_MODAL
        }
        const expectedResult = {
            ...state,
            showDevelopModal: true
        }
        expect(developReducer(state, action)).toEqual(expectedResult);
    });

    it("Cierra el modal de Develop", () =>{
        const state = {
            showDevelopModal: true,
            numLines: 1,
            text: '',
            extraspace: false,
            addHowToSolve: false
        }
        const action = {
            type: types.default.CLOSE_DEVELOP_MODAL
        }
        const expectedResult = {
            ...state,
            showDevelopModal: false
        }
        expect(developReducer(state, action)).toEqual(expectedResult);
    });

    it("Reinicia los datos del modal de Develop", () =>{
        const state = {
            showDevelopModal: true,
            numLines: 4,
            text: 'Ejemplo de enunciado de develop',
            extraspace: true,
            addHowToSolve: true
        }
        const action = {
            type: types.default.RESET_DEVELOP_MODAL
        };
        const expectedResult = {
            ...state,
            numLines: 1,
            text: '',
            extraspace: false,
            addHowToSolve: false
        }
        expect(developReducer(state, action)).toEqual(expectedResult);
    });

    it("Actualiza número de líneas de develop", () =>{
        const state ={
            showDevelopModal: true,
            numLines: 1,
            text: 'Texto de prueba',
            extraspace: false,
            addHowToSolve: false
        };
        const action1 = {
            type: types.default.UPDATE_DEVELOP_NUMLINES,
            payload: 4
        };
        const expectedResult1 = {
            ...state,
            numLines: 4
        };
        const stateAfterAction1 ={
            showDevelopModal: true,
            numLines: 4,
            text: 'Texto de prueba',
            extraspace: false,
            addHowToSolve: false
        }
        const action2 = {
            type: types.default.UPDATE_DEVELOP_NUMLINES,
            payload: 5
        };
        const expectedResult2 = {
            ...stateAfterAction1,
            numLines: 5
        };
        expect(developReducer(state, action1)).toEqual(expectedResult1);
        expect(developReducer(stateAfterAction1, action2)).toEqual(expectedResult2);
    });

    it("Actualiza el enunciado de Develop", () =>{
        const state ={
            showDevelopModal: true,
            numLines: 1,
            text: '',
            extraspace: false,
            addHowToSolve: false
        };
        const action1 = {
            type: types.default.UPDATE_DEVELOP_TEXT,
            payload: "Esto es un texto de prueba"
        };
        const expectedResult1 = {
            ...state,
            text: "Esto es un texto de prueba"
        };
        const stateAfterAction1 ={
            showDevelopModal: true,
            numLines: 1,
            text: '',
            extraspace: false,
            addHowToSolve: false
        };
        const action2 = {
            type: types.default.UPDATE_DEVELOP_TEXT,
            payload: "Esto es un texto de prueba para ver si el enunciado se actualiza"
        };
        const expectedResult2 = {
            ...stateAfterAction1,
            text: "Esto es un texto de prueba para ver si el enunciado se actualiza"
        };
        expect(developReducer(state, action1)).toEqual(expectedResult1);
        expect(developReducer(stateAfterAction1, action2)).toEqual(expectedResult2);
    });

    it("Actualiza la selección de añadir espacio extra de Develop", () =>{
        const state = {
            showDevelopModal: true,
            numLines: 1,
            text: 'Ejemplo de enunciado de develop',
            extraspace: false,
            addHowToSolve: false
        }
        const action1 = {
            type: types.default.UPDATE_DEVELOP_EXTRASPACE,
            payload: true
        }
        const expectedResult1 = {
            ...state,
            extraspace: true
        }
        const stateAfterAction1 = {
            showDevelopModal: true,
            numLines: 1,
            text: 'Ejemplo de enunciado de develop',
            extraspace: true,
            addHowToSolve: false
        }
        const action2 = {
            type: types.default.UPDATE_DEVELOP_EXTRASPACE,
            payload: false
        }
        const expectedResult2 = {
            ...stateAfterAction1,
            extraspace: false
        }
        expect(developReducer(state, action1)).toEqual(expectedResult1);
        expect(developReducer(stateAfterAction1, action2)).toEqual(expectedResult2);
    });

    it("Actualiza añadir ejemplo de Develop", () =>{
        const state = {
            showDevelopModal: true,
            numLines: 1,
            text: 'Ejemplo de enunciado de develop',
            extraspace: true,
            addHowToSolve: false
        }

        const action1 = {
            type: types.default.UPDATE_DEVELOP_ADDHOWTOSOLVE,
            payload: true
        }

        const expectedResult1 = {
            ...state,
            addHowToSolve: true
        }

        const stateAfterAction1 = {
            showDevelopModal: true,
            numLines: 1,
            text: 'Ejemplo de enunciado de develop',
            extraspace: true,
            addHowToSolve: true
        }

        const action2 = {
            type: types.default.UPDATE_DEVELOP_ADDHOWTOSOLVE,
            payload: false
        }

        const expectedResult2 = {
            ...state,
            addHowToSolve: false
        }

        expect(developReducer(state,action1)).toEqual(expectedResult1);
        expect(developReducer(stateAfterAction1, action2)).toEqual(expectedResult2);
    });
})