import { CoffeeParams } from "./CoffeeParams";
import { CoffeeRecipeId } from "./CoffeeRecipeConstants";

export class HarioSwitchEmiFukahoriCoffeeParams extends CoffeeParams {

    constructor(beanInGrams: number, coffeeToWaterRatio: number, waterInGrams: number) {
        console.log('HarioSwitchEmiFukahoriCoffeeParams beanInGrams: ', beanInGrams, ' coffeeToWaterRatio: ', coffeeToWaterRatio, ' waterInGrams: ', waterInGrams);
        super(CoffeeRecipeId.HarioSwitch_EmiFukahori, beanInGrams, coffeeToWaterRatio, waterInGrams);
    }

    updateBeanInGrams(beanInGrams: number): CoffeeParams {
        console.log('HarioSwitchEmiFukahoriCoffeeParams updateBeanInGrams beanInGrams: ', beanInGrams, ' will new a CoffeeParams object');
        return new HarioSwitchEmiFukahoriCoffeeParams(beanInGrams, this.coffeeToWaterRatio, this.waterInGrams);
    }
    updateWaterInGrams(waterInGrams: number): CoffeeParams {
        console.log('HarioSwitchEmiFukahoriCoffeeParams waterInGrams waterInGrams: ', waterInGrams, ' will new a CoffeeParams object');
        return new HarioSwitchEmiFukahoriCoffeeParams(this.beanInGrams, this.coffeeToWaterRatio, waterInGrams);
    }
    updateCoffeeToWaterRatio(coffeeToWaterRatio: number): CoffeeParams {
        console.log('HarioSwitchEmiFukahoriCoffeeParams updateCoffeeToWaterRatio coffeeToWaterRatio: ', coffeeToWaterRatio, ' will new a CoffeeParams object');
        return new HarioSwitchEmiFukahoriCoffeeParams(this.beanInGrams, coffeeToWaterRatio, this.waterInGrams);
    }
    
}