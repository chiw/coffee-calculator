import { CoffeeRecipeSteps } from "./CoffeeRecipeSteps";
import { CoffeeRecipeId } from "./CoffeeRecipeConstants";
import { CoffeeParameters } from "./CoffeeParameters";
import type { PourParametersConfig, StepConfig } from "./CoffeeRecipeTypes";

export class StandardCoffeeRecipeSteps extends CoffeeRecipeSteps {

    constructor(coffeeRecipeId: CoffeeRecipeId, coffeeParams: CoffeeParameters, stepsDurationInSeconds: number[], pourParameters?: PourParametersConfig[], steps: StepConfig[], isTimerRecipe: boolean = false, isImmersionDripperRecipe: boolean = false) {
        super(
            coffeeRecipeId, 
            coffeeParams, 
            stepsDurationInSeconds ? stepsDurationInSeconds : [],
            pourParameters ? pourParameters : [],
            steps ? steps : [],
            isTimerRecipe,
            isImmersionDripperRecipe
        );
        
        console.log('StandardCoffeeRecipeSteps constructor', 
            'coffeeRecipeId: ', this.coffeeRecipeId, 
            'coffeeParams: ', this.coffeeParameters, 
            'stepsDurationInSeconds', this.stepsDurationInSeconds, 
            'pourParameters', this.pourParameters, 
            'stepWaterInfos', this.stepWaterInfos,
            'steps', this.steps,
            'stepsTimeframe', this.stepsTimeframe,
            'isTimerRecipe', this.isTimerRecipe,
            'isImmersionDripperRecipe', this.isImmersionDripperRecipe
        );
    }
}