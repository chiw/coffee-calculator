import { CoffeeParams } from "../../CoffeeParams";
import { CoffeeRecipeId } from "../../CoffeeRecipeConstants";

export class HarioSwitchOleKristianBoenCoffeeParams extends CoffeeParams {

    constructor(beanInGrams: number, coffeeToWaterRatio: number, waterInGrams: number) {
        console.log('HarioSwitchOleKristianBoenCoffeeParams beanInGrams: ', beanInGrams, ' coffeeToWaterRatio: ', coffeeToWaterRatio, ' waterInGrams: ', waterInGrams);
        super(CoffeeRecipeId.HarioSwitch_OleKristianBoen, beanInGrams, coffeeToWaterRatio, waterInGrams);
    }

    getNewInstance(beanInGrams: number, coffeeToWaterRatio: number, waterInGrams: number): CoffeeParams {
        console.log('HarioSwitchOleKristianBoenCoffeeParams getNewInstance beanInGrams: ', beanInGrams, ' coffeeToWaterRatio: ', coffeeToWaterRatio, ' waterInGrams: ', waterInGrams);
        return new HarioSwitchOleKristianBoenCoffeeParams(beanInGrams, coffeeToWaterRatio, waterInGrams); 
    }
}