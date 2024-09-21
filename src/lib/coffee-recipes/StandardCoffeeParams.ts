import { CoffeeParameters } from "./CoffeeParameters";
import type { CoffeeRecipeId } from "./CoffeeRecipeConstants";

export class StandardCoffeeParameters extends CoffeeParameters {
    constructor(coffeeRecipeId: CoffeeRecipeId, beanInGrams: number, coffeeToWaterRatio: number, waterInGrams: number) {
        console.log('StandardCoffeeParameters coffeeRecipeId: ', coffeeRecipeId,
            ' beanInGrams: ', beanInGrams, 
            ' coffeeToWaterRatio: ', coffeeToWaterRatio, 
            ' waterInGrams: ', waterInGrams);

        super(coffeeRecipeId, beanInGrams, coffeeToWaterRatio, waterInGrams);
    }
}