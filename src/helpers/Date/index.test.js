/**
 * 
 */

import { getMonth } from "./index";

describe("Date helper", () => {
    describe("When getMonth is called", () => {
        it("the function return janvier for 2022-01-01 as date", () => { 
        // Cette ligne défini un test individuel avec une description de ce que le test vérifie.
            expect(getMonth(new Date('2022-01-01'))).toBe('janvier'); 
            // Cette ligne exécute la fonction getMonth avec la date "2022-01-01" et compare la valeur renvoyée avec la chaîne de caractères "janvier"
            
            // getMonth(new Date('2022-01-01')) appelle la fonction getMonth avec une instance de la classe Date créée à partir de la chaîne "2022-01-01". 
            // Cette fonction devrait renvoyer le mois correspondant à cette date

            // .toBe('janvier') utilise la fonction toBe de l'objet expect pour vérifier si la valeur renvoyée par getMonth est exactement égale à la chaîne "janvier".
            // Si ce n'est pas le cas, le test échouera.
        });
        it("the function return juillet for 2022-07-08 as date", () => {
            expect(getMonth(new Date('2022-07-08'))).toBe('juillet');
        });
    });
})

