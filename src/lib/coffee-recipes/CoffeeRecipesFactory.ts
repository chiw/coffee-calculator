import { CoffeeRecipeId, getCoffeeRecipeDefaultConfig } from './CoffeeRecipeConstants';
import {
	type CoffeeParametersConfig,
	type CoffeeRecipeConfig,
	type CoffeeRecipe,
	type CoffeeRecipeSteps,
	type StepConfig,
	type PourParametersConfig,
	type Timeframe,
	type StepWaterInfo,
	type StepAdjustmentAvailableOptions,
	type RecipeChangeFactors,
	type RecipeChangeStatus
} from './CoffeeRecipeTypes.d';
import { caculateCoffeeParameters } from './CoffeeParametersUtils';
import { calculateStepWaterInfos, sumOfDurations } from './CoffeeRecipeStepsUtils';
import { calculateStepsTimeframe } from './StepsTimeframeUtils';
import {
	createEmptyStepControls,
	createStepControls,
	createStepsFromStepAdjustments,
	recreateStepsWithStepControl
} from './StepAdjustmentUtils';
import { updated } from '$app/state';
import { compareRecipeChangeFactors } from './RecipeChangeFactorsUtils';

export const getStepsDurationInSeconds = (stepConfigs: StepConfig[]): number[] => {
	return stepConfigs.map((step) => step.durationInSeconds);
};

export const createCoffeeRecipe = (recipeId: CoffeeRecipeId): CoffeeRecipe => {
	const recipeDefaultConfig: CoffeeRecipeConfig = getCoffeeRecipeDefaultConfig(recipeId);

	// console.log('createCoffeeRecipe recipeId:', recipeId, 'recipeDefaultConfig:', recipeDefaultConfig);

	const defaultCoffeeParams = createCoffeeParams(recipeId, recipeDefaultConfig.coffeeParameters);

	const defaultSteps =
		recipeDefaultConfig.enableStepsAdjustments == true
			? createStepsFromStepAdjustments(
					recipeDefaultConfig.stepAdjustments,
					recipeDefaultConfig.stepAdjustments?.selectedOptions
				)
			: recipeDefaultConfig.steps;

	const defaultStepsDurationInSeconds = getStepsDurationInSeconds(defaultSteps);

	const defaultStepControls = recipeDefaultConfig.enableStepsAdjustments
		? createStepControls(
				recipeDefaultConfig.stepAdjustments,
				recipeDefaultConfig.stepAdjustments?.selectedOptions
			)
		: createEmptyStepControls();

	const defaultRecipeChangeFactors = <RecipeChangeFactors>{
		coffeeParameters: defaultCoffeeParams,
		stepsDurationInSeconds: defaultStepsDurationInSeconds,
		stepControls: defaultStepControls
	};

	const coffeeRecipe: CoffeeRecipe = <CoffeeRecipe>{
		recipeId: recipeId,
		defaultSteps: defaultSteps,
		references: recipeDefaultConfig.references,
		is46Method: recipeDefaultConfig.is46Method,
		enableStepsAdjustments: recipeDefaultConfig.enableStepsAdjustments
			? recipeDefaultConfig.enableStepsAdjustments
			: false,
		defaultRecipeChangeFactors: defaultRecipeChangeFactors,
		seoData: recipeDefaultConfig.seoData ? recipeDefaultConfig.seoData : undefined
	};

	// console.log('createCoffeeRecipe coffeeRecipe: ', coffeeRecipe);
	return coffeeRecipe;
};

export const createCoffeeParams = (
	recipeId: CoffeeRecipeId,
	inCoffeeParams: CoffeeParametersConfig
): CoffeeParametersConfig => {
	// console.log('createCoffeeParams recipeId: ', recipeId, ' beanInGrams: ', inCoffeeParams.beanInGrams, ' coffeeToWaterRatio: ', inCoffeeParams.coffeeToWaterRatio, ' waterInGrams: ', inCoffeeParams.waterInGrams);

	const recipeDefaultConfig: CoffeeRecipeConfig = getCoffeeRecipeDefaultConfig(recipeId);

	// console.log('createCoffeeParams recipeDefaultConfig:', recipeDefaultConfig);

	const coffeeParams = <CoffeeParametersConfig>{
		beanInGrams: inCoffeeParams.beanInGrams
			? inCoffeeParams.beanInGrams
			: recipeDefaultConfig.coffeeParameters.beanInGrams,
		coffeeToWaterRatio: inCoffeeParams.coffeeToWaterRatio
			? inCoffeeParams.coffeeToWaterRatio
			: recipeDefaultConfig.coffeeParameters.coffeeToWaterRatio,
		waterInGrams: inCoffeeParams.waterInGrams
			? inCoffeeParams.waterInGrams
			: recipeDefaultConfig.coffeeParameters.waterInGrams
	};

	// calculate the coffeeToWaterRatio and waterInGrams based on input, so water
	const result = caculateCoffeeParameters(coffeeParams);
	// console.log('createCoffeeParams result', result);
	return result;
};

export const createCoffeeRecipeStepsWithChangeFactors = (
	recipeId: CoffeeRecipeId,
	recipeChangeFactors: RecipeChangeFactors,
	coffeeRecipe: CoffeeRecipe
): CoffeeRecipeSteps => {
	// console.log('createCoffeeRecipeStepsWithChangeFactors recipeId: ', recipeId, ' recipeChangeFactors: ', recipeChangeFactors, 'coffeeRecipe', coffeeRecipe);

	const recipeDefaultConfig: CoffeeRecipeConfig = getCoffeeRecipeDefaultConfig(recipeId);

	const steps: StepConfig[] = recipeDefaultConfig.enableStepsAdjustments
		? recreateStepsWithStepControl(recipeId, recipeChangeFactors.stepControls)
		: recipeDefaultConfig.steps;

	// console.log('steps', steps);

	// let stepsDurationInSeconds: number[] = (steps.length == recipeChangeFactors.stepsDurationInSeconds.length) ?
	const stepsDurationInSeconds: number[] =
		recipeChangeFactors.factorsToUpdate?.includes('stepsDurationInSeconds') ||
		(recipeChangeFactors.recipeChangeStatus &&
			recipeChangeFactors.recipeChangeStatus.updatedStepsDurationInSeconds)
			? recipeChangeFactors.stepsDurationInSeconds
			: getStepsDurationInSeconds(steps);

	const clonedRecipeChangeFactors: RecipeChangeFactors = <RecipeChangeFactors>(
		JSON.parse(JSON.stringify(recipeChangeFactors))
	);
	clonedRecipeChangeFactors.stepsDurationInSeconds = stepsDurationInSeconds;
	// console.log('stepsDurationInSeconds', stepsDurationInSeconds);

	const stepsWithTimeframe: StepConfig[] = updateSteps(steps, stepsDurationInSeconds);
	const timerInSeconds: number = stepsDurationInSeconds ? sumOfDurations(stepsDurationInSeconds) : 0;
	const pourParameters: PourParametersConfig[] = steps.map((step) => step.pourParameters);
	const stepWaterInfos: StepWaterInfo[] = calculateStepWaterInfos(
		clonedRecipeChangeFactors.coffeeParameters,
		pourParameters
	);

	const stepsWithTimeframeAndWaterInfo: StepConfig[] = stepsWithTimeframe.map((step, index) => {
		step.stepWaterInfo = stepWaterInfos[index];
		return step;
	});

	let showTimeframeEndTime: boolean = true;
	if (recipeDefaultConfig.showTimeframeEndTime === false) {
		showTimeframeEndTime = false;
	}

	// to find out which factors have been updated, so the structure can tell the UI to update the corresponding fields
	const recipeChangeStatus: RecipeChangeStatus = compareRecipeChangeFactors(
		recipeChangeFactors,
		coffeeRecipe ? coffeeRecipe.defaultRecipeChangeFactors : undefined
	);

	// update the recipeChangeFactors with the latest status
	clonedRecipeChangeFactors.recipeChangeStatus = recipeChangeStatus;

	const result: CoffeeRecipeSteps = <CoffeeRecipeSteps>{
		isTimerRecipe: recipeDefaultConfig.isTimerRecipe,
		isImmersionDripperRecipe: recipeDefaultConfig.isImmersionDripperRecipe,
		enableStepsAdjustments: recipeDefaultConfig.enableStepsAdjustments
			? recipeDefaultConfig.enableStepsAdjustments
			: false,
		stepsAdjustments: recipeDefaultConfig.stepAdjustments,
		steps: stepsWithTimeframeAndWaterInfo,
		timerInSeconds: timerInSeconds,
		showTimeframeEndTime: showTimeframeEndTime,
		recipeChangeFactors: clonedRecipeChangeFactors,
		recipeChangeStatus: recipeChangeStatus
	};

	// console.log('createCoffeeRecipeStepsWithChangeFactors result:', result);
	return result;
};

const updateSteps = (
	originalStepConfigs: StepConfig[],
	stepsDurationInSeconds: number[]
): StepConfig[] => {
	// console.log('updateSteps originalCoffeeRecipeSteps: ', originalStepConfigs, 'stepsDurationInSeconds', stepsDurationInSeconds);

	const result: StepConfig[] = [];
	const stepsTimeframe: Timeframe[] = calculateStepsTimeframe(stepsDurationInSeconds);

	originalStepConfigs.forEach((origStepConfig, index) => {
		const newStepConfig: StepConfig = <StepConfig>JSON.parse(JSON.stringify(origStepConfig));
		newStepConfig.durationInSeconds = stepsDurationInSeconds[index];
		newStepConfig.timeFrame = stepsTimeframe[index];
		result.push(newStepConfig);
	});

	return result;
};

export const updateStepDurationInSeconds = (
	originalStepConfigs: StepConfig[],
	index: number,
	newDurationInSeconds: number
): StepConfig[] => {
	// console.log('updateStepDurationInSeconds originalStepConfigs: ', originalStepConfigs, 'index', index, 'newDurationInSeconds', newDurationInSeconds);

	const newStepConfigs: StepConfig[] = <StepConfig[]>JSON.parse(JSON.stringify(originalStepConfigs));
	const clonedStepsDurationInSeconds: number[] = getStepsDurationInSeconds(newStepConfigs);

	clonedStepsDurationInSeconds[index] = newDurationInSeconds;

	return updateSteps(originalStepConfigs, clonedStepsDurationInSeconds);
};
