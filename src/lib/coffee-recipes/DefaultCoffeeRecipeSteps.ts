import { CoffeeRecipeSteps } from "./CoffeeRecipeSteps";
import { CoffeeRecipeId } from "./CoffeeRecipeConstants";
import { CoffeeParams } from "./CoffeeParams";
import type { PourParam } from "./PourParam.type";

export class DefaultCoffeeRecipeSteps extends CoffeeRecipeSteps {

    constructor(coffeeRecipeId: CoffeeRecipeId, coffeeParams: CoffeeParams, stepsDurationInSeconds: number[], pourParams?: PourParam[], steps, isTimerRecipe: boolean = false, isImmersionDripperRecipe: boolean = false) {
        super(
            coffeeRecipeId, 
            coffeeParams, 
            stepsDurationInSeconds ? stepsDurationInSeconds : [],
            pourParams ? pourParams : [],
            steps ? steps : [],
            isTimerRecipe,
            isImmersionDripperRecipe
        );
        
        console.log('DefaultCoffeeRecipeSteps constructor', 
            'coffeeRecipeId: ', this.coffeeRecipeId, 
            'coffeeParams: ', this.coffeeParams, 
            'stepsDurationInSeconds', this.stepsDurationInSeconds, 
            'pourParams', this.pourParams, 
            'stepWaterInfos', this.stepWaterInfos,
            'steps', this.steps,
            'isTimerRecipe', this.isTimerRecipe,
            'isImmersionDripperRecipe', this.isImmersionDripperRecipe
        );
    }
}