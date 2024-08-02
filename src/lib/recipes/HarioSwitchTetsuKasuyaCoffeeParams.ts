import { CoffeeParams } from "./CoffeeParams"
import { CoffeeRecipeId } from "./CoffeeRecipeConstants";

export class HarioSwitchTetsuKasuyaCoffeeParams extends CoffeeParams {
    
    constructor(beanInGrams: number, coffeeToWaterRatio: number, waterInGrams: number) {
        console.log('HarioSwitchTetsuKasuyaCoffeeParams beanInGrams: ', beanInGrams, ' coffeeToWaterRatio: ', coffeeToWaterRatio, ' waterInGrams: ', waterInGrams);
        super(CoffeeRecipeId.HarioSwitch_TetsuKasuya, beanInGrams, coffeeToWaterRatio, waterInGrams);
    }

    getNewInstance(beanInGrams: number, coffeeToWaterRatio: number, waterInGrams: number): CoffeeParams {
        console.log('HarioSwitchEmiFukahoriCoffeeParams getNewInstance beanInGrams: ', beanInGrams, ' coffeeToWaterRatio: ', coffeeToWaterRatio, ' waterInGrams: ', waterInGrams);
        return new HarioSwitchTetsuKasuyaCoffeeParams(beanInGrams, coffeeToWaterRatio, waterInGrams); 
    }
}