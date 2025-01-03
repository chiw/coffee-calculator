import { CoffeeRecipeId, getCoffeeRecipeDefaultConfig } from "./CoffeeRecipeConstants";
import type { CoffeeParametersConfig, CoffeeRecipeConfig, CoffeeRecipe, CoffeeRecipeSteps, StepConfig, PourParametersConfig, Timeframe, StepWaterInfo } from "./CoffeeRecipeTypes";
import { caculateCoffeeParameters } from "./CoffeeParametersUtils";
import { calculateStepWaterInfos, sumOfDurations } from "./CoffeeRecipeStepsUtils";
import { calculateStepsTimeframe } from "./StepsTimeframeUtils";


export const getStepsDurationInSeconds = (stepConfigs: StepConfig[]): number[] => {
    return stepConfigs.map(step => step.durationInSeconds);
}

export const createCoffeeRecipe = (recipeId: CoffeeRecipeId): CoffeeRecipe => {
    let recipeDefaultConfig: CoffeeRecipeConfig = getCoffeeRecipeDefaultConfig(recipeId);

    console.log('createCoffeeRecipe recipeId:', recipeId, 'recipeDefaultConfig:', recipeDefaultConfig);
   
    return <CoffeeRecipe> {
        recipeId: recipeId,
        defaultCoffeeParams: createCoffeeParams(recipeId, recipeDefaultConfig.coffeeParameters),
        defaultStepsDurationInSeconds: getStepsDurationInSeconds(recipeDefaultConfig.steps),
        defaultSteps: recipeDefaultConfig.steps,
        references: recipeDefaultConfig.references,
        is46Method: recipeDefaultConfig.is46Method
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

    let stepsDurationInSeconds: number[] = getStepsDurationInSeconds(steps);
    let stepsWithTimeframe: StepConfig[] = updateSteps(steps, stepsDurationInSeconds);
    let timerInSeconds: number = stepsDurationInSeconds ? sumOfDurations(stepsDurationInSeconds): 0;
    
    let pourParameters: PourParametersConfig[] = steps.map(step => step.pourParameters);
    let stepWaterInfos: StepWaterInfo[] = calculateStepWaterInfos(coffeeParametersConfig, pourParameters);

    let stepsWithTimeframeAndWaterInfo: StepConfig[] = stepsWithTimeframe.map((step, index) => { step.stepWaterInfo = stepWaterInfos[index]; return step;});

    console.log('createCoffeeRecipeSteps recipeDefaultConfig:', recipeDefaultConfig, 'stepsDurationInSeconds:', stepsDurationInSeconds, 'pourParameters:', pourParameters);
   
    let result: CoffeeRecipeSteps = <CoffeeRecipeSteps> {
        isTimerRecipe : recipeDefaultConfig.isTimerRecipe,
        isImmersionDripperRecipe : recipeDefaultConfig.isImmersionDripperRecipe,
        stepsDurationInSeconds: stepsDurationInSeconds,

        steps: stepsWithTimeframeAndWaterInfo,
        timerInSeconds : timerInSeconds,
    }

    console.log('createCoffeeRecipeSteps recipeDefaultConfig:', recipeDefaultConfig, 'stepsDurationInSeconds:', stepsDurationInSeconds, 'pourParameters:', pourParameters, 'result:', result);
    return result;
}

export const updateSteps = (originalStepConfigs: StepConfig[], stepsDurationInSeconds: number[]): StepConfig[] => {
    console.log('updateSteps originalCoffeeRecipeSteps: ', originalStepConfigs, 'stepsDurationInSeconds', stepsDurationInSeconds);

    let result: StepConfig[] = [];
    let stepsTimeframe: Timeframe[] = calculateStepsTimeframe(stepsDurationInSeconds);

    originalStepConfigs.forEach((origStepConfig, index) => {
        let newStepConfig: StepConfig = <StepConfig> JSON.parse(JSON.stringify(origStepConfig));
        newStepConfig.durationInSeconds = stepsDurationInSeconds[index];
        newStepConfig.timeFrame = stepsTimeframe[index];
        result.push(newStepConfig);
    });

    return result;
}

export const updateStepDurationInSeconds = (originalStepConfigs: StepConfig[], index: number, newDurationInSeconds: number): StepConfig[] => {
    console.log('updateStepDurationInSeconds originalStepConfigs: ', originalStepConfigs, 'index', index, 'newDurationInSeconds', newDurationInSeconds);

    let newStepConfigs: StepConfig[] = <StepConfig[]> JSON.parse(JSON.stringify(originalStepConfigs));
    let clonedStepsDurationInSeconds: number[] = getStepsDurationInSeconds(newStepConfigs);

    clonedStepsDurationInSeconds[index] = newDurationInSeconds;

    return updateSteps(originalStepConfigs, clonedStepsDurationInSeconds);
}
