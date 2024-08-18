import { CoffeeParams } from "../../CoffeeParams";
import { CoffeeRecipeId } from "../../CoffeeRecipeConstants";

export class HarioSwitchCoffeeChroniclerCoffeeParams extends CoffeeParams {

    constructor(beanInGrams: number, coffeeToWaterRatio: number, waterInGrams: number) {
        console.log('HarioSwitchCoffeeChroniclerCoffeeParams beanInGrams: ', beanInGrams, ' coffeeToWaterRatio: ', coffeeToWaterRatio, ' waterInGrams: ', waterInGrams);
        super(CoffeeRecipeId.HarioSwitch_CoffeeChronicler, beanInGrams, coffeeToWaterRatio, waterInGrams);
    }

    getNewInstance(beanInGrams: number, coffeeToWaterRatio: number, waterInGrams: number): CoffeeParams {
        console.log('HarioSwitchCoffeeChroniclerCoffeeParams getNewInstance beanInGrams: ', beanInGrams, ' coffeeToWaterRatio: ', coffeeToWaterRatio, ' waterInGrams: ', waterInGrams);
        return new HarioSwitchCoffeeChroniclerCoffeeParams(beanInGrams, coffeeToWaterRatio, waterInGrams); 
    }
}