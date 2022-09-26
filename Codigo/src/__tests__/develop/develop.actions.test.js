import '@testing-library/jest-dom';
import * as actions from "../../redux/develop/develop.actions";
import * as types from "../../redux/develop/develop.types";

describe("Develop actions", () =>{
    it("Debe crear una acción para abrir el modal de Develop", () =>{
        const expectedAction = {
            type: types.default.OPEN_DEVELOP_MODAL
        }
        expect(actions.openDevelopModal()).toEqual(expectedAction);
    });

    it("Debe crear una acción para cerrar el modal de Develop", () =>{
        const expectedAction = {
            type: types.default.CLOSE_DEVELOP_MODAL
        }
        expect(actions.closeDevelopModal()).toEqual(expectedAction);
    });

    it("Debe crear una acción para actualizar el número de líneas de Develop", () =>{
        const expectedAction = {
            type: types.default.UPDATE_DEVELOP_NUMLINES,
            payload: 3
        };
        expect(actions.updateDevelopNumLines(3)).toEqual(expectedAction);
    });

    it("Debe crear una acción para actualizar el enunciado de Develop", () =>{
        const expectedAction = {
            type: types.default.UPDATE_DEVELOP_TEXT,
            payload: "Este es el enunciado del ejercicio de desarrollo"
        };
        expect(actions.updateDevelopText("Este es el enunciado del ejercicio de desarrollo")).toEqual(expectedAction);
    });

    it("Debe crear una acción para resetear el modal de Develop", () =>{
        const expectedAction = {
            type: types.default.RESET_DEVELOP_MODAL
        };
        expect(actions.resetDevelopModal()).toEqual(expectedAction);
    });

    it("Debe crear una acción para añadir o no espacio extra de Develop", () =>{
        const expectedAction1 = {
            type: types.default.UPDATE_DEVELOP_EXTRASPACE,
            payload: true
        };
        const expectedAction2 = {
            type: types.default.UPDATE_DEVELOP_EXTRASPACE,
            payload: false
        };
        expect(actions.updateDevelopExtraSpace(true)).toEqual(expectedAction1);
        expect(actions.updateDevelopExtraSpace(false)).toEqual(expectedAction2);
    });

    it("Debe crear una acción para añadir o no un ejemplo de cómo resolver el ejercicio de Develop", () =>{
        const expectedAction1 = {
            type: types.default.UPDATE_DEVELOP_ADDHOWTOSOLVE,
            payload: true
        };

        const expectedAction2 = {
            type: types.default.UPDATE_DEVELOP_ADDHOWTOSOLVE,
            payload: false
        };

        expect(actions.updateDevelopAddHowToSolve(true)).toEqual(expectedAction1);
        expect(actions.updateDevelopAddHowToSolve(false)).toEqual(expectedAction2);
    });
})