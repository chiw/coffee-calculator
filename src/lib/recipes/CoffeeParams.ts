import { calculateRecipeWaterInGrams, calculateRecipeCoffeeToWaterRatio } from "./CoffeeRecipeUtils";
import { CoffeeRecipeId } from "./CoffeeRecipeConstants";

export abstract class CoffeeParams {
    recipeId: CoffeeRecipeId;
    public beanInGrams: number = -1;
    public waterInGrams: number = -1;
    public coffeeToWaterRatio: number = -1;

    constructor(recipeId: CoffeeRecipeId, beanInGrams: number, coffeeToWaterRatio: number, waterInGrams: number) {
        this.recipeId = recipeId;

        /* beanInGrams x coffeeToWaterRatio = waterInGrams */
        this.beanInGrams = beanInGrams;
        this.coffeeToWaterRatio = coffeeToWaterRatio;
        this.waterInGrams = waterInGrams;

        if(this.waterInGrams < 0) {
            this.waterInGrams = calculateRecipeWaterInGrams(this.beanInGrams, this.coffeeToWaterRatio);
        }

        if(this.coffeeToWaterRatio < 0) {
            this.coffeeToWaterRatio = calculateRecipeCoffeeToWaterRatio(this.waterInGrams, this.beanInGrams);
        }
    }

    abstract updateBeanInGrams(beanInGrams: number): CoffeeParams;

    abstract updateWaterInGrams(waterInGrams: number): CoffeeParams;

    abstract updateCoffeeToWaterRatio(coffeeToWaterRatio: number): CoffeeParams;

}