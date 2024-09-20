import { CoffeeRecipeId, getCoffeeRecipeDefaultConfig } from "./CoffeeRecipeConstants";
import { CoffeeRecipe } from "./CoffeeRecipe";
import { CoffeeParams } from "./CoffeeParams";
import { DefaultCoffeeRecipeSteps } from "./DefaultCoffeeRecipeSteps";
import { DefaultCoffeeParams } from "./DefaultCoffeeParams";
import { DefaultCoffeeRecipe } from "./DefaultCoffeeRecipe";


export const createCoffeeRecipe = (recipeId: CoffeeRecipeId): CoffeeRecipe => {
    console.log('createCoffeeRecipe recipeId: ', recipeId);

    let recipeDefaultConfig = getCoffeeRecipeDefaultConfig(recipeId);
    return new DefaultCoffeeRecipe(
        recipeId, 
        createCoffeeParams(
            recipeId,
            recipeDefaultConfig.coffeeParams.beanInGrams,
            recipeDefaultConfig.coffeeParams.coffeeToWaterRatio,
            recipeDefaultConfig.coffeeParams.waterInGrams
        ),
        recipeDefaultConfig.references
    )
}

export const createCoffeeParams = (recipeId: CoffeeRecipeId, beanInGrams: number, coffeeToWaterRatio: number, waterInGrams: number): CoffeeParams => {
    console.log('createCoffeeParams recipeId: ', recipeId, ' beanInGrams: ', beanInGrams, ' coffeeToWaterRatio: ', coffeeToWaterRatio, ' waterInGrams: ', waterInGrams);

    let recipeDefaultConfig = getCoffeeRecipeDefaultConfig(recipeId);
    return new DefaultCoffeeParams(
        recipeId,
        beanInGrams ? beanInGrams : recipeDefaultConfig.coffeeParams.beanInGrams,
        coffeeToWaterRatio ? coffeeToWaterRatio : recipeDefaultConfig.coffeeParams.coffeeToWaterRatio,
        waterInGrams ? waterInGrams : recipeDefaultConfig.coffeeParams.waterInGrams
    );
}

export const createCoffeeRecipeSteps = (coffeeParams: CoffeeParams, stepsDurationInSeconds: number[]) => {
    console.log('createCoffeeParams coffeeParams: ', coffeeParams);

    let recipeDefaultConfig = getCoffeeRecipeDefaultConfig(coffeeParams.recipeId);
    return new DefaultCoffeeRecipeSteps(
        coffeeParams.recipeId, 
        coffeeParams, 
        stepsDurationInSeconds ? stepsDurationInSeconds : recipeDefaultConfig.stepsDurationInSeconds, 
        recipeDefaultConfig.pourParams, 
        recipeDefaultConfig.steps,
        recipeDefaultConfig.isTimerRecipe,
        recipeDefaultConfig.isImmersionDripperRecipe,
    );
}
