import { CoffeeRecipeId, getCoffeeRecipeDefaultConfig } from "./CoffeeRecipeConstants";
import type { CoffeeParametersConfig, CoffeeRecipeConfig, CoffeeRecipe, CoffeeRecipeSteps, StepConfig, PourParametersConfig } from "./CoffeeRecipeTypes";
import { caculateCoffeeParameters } from "./CoffeeParametersUtils";
import { calculateStepWaterInfos, sumOfDurations } from "./CoffeeRecipeStepsUtils";
import { calculateStepsTimeframe } from "./StepsTimeframeUtils";


export const createCoffeeRecipe = (recipeId: CoffeeRecipeId): CoffeeRecipe => {
    let recipeDefaultConfig: CoffeeRecipeConfig = getCoffeeRecipeDefaultConfig(recipeId);

    console.log('createCoffeeRecipe recipeId:', recipeId, 'recipeDefaultConfig:', recipeDefaultConfig);
   
    return <CoffeeRecipe> {
        recipeId: recipeId,
        defaultCoffeeParams: createCoffeeParams(recipeId, recipeDefaultConfig.coffeeParameters),
        defaultStepsDurationInSeconds: recipeDefaultConfig.stepsDurationInSeconds,
        defaultSteps: recipeDefaultConfig.steps,
        references: recipeDefaultConfig.references
    }
}

export const createCoffeeParams = (recipeId: CoffeeRecipeId, inCoffeeParams: CoffeeParametersConfig): CoffeeParametersConfig => {
    console.log('createCoffeeParams recipeId: ', recipeId, ' beanInGrams: ', inCoffeeParams.beanInGrams, ' coffeeToWaterRatio: ', inCoffeeParams.coffeeToWaterRatio, ' waterInGrams: ', inCoffeeParams.waterInGrams);

    let recipeDefaultConfig: CoffeeRecipeConfig = getCoffeeRecipeDefaultConfig(recipeId);

    console.log('createCoffeeParams recipeDefaultConfig:', recipeDefaultConfig);
    
    let coffeeParams = <CoffeeParametersConfig> {
        beanInGrams : inCoffeeParams.beanInGrams ? inCoffeeParams.beanInGrams : recipeDefaultConfig.coffeeParameters.beanInGrams,
        coffeeToWaterRatio: inCoffeeParams.coffeeToWaterRatio ? inCoffeeParams.coffeeToWaterRatio : recipeDefaultConfig.coffeeParameters.coffeeToWaterRatio,
        waterInGrams: inCoffeeParams.waterInGrams ? inCoffeeParams.waterInGrams : recipeDefaultConfig.coffeeParameters.waterInGrams
    };

    // calculate the coffeeToWaterRatio and waterInGrams based on input, so water
    let result =  caculateCoffeeParameters(coffeeParams);
    // console.log('createCoffeeParams result', result);
    return result;
}

export const createCoffeeRecipeSteps = (recipeId: CoffeeRecipeId, coffeeParametersConfig: CoffeeParametersConfig, steps: StepConfig[]) : CoffeeRecipeSteps => {
    console.log('createCoffeeRecipeSteps recipeId: ', recipeId, ' coffeeParametersConfig: ', coffeeParametersConfig, 'steps:', steps);

    let recipeDefaultConfig: CoffeeRecipeConfig = getCoffeeRecipeDefaultConfig(recipeId);

    let stepsDurationInSeconds: number[] = steps.map(step => step.durationInSeconds);
    let pourParameters: PourParametersConfig[] = steps.map(step => step.pourParameters);

    console.log('createCoffeeRecipeSteps recipeDefaultConfig:', recipeDefaultConfig, 'stepsDurationInSeconds:', stepsDurationInSeconds, 'pourParameters:', pourParameters);
   
    return <CoffeeRecipeSteps> {
        isTimerRecipe : recipeDefaultConfig.isTimerRecipe,
        isImmersionDripperRecipe : recipeDefaultConfig.isImmersionDripperRecipe,
        // stepsDurationInSeconds : stepsDurationInSeconds ? stepsDurationInSeconds : recipeDefaultConfig.stepsDurationInSeconds,
        stepsDurationInSeconds: stepsDurationInSeconds,
        
        steps : steps ? steps : recipeDefaultConfig.steps,
        timerInSeconds : stepsDurationInSeconds ? sumOfDurations(stepsDurationInSeconds): 0,
        stepsTimeframe : calculateStepsTimeframe(stepsDurationInSeconds),
        
        stepWaterInfos : calculateStepWaterInfos(coffeeParametersConfig, pourParameters)
    }
}

export const updateSteps = (originalStepConfigs: StepConfig[], stepsDurationInSeconds: number[]) => {
    console.log('updateSteps originalCoffeeRecipeSteps: ', originalStepConfigs, 'stepsDurationInSeconds', stepsDurationInSeconds);

    let result: StepConfig[] = [];

    originalStepConfigs.forEach((origStepConfig, index) => {
        let newStepConfig: StepConfig = <StepConfig> JSON.parse(JSON.stringify(origStepConfig));
        newStepConfig.durationInSeconds = stepsDurationInSeconds[index];
        result.push(newStepConfig);
    });

    return result;
}
