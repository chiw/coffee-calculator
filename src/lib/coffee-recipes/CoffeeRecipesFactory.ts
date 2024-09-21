import { CoffeeRecipeId, getCoffeeRecipeDefaultConfig } from "./CoffeeRecipeConstants";
import { CoffeeRecipe } from "./CoffeeRecipe";
import { CoffeeParameters } from "./CoffeeParameters";
import { StandardCoffeeRecipeSteps } from "./StandardCoffeeRecipeSteps";
import { StandardCoffeeParameters } from "./StandardCoffeeParams";
import { StandardCoffeeRecipe } from "./StandardCoffeeRecipe";
import type { CoffeeRecipeConfig } from "./CoffeeRecipeTypes";


export const createCoffeeRecipe = (recipeId: CoffeeRecipeId): CoffeeRecipe => {
    console.log('createCoffeeRecipe recipeId: ', recipeId);

    let recipeDefaultConfig: CoffeeRecipeConfig = getCoffeeRecipeDefaultConfig(recipeId);
    return new StandardCoffeeRecipe(
        recipeId, 
        createCoffeeParams(
            recipeId,
            recipeDefaultConfig.coffeeParameters.beanInGrams,
            recipeDefaultConfig.coffeeParameters.coffeeToWaterRatio,
            recipeDefaultConfig.coffeeParameters.waterInGrams
        ),
        recipeDefaultConfig.references
    )
}

export const createCoffeeParams = (recipeId: CoffeeRecipeId, beanInGrams: number, coffeeToWaterRatio: number, waterInGrams: number): CoffeeParameters => {
    console.log('createCoffeeParams recipeId: ', recipeId, ' beanInGrams: ', beanInGrams, ' coffeeToWaterRatio: ', coffeeToWaterRatio, ' waterInGrams: ', waterInGrams);

    let recipeDefaultConfig = getCoffeeRecipeDefaultConfig(recipeId);
    return new StandardCoffeeParameters(
        recipeId,
        beanInGrams ? beanInGrams : recipeDefaultConfig.coffeeParameters.beanInGrams,
        coffeeToWaterRatio ? coffeeToWaterRatio : recipeDefaultConfig.coffeeParameters.coffeeToWaterRatio,
        waterInGrams ? waterInGrams : recipeDefaultConfig.coffeeParameters.waterInGrams
    );
}

export const createCoffeeRecipeSteps = (coffeeParameters: CoffeeParameters, stepsDurationInSeconds: number[]) => {
    console.log('createCoffeeParams coffeeParams: ', coffeeParameters);

    let recipeDefaultConfig = getCoffeeRecipeDefaultConfig(coffeeParameters.recipeId);
    return new StandardCoffeeRecipeSteps(
        coffeeParameters.recipeId, 
        coffeeParameters, 
        stepsDurationInSeconds ? stepsDurationInSeconds : recipeDefaultConfig.stepsDurationInSeconds, 
        recipeDefaultConfig.pourParameters, 
        recipeDefaultConfig.steps,
        recipeDefaultConfig.isTimerRecipe,
        recipeDefaultConfig.isImmersionDripperRecipe,
    );
}
