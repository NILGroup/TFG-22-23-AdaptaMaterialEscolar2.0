import '@testing-library/jest-dom';
import * as selectors  from "../../redux/definitions/definitions.selectors";

describe("Definitions selectors", () =>{
    it("Devuelve el estado del modal de Definitions", () =>{
        const state = {
            definitions: {
                showDefinitionsModal: false
            }
        };
        const state2 = {
            definitions:{
                showDefinitionsModal: true
            }
        };
        expect(selectors.selectDefinitionsModalIsDisplayed(state)).toBe(false);
        expect(selectors.selectDefinitionsModalIsDisplayed(state2)).toBe(true);
    });

    it("Devuelve el número de líneas máximo de Definitions", () =>{
        const state = {
            definitions:{
                numLines: 5
            }
        };
        expect(selectors.selectDefinitionsNumLines(state)).toBe(5);
    });

    it("Devuelve el array de frases de Definitions", () =>{
        const state = {
            definitions:{
                text:["Frase número 1", "Frase número 2"]
            }
        };
        const expectedResult = ["Frase número 1", "Frase número 2"];
        expect(selectors.selectDefinitionsText(state)).toEqual(expectedResult);
    });

    it("Devuelve el estado de la opción añadir espacio extra de Definitions", () =>{
        const state ={
            definitions:{
                extraspace: false
            }
        };

        const state2 ={
            definitions:{
                extraspace: true
            }
        };

        expect(selectors.selectDefinitionsExtraSpace(state)).toBe(false);
        expect(selectors.selectDefinitionsExtraSpace(state2)).toBe(true);
    });

    it("Devuelve el estado de la opción añadir ejemplo de Definitions", () =>{
        const state = {
            definitions:{
                addHowToSolve: false
            }
        };
        const state2 = {
            definitions:{
                addHowToSolve: true
            }
        };
        expect(selectors.selectDefinitionsAddHowToSolve(state)).toBe(false);
        expect(selectors.selectDefinitionsAddHowToSolve(state2)).toBe(true);
    });

    it("Devuelve el tipo de lista a mostrar de Definitions", () =>{
        const state = {
            definitions:{
                listType: "ul"
            }
        }
        const state2 = {
            definitions:{
                listType: "ol"
            }
        }
        expect(selectors.selectDefinitionsChooseListType(state)).toBe("ul");
        expect(selectors.selectDefinitionsChooseListType(state2)).toBe("ol");
    });
});