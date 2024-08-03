import { CoffeeParams } from "../../CoffeeParams";
import { CoffeeRecipeId } from "../../CoffeeRecipeConstants";

export class HarioSwitchEmiFukahoriCoffeeParams extends CoffeeParams {

    constructor(beanInGrams: number, coffeeToWaterRatio: number, waterInGrams: number) {
        console.log('HarioSwitchEmiFukahoriCoffeeParams beanInGrams: ', beanInGrams, ' coffeeToWaterRatio: ', coffeeToWaterRatio, ' waterInGrams: ', waterInGrams);
        super(CoffeeRecipeId.HarioSwitch_EmiFukahori, beanInGrams, coffeeToWaterRatio, waterInGrams);
    }

    getNewInstance(beanInGrams: number, coffeeToWaterRatio: number, waterInGrams: number): CoffeeParams {
        console.log('HarioSwitchEmiFukahoriCoffeeParams getNewInstance beanInGrams: ', beanInGrams, ' coffeeToWaterRatio: ', coffeeToWaterRatio, ' waterInGrams: ', waterInGrams);
        return new HarioSwitchEmiFukahoriCoffeeParams(beanInGrams, coffeeToWaterRatio, waterInGrams); 
    }
}