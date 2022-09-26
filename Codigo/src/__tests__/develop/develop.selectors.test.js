import '@testing-library/jest-dom';
import * as selectors  from "../../redux/develop/develop.selectors";

describe("Develop selectors", () =>{
    it("Devuelve el estado del modal de Develop", () =>{
        const state = {
            develop: {
                showDevelopModal: false
            }
        };
        const state2 = {
            develop:{
                showDevelopModal: true
            }
        };
        expect(selectors.selectDevelopModalIsDisplayed(state)).toBe(false);
        expect(selectors.selectDevelopModalIsDisplayed(state2)).toBe(true);
    });

    it("Devuelve el número de líneas máximo de Develop", () =>{
        const state = {
            develop:{
                numLines: 5
            }
        };
        expect(selectors.selectDevelopNumLines(state)).toBe(5);
    });

    it("Devuelve el enunciado", () =>{
        const state = {
            develop:{
                text: "Este es el enunciado del ejercicio de desarrollo"
            }
        };
        expect(selectors.selectDevelopText(state)).toBe("Este es el enunciado del ejercicio de desarrollo");
    });

    it("Devuelve el estado de la opción añadir espacio extra de Develop", () =>{
        const state ={
            develop:{
                extraspace: false
            }
        };

        const state2 ={
            develop:{
                extraspace: true
            }
        };

        expect(selectors.selectDevelopExtraSpace(state)).toBe(false);
        expect(selectors.selectDevelopExtraSpace(state2)).toBe(true);
    });

    it("Devuelve el estado de la opción añadir ejemplo de Develop", () =>{
        const state = {
            develop:{
                addHowToSolve: false
            }
        };
        const state2 = {
            develop:{
                addHowToSolve: true
            }
        };
        expect(selectors.selectDevelopAddHowToSolve(state)).toBe(false);
        expect(selectors.selectDevelopAddHowToSolve(state2)).toBe(true);
    });
})