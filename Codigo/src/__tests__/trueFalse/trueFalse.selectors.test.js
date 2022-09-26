import '@testing-library/jest-dom';
import * as selectors  from "../../redux/trueFalse/trueFalse.selectors";

describe("TrueFalse Selectors", () =>{
    it("Devuelve el estado del modal de TrueFalse", () =>{
        const state = {
            trueFalse: {
                showTrueFalseModal: false
            }
        };
        const state2 = {
            trueFalse:{
                showTrueFalseModal: true
            }
        };
        expect(selectors.selectTrueFalseModalIsDisplayed(state)).toBe(false);
        expect(selectors.selectTrueFalseModalIsDisplayed(state2)).toBe(true);
    });

    it("Devuelve el array de frases de TrueFalse", () =>{
        const state = {
            trueFalse:{
                text:["Frase número 1", "Frase número 2"]
            }
        };
        const expectedResult = ["Frase número 1", "Frase número 2"];
        expect(selectors.selectTrueFalseText(state)).toEqual(expectedResult);
    });

    it("Devuelve el estado de la opción añadir ejemplo de TrueFalse", () =>{
        const state = {
            trueFalse:{
                addHowToSolve: false
            }
        };
        const state2 = {
            trueFalse:{
                addHowToSolve: true
            }
        };
        expect(selectors.selectTrueFalseModalAddHowToSolve(state)).toBe(false);
        expect(selectors.selectTrueFalseModalAddHowToSolve(state2)).toBe(true);
    });

    it("Devuelve el tipo de lista a mostrar de TrueFalse", () =>{
        const state = {
            trueFalse:{
                listType: "ul"
            }
        }
        const state2 = {
            trueFalse:{
                listType: "ol"
            }
        }
        expect(selectors.selectTrueFalseModalChooseListType(state)).toBe("ul");
        expect(selectors.selectTrueFalseModalChooseListType(state2)).toBe("ol");
    });

});