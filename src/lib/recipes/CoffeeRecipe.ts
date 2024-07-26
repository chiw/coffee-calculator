import type { CoffeeRecipeId } from "./CoffeeRecipeConstants";
import type { Reference } from "./Reference.type";

export abstract class CoffeeRecipe {
    recipeId: CoffeeRecipeId;
    public beanInGrams: number = -1;
    public waterInGrams: number = -1;
    public coffeeToWaterRatio: number = -1;
    
    constructor(recipeId: CoffeeRecipeId) {
        this.recipeId = recipeId;
        this.initParameters();
    }

    initParameters() {
        this.beanInGrams = this.defaultParameters.defaultBeanInGrams;
        this.waterInGrams = this.defaultParameters.defaultWaterInGrams;
        this.coffeeToWaterRatio = this.defaultParameters.defaultCoffeeToWaterRatio;

        if(this.waterInGrams < 0) {
            this.waterInGrams = this.beanInGrams * this.coffeeToWaterRatio;
        }

        if(this.coffeeToWaterRatio < 0) {
            this.coffeeToWaterRatio = this.waterInGrams / this.beanInGrams;
        }
    }

    get defaultParameters() {
        return {
            defaultBeanInGrams : 20,
            defaultWaterInGrams: 280,
            defaultCoffeeToWaterRatio: -1
        }
    }

    get steps(): string[] {
        return [];
    }

    get stepsTimeframe(): number[][] {
        return [];
    }

    get references(): Reference[] {
        return [];
    }

    get isTimerRecipe(): boolean {
        return false;
    }

    get timerInSeconds() : number {
        return 0;
    }
}