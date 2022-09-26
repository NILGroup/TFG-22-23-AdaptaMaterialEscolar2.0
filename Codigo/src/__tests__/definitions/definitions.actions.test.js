import '@testing-library/jest-dom';
import * as actions from "../../redux/definitions/definitions.actions";
import * as types from "../../redux/definitions/definitions.types";

describe("Definitions actions", () =>{
    it("Debe crear una acción para abrir el modal de Definitions", () =>{
        const expectedAction = {
            type: types.default.OPEN_DEFINITIONS_MODAL
        }
        expect(actions.openDefinitionsModal()).toEqual(expectedAction);
    });

    it("Debe crear una acción para cerrar el modal de Definitions", () =>{
        const expectedAction = {
            type: types.default.CLOSE_DEFINITIONS_MODAL
        }
        expect(actions.closeDefinitionsModal()).toEqual(expectedAction);
    });

    it("Debe crear una acción para actualizar el número de líneas de Definitions", () =>{
        const expectedAction = {
            type: types.default.UPDATE_DEFINITIONS_NUMLINES,
            payload: 3
        };
        expect(actions.updateDefinitionsNumLines(3)).toEqual(expectedAction);
    });

    it("Debe crear una acción para actualizar los conceptos de Definitions", () =>{
        const text = "Concepto 1 de definitions";
        const text2 = "Concepto 2 de definitions";
        const index2 = 1;
        const index1 = 0;
        const expectedAction1 = {
            type: types.default.UPDATE_DEFINITIONS_TEXT,
            payload: {text: text, index: index1}
        }
        const expectedAction2 = {
            type: types.default.UPDATE_DEFINITIONS_TEXT,
            payload: {text: text2, index: index2}
        }
        const expectedAction3 = {
            type: types.default.UPDATE_DEFINITIONS_TEXT,
            payload: {text: text, index: index2}
        }

        expect(actions.updateDefinitionsText(text, index1)).toEqual(expectedAction1);
        expect(actions.updateDefinitionsText(text2, index2)).toEqual(expectedAction2);
        expect(actions.updateDefinitionsText(text, index2)).toEqual(expectedAction3);
    });

    it("Debe crear una acción para resetear el modal de Definitions", () =>{
        const expectedAction = {
            type: types.default.RESET_DEFINITIONS_MODAL
        };

        expect(actions.resetDefinitionsModal()).toEqual(expectedAction);
    });

    it("Debe crear una acción para añadir o no espacio extra de Definitions", () =>{
        const expectedAction1 = {
            type: types.default.UPDATE_DEFINITIONS_EXTRASPACE,
            payload: true
        };
        const expectedAction2 = {
            type: types.default.UPDATE_DEFINITIONS_EXTRASPACE,
            payload: false
        };
        expect(actions.updateDefinitionsExtraSpace(true)).toEqual(expectedAction1);
        expect(actions.updateDefinitionsExtraSpace(false)).toEqual(expectedAction2);
    });

    it("Debe crear una acción para añadir más conceptos de Definitions", () =>{
        const expetectAction = {
            type: types.default.ADD_MORE_DEFINITIONS
        };

        expect(actions.addMoreDefinitions()).toEqual(expetectAction);
    });

    it("Debe crear una acción para borrar un concepto de Definitions", () =>{
        const index = 1;
        const index2 = 2;

        const expectedAction1 = {
            type: types.default.DELETE_DEFINITION,
            payload: index
        }

        const expectedAction2 = {
            type: types.default.DELETE_DEFINITION,
            payload: index2
        }

        expect(actions.deleteDefinition(index)).toEqual(expectedAction1);
        expect(actions.deleteDefinition(index2)).toEqual(expectedAction2);
    });

    it("Debe crear una acción para añadir o no un ejemplo de cómo resolver el ejercicio de Definitions", () =>{
        const expectedAction1 = {
            type: types.default.UPDATE_DEFINITIONS_ADDHOWTOSOLVE,
            payload: true
        };

        const expectedAction2 = {
            type: types.default.UPDATE_DEFINITIONS_ADDHOWTOSOLVE,
            payload: false
        };

        expect(actions.updateAddHowToSolve(true)).toEqual(expectedAction1);
        expect(actions.updateAddHowToSolve(false)).toEqual(expectedAction2);
    });

    it("Debe crear una acción para seleccionar el tipo de lista a mostrar de Definitions", () =>{
        const expectedAction1 = {
            type: types.default.UPDATE_DEFINITIONS_CHOOSELISTTYPE,
            payload: "ul"
        };

        const expectedAction2 = {
            type: types.default.UPDATE_DEFINITIONS_CHOOSELISTTYPE,
            payload: "ol"
        };

        expect(actions.updateChooseListType("ul")).toEqual(expectedAction1);
        expect(actions.updateChooseListType("ol")).toEqual(expectedAction2)
    });
});