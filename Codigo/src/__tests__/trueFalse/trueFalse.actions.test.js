import '@testing-library/jest-dom';
import * as actions from "../../redux/trueFalse/trueFalse.actions";
import * as types from "../../redux/trueFalse/trueFalse.types";

describe("TrueFalse Actions", () =>{
    it("Debe crear una acción para abrir el modal de TrueFalse", () =>{
        const expectedAction = {
            type: types.default.OPEN_TRUEFALSE_MODAL
        }
        expect(actions.openTrueFalseModal()).toEqual(expectedAction);
    });

    it("Debe crear una acción para cerrar el modal de TrueFalse", () =>{
        const expectedAction = {
            type: types.default.CLOSE_TRUEFALSE_MODAL
        }
        expect(actions.closeTrueFalseModal()).toEqual(expectedAction);
    });

    it("Debe crear una acción para actualizar una de las frases de TrueFalse", () =>{
        const text = "Frase 1 de verdadero y falso";
        const text2 = "Frase 2 de verdadero y falso";
        const index2 = 1;
        const index1 = 0;
        const expectedAction1 = {
            type: types.default.UPDATE_TRUEFALSE_TEXT,
            payload: {text: text, index: index1}
        }
        const expectedAction2 = {
            type: types.default.UPDATE_TRUEFALSE_TEXT,
            payload: {text: text2, index: index2}
        }
        const expectedAction3 = {
            type: types.default.UPDATE_TRUEFALSE_TEXT,
            payload: {text: text, index: index2}
        }

        expect(actions.updateTrueFalseText(text, index1)).toEqual(expectedAction1);
        expect(actions.updateTrueFalseText(text2, index2)).toEqual(expectedAction2);
        expect(actions.updateTrueFalseText(text, index2)).toEqual(expectedAction3);
    });

    it("Debe crear una acción para resetear el modal de TrueFalse", () =>{
        const expectedAction = {
            type: types.default.RESET_TRUEFALSE_MODAL
        };

        expect(actions.resetTrueFalseModal()).toEqual(expectedAction);
    });

    it("Debe crear una acción para añadir más frases de TrueFalse", () =>{
        const expetectAction = {
            type: types.default.ADD_MORE_TRUEFALSE
        };

        expect(actions.addMoreTrueFalse()).toEqual(expetectAction);
    });

    it("Debe crear una acción para borrar una frase de TrueFalse", () =>{
        const index = 1;
        const index2 = 2;

        const expectedAction1 = {
            type: types.default.DELETE_TRUEFALSE,
            payload: index
        }

        const expectedAction2 = {
            type: types.default.DELETE_TRUEFALSE,
            payload: index2
        }

        expect(actions.deleteTrueFalse(index)).toEqual(expectedAction1);
        expect(actions.deleteTrueFalse(index2)).toEqual(expectedAction2);
    });

    it("Debe crear una acción para añadir o no un ejemplo de cómo resolver el ejercicio de TrueFalse", () =>{
        const expectedAction1 = {
            type: types.default.UPDATE_TRUEFALSE_ADDHOWTOSOLVE,
            payload: true
        };

        const expectedAction2 = {
            type: types.default.UPDATE_TRUEFALSE_ADDHOWTOSOLVE,
            payload: false
        };

        expect(actions.updateAddHowToSolve(true)).toEqual(expectedAction1);
        expect(actions.updateAddHowToSolve(false)).toEqual(expectedAction2);
    });

    it("Debe crear una acción para seleccionar el tipo de lista a mostrar de TrueFalse", () =>{
        const expectedAction1 = {
            type: types.default.UPDATE_TRUEFALSE_CHOOSELISTTYPE,
            payload: "ul"
        };

        const expectedAction2 = {
            type: types.default.UPDATE_TRUEFALSE_CHOOSELISTTYPE,
            payload: "ol"
        };

        expect(actions.updateChooseListType("ul")).toEqual(expectedAction1);
        expect(actions.updateChooseListType("ol")).toEqual(expectedAction2)
    });
});

