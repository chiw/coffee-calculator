import { CoffeeParams } from "./CoffeeParams"
import { CoffeeRecipeId } from "./CoffeeRecipeConstants";

export class HarioSwitchTetsuKasuyaCoffeeParams extends CoffeeParams {
    
    constructor(beanInGrams: number, coffeeToWaterRatio: number, waterInGrams: number) {
        console.log('HarioSwitchTetsuKasuyaCoffeeParams beanInGrams: ', beanInGrams, ' coffeeToWaterRatio: ', coffeeToWaterRatio, ' waterInGrams: ', waterInGrams);
        super(CoffeeRecipeId.HarioSwitch_TetsuKasuya, beanInGrams, coffeeToWaterRatio, waterInGrams);
    }

    updateBeanInGrams(beanInGrams: number): CoffeeParams {
        console.log('HarioSwitchTetsuKasuyaCoffeeParams updateBeanInGrams beanInGrams: ', beanInGrams, ' will new a CoffeeParams object');
        return new HarioSwitchTetsuKasuyaCoffeeParams(beanInGrams, this.coffeeToWaterRatio, this.waterInGrams);
    }
    updateWaterInGrams(waterInGrams: number): CoffeeParams {
        console.log('HarioSwitchTetsuKasuyaCoffeeParams updateWaterInGrams waterInGrams: ', waterInGrams, ' will new a CoffeeParams object');
        return new HarioSwitchTetsuKasuyaCoffeeParams(this.beanInGrams, this.coffeeToWaterRatio, waterInGrams);
    }
    updateCoffeeToWaterRatio(coffeeToWaterRatio: number): CoffeeParams {
        console.log('HarioSwitchTetsuKasuyaCoffeeParams updateCoffeeToWaterRatio coffeeToWaterRatio: ', coffeeToWaterRatio, ' will new a CoffeeParams object');
        return new HarioSwitchTetsuKasuyaCoffeeParams(this.beanInGrams, coffeeToWaterRatio, this.waterInGrams);
    }

}