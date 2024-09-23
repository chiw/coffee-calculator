import { calculateRecipeWaterInGrams, calculateRecipeCoffeeToWaterRatio } from "./CoffeeRecipeUtils";
import { CoffeeRecipeId } from "./CoffeeRecipeConstants";

export abstract class CoffeeParameters {
    recipeId: CoffeeRecipeId;
    public beanInGrams: number = -1;
    public waterInGrams: number = -1;
    public coffeeToWaterRatio: number = -1;

    constructor(recipeId: CoffeeRecipeId, beanInGrams: number, coffeeToWaterRatio: number, waterInGrams: number) {
        // console.log('CoffeeParameters constructor recipeId: ', recipeId,', beanInGrams: ', beanInGrams, ' coffeeToWaterRatio: ', coffeeToWaterRatio, ' waterInGrams: ', waterInGrams);
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
            // console.log('update case, coffeeToWaterRatio should have been fixed, calculate new waterInGrams');
            this.waterInGrams = calculateRecipeWaterInGrams(this.beanInGrams, this.coffeeToWaterRatio);
        }
    }

}