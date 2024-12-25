import { CoffeeRecipeId, getCoffeeRecipeDefaultConfig } from "./CoffeeRecipeConstants";
import type { CoffeeParametersConfig, CoffeeRecipeConfig, CoffeeRecipe, CoffeeRecipeSteps } from "./CoffeeRecipeTypes";
import { caculateCoffeeParameters } from "./CoffeeParametersUtils";
import { calculateStepWaterInfos, sumOfDurations } from "./CoffeeRecipeStepsUtils";
import { calculateStepsTimeframe } from "./StepsTimeframeUtils";


export const createCoffeeRecipe = (recipeId: CoffeeRecipeId): CoffeeRecipe => {
    console.log('createCoffeeRecipe recipeId: ', recipeId);

    let recipeDefaultConfig: CoffeeRecipeConfig = getCoffeeRecipeDefaultConfig(recipeId);
   
    return <CoffeeRecipe> {
        recipeId: recipeId,
        defaultCoffeeParams: createCoffeeParams(recipeId, recipeDefaultConfig.coffeeParameters),
        references: recipeDefaultConfig.references
    }
}

export const createCoffeeParams = (recipeId: CoffeeRecipeId, inCoffeeParams: CoffeeParametersConfig): CoffeeParametersConfig => {
    console.log('createCoffeeParams recipeId: ', recipeId, ' beanInGrams: ', inCoffeeParams.beanInGrams, ' coffeeToWaterRatio: ', inCoffeeParams.coffeeToWaterRatio, ' waterInGrams: ', inCoffeeParams.waterInGrams);

    let recipeDefaultConfig: CoffeeRecipeConfig = getCoffeeRecipeDefaultConfig(recipeId);
    
    let coffeeParams = <CoffeeParametersConfig> {
        beanInGrams : inCoffeeParams.beanInGrams ? inCoffeeParams.beanInGrams : recipeDefaultConfig.coffeeParameters.beanInGrams,
        coffeeToWaterRatio: inCoffeeParams.coffeeToWaterRatio ? inCoffeeParams.coffeeToWaterRatio : recipeDefaultConfig.coffeeParameters.coffeeToWaterRatio,
        waterInGrams: inCoffeeParams.waterInGrams ? inCoffeeParams.waterInGrams : recipeDefaultConfig.coffeeParameters.waterInGrams
    };

    // calculate the coffeeToWaterRatio and waterInGrams based on input, so water
    return caculateCoffeeParameters(coffeeParams);
}

export const createCoffeeRecipeSteps = (recipeId: CoffeeRecipeId, coffeeParametersConfig: CoffeeParametersConfig, stepsDurationInSeconds: number[]) : CoffeeRecipeSteps => {
    console.log('createCoffeeRecipeSteps coffeeParametersConfig: ', coffeeParametersConfig, 'stepsDurationInSeconds:', stepsDurationInSeconds);

    let recipeDefaultConfig: CoffeeRecipeConfig = getCoffeeRecipeDefaultConfig(recipeId);
   
    return <CoffeeRecipeSteps> {
        isTimerRecipe : recipeDefaultConfig.isTimerRecipe,
        isImmersionDripperRecipe : recipeDefaultConfig.isImmersionDripperRecipe,
        stepsDurationInSeconds : stepsDurationInSeconds ? stepsDurationInSeconds : recipeDefaultConfig.stepsDurationInSeconds,
        
        steps : recipeDefaultConfig.steps,
        timerInSeconds : stepsDurationInSeconds ? sumOfDurations(stepsDurationInSeconds): 0,
        stepsTimeframe : calculateStepsTimeframe(stepsDurationInSeconds),
        
        stepWaterInfos : calculateStepWaterInfos(coffeeParametersConfig, recipeDefaultConfig.pourParameters)
    }
}
