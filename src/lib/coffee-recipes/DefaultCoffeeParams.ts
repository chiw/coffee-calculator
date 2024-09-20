import { CoffeeParams } from "./CoffeeParams";
import type { CoffeeRecipeId } from "./CoffeeRecipeConstants";

export class DefaultCoffeeParams extends CoffeeParams {
    constructor(coffeeRecipeId: CoffeeRecipeId, beanInGrams: number, coffeeToWaterRatio: number, waterInGrams: number) {
        console.log('DefaultCoffeeParams coffeeRecipeId: ', coffeeRecipeId,
            ' beanInGrams: ', beanInGrams, 
            ' coffeeToWaterRatio: ', coffeeToWaterRatio, 
            ' waterInGrams: ', waterInGrams);

        super(coffeeRecipeId, beanInGrams, coffeeToWaterRatio, waterInGrams);
    }
}