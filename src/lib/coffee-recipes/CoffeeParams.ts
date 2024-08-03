import { calculateRecipeWaterInGrams, calculateRecipeCoffeeToWaterRatio } from "./CoffeeRecipeUtils";
import { CoffeeRecipeId } from "./CoffeeRecipeConstants";

export abstract class CoffeeParams {
    recipeId: CoffeeRecipeId;
    public beanInGrams: number = -1;
    public waterInGrams: number = -1;
    public coffeeToWaterRatio: number = -1;

    constructor(recipeId: CoffeeRecipeId, beanInGrams: number, coffeeToWaterRatio: number, waterInGrams: number) {
        console.log('CoffeeParams constructor recipeId: ', recipeId,', beanInGrams: ', beanInGrams, ' coffeeToWaterRatio: ', coffeeToWaterRatio, ' waterInGrams: ', waterInGrams);
        this.recipeId = recipeId;

        /* beanInGrams x coffeeToWaterRatio = waterInGrams */
        this.beanInGrams = beanInGrams;
        this.coffeeToWaterRatio = coffeeToWaterRatio;
        this.waterInGrams = waterInGrams;

        // init coffee param case
        if(this.waterInGrams < 0) {
            this.waterInGrams = calculateRecipeWaterInGrams(this.beanInGrams, this.coffeeToWaterRatio);
        }

        if(this.coffeeToWaterRatio < 0) {
            this.coffeeToWaterRatio = calculateRecipeCoffeeToWaterRatio(this.waterInGrams, this.beanInGrams);
        }

        // update case
        if(this.waterInGrams > 0 && this.coffeeToWaterRatio > 0) {
            console.log('update case, coffeeToWaterRatio should have been fixed, calculate new waterInGrams');
            this.waterInGrams = calculateRecipeWaterInGrams(this.beanInGrams, this.coffeeToWaterRatio);
        }
    }

    updateBeanInGrams(beanInGrams: number): CoffeeParams {
        console.log('updateBeanInGrams beanInGrams: ', beanInGrams, ' will new a CoffeeParams object');
        return this.getNewInstance(beanInGrams, this.coffeeToWaterRatio, this.waterInGrams);
    }

    updateWaterInGrams(waterInGrams: number): CoffeeParams {
        console.log('waterInGrams waterInGrams: ', waterInGrams, ' will new a CoffeeParams object');
        return this.getNewInstance(this.beanInGrams, this.coffeeToWaterRatio, waterInGrams);
    }

    updateCoffeeToWaterRatio(coffeeToWaterRatio: number): CoffeeParams {
        console.log('updateCoffeeToWaterRatio coffeeToWaterRatio: ', coffeeToWaterRatio, ' will new a CoffeeParams object');
        return this.getNewInstance(this.beanInGrams, coffeeToWaterRatio, this.waterInGrams);
    }

    abstract getNewInstance(beanInGrams: number, coffeeToWaterRatio: number, waterInGrams: number): CoffeeParams;

}