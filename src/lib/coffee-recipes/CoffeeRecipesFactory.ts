import { CoffeeRecipeId, getCoffeeRecipeDefaultConfig } from "./CoffeeRecipeConstants";
import { CoffeeRecipe } from "./CoffeeRecipe";
import { StandardCoffeeRecipeSteps } from "./StandardCoffeeRecipeSteps";
import { StandardCoffeeRecipe } from "./StandardCoffeeRecipe";
import type { CoffeeParametersConfig, CoffeeRecipeConfig } from "./CoffeeRecipeTypes";
import { caculateCoffeeParameters } from "./CoffeeParametersUtils";


export const createCoffeeRecipe = (recipeId: CoffeeRecipeId): CoffeeRecipe => {
    console.log('createCoffeeRecipe recipeId: ', recipeId);

    let recipeDefaultConfig: CoffeeRecipeConfig = getCoffeeRecipeDefaultConfig(recipeId);
    return new StandardCoffeeRecipe(
        recipeId, 
        // createCoffeeParams(
        //     recipeId,
        //     recipeDefaultConfig.coffeeParameters.beanInGrams,
        //     recipeDefaultConfig.coffeeParameters.coffeeToWaterRatio,
        //     recipeDefaultConfig.coffeeParameters.waterInGrams
        // ),
        createCoffeeParams(
            recipeId,
            recipeDefaultConfig.coffeeParameters
        ),
        recipeDefaultConfig.references
    )
}

// export const createCoffeeParams = (recipeId: CoffeeRecipeId, beanInGrams: number, coffeeToWaterRatio: number, waterInGrams: number): CoffeeParametersConfig => {
//     console.log('createCoffeeParams recipeId: ', recipeId, ' beanInGrams: ', beanInGrams, ' coffeeToWaterRatio: ', coffeeToWaterRatio, ' waterInGrams: ', waterInGrams);

//     let recipeDefaultConfig = getCoffeeRecipeDefaultConfig(recipeId);
    
//     let inCoffeeParams = <CoffeeParametersConfig> {
//         beanInGrams : beanInGrams ? beanInGrams : recipeDefaultConfig.coffeeParameters.beanInGrams,
//         coffeeToWaterRatio: coffeeToWaterRatio ? coffeeToWaterRatio : recipeDefaultConfig.coffeeParameters.coffeeToWaterRatio,
//         waterInGrams: waterInGrams ? waterInGrams : recipeDefaultConfig.coffeeParameters.waterInGrams
//     };

//     // calculate the coffeeToWaterRatio and waterInGrams based on input, so water
//     return caculateCoffeeParameters(inCoffeeParams);
// }

export const createCoffeeParams = (recipeId: CoffeeRecipeId, inCoffeeParams: CoffeeParametersConfig): CoffeeParametersConfig => {
    console.log('createCoffeeParams recipeId: ', recipeId, ' beanInGrams: ', inCoffeeParams.beanInGrams, ' coffeeToWaterRatio: ', inCoffeeParams.coffeeToWaterRatio, ' waterInGrams: ', inCoffeeParams.waterInGrams);

    let recipeDefaultConfig = getCoffeeRecipeDefaultConfig(recipeId);
    
    let coffeeParams = <CoffeeParametersConfig> {
        beanInGrams : inCoffeeParams.beanInGrams ? inCoffeeParams.beanInGrams : recipeDefaultConfig.coffeeParameters.beanInGrams,
        coffeeToWaterRatio: inCoffeeParams.coffeeToWaterRatio ? inCoffeeParams.coffeeToWaterRatio : recipeDefaultConfig.coffeeParameters.coffeeToWaterRatio,
        waterInGrams: inCoffeeParams.waterInGrams ? inCoffeeParams.waterInGrams : recipeDefaultConfig.coffeeParameters.waterInGrams
    };

    // calculate the coffeeToWaterRatio and waterInGrams based on input, so water
    return caculateCoffeeParameters(coffeeParams);
}

export const createCoffeeRecipeSteps = (recipeId: CoffeeRecipeId, coffeeParametersConfig: CoffeeParametersConfig, stepsDurationInSeconds: number[]) => {
    console.log('createCoffeeParams coffeeParametersConfig: ', coffeeParametersConfig);

    let recipeDefaultConfig = getCoffeeRecipeDefaultConfig(recipeId);
    return new StandardCoffeeRecipeSteps(
        recipeId, 
        coffeeParametersConfig, 
        stepsDurationInSeconds ? stepsDurationInSeconds : recipeDefaultConfig.stepsDurationInSeconds, 
        recipeDefaultConfig.pourParameters, 
        recipeDefaultConfig.steps,
        recipeDefaultConfig.isTimerRecipe,
        recipeDefaultConfig.isImmersionDripperRecipe,
    );
}
