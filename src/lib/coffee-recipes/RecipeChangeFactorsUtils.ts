import type {
	CoffeeParametersConfig,
	RecipeChangeFactors,
	RecipeChangeStatus,
	StepControls
} from './CoffeeRecipeTypes';

export const compareRecipeChangeFactors = (
	recipeChangeFactors: RecipeChangeFactors,
	defaultRecipeChangeFactors: RecipeChangeFactors
): RecipeChangeStatus => {
	if (recipeChangeFactors === undefined && defaultRecipeChangeFactors === undefined)
		return <RecipeChangeStatus>{
			updatedCoffeeParameters: false,
			updatedStepsDurationInSeconds: false,
			updatedStepControls: false
		};

	return <RecipeChangeStatus>{
		updatedCoffeeParameters: coffeeParametersHasUpdated(
			recipeChangeFactors ? recipeChangeFactors.coffeeParameters : undefined,
			defaultRecipeChangeFactors ? defaultRecipeChangeFactors.coffeeParameters : undefined
		),

		updatedStepsDurationInSeconds: stepsDurationInSecondsHasChanged(
			recipeChangeFactors ? recipeChangeFactors.stepsDurationInSeconds : undefined,
			defaultRecipeChangeFactors ? defaultRecipeChangeFactors.stepsDurationInSeconds : undefined
		),

		updatedStepControls: stepControlsHasChanged(
			recipeChangeFactors ? recipeChangeFactors.stepControls : undefined,
			defaultRecipeChangeFactors ? defaultRecipeChangeFactors.stepControls : undefined
		)
	};
};

const coffeeParametersHasUpdated = (
	coffeeParameters: CoffeeParametersConfig,
	defaultCoffeeParameters: CoffeeParametersConfig
): boolean => {
	// console.log('coffeeParametersHasUpdated coffeeParameters1:', coffeeParameters, ' defaultCoffeeParameters:', defaultCoffeeParameters);

	if (coffeeParameters === undefined && defaultCoffeeParameters === undefined) return false;

	if (coffeeParameters === undefined || defaultCoffeeParameters === undefined) return true;

	return JSON.stringify(coffeeParameters) != JSON.stringify(defaultCoffeeParameters);
};

const stepsDurationInSecondsHasChanged = (
	stepsDurationInSeconds: number[],
	defaultStepsDurationInSeconds: number[]
): boolean => {
	// console.log('stepsDurationInSecondsHasChanged stepsDurationInSeconds:', stepsDurationInSeconds, ' defaultStepsDurationInSeconds:', defaultStepsDurationInSeconds);

	if (stepsDurationInSeconds === undefined && defaultStepsDurationInSeconds === undefined)
		return false;

	if (stepsDurationInSeconds === undefined || defaultStepsDurationInSeconds === undefined)
		return true;

	return JSON.stringify(stepsDurationInSeconds) != JSON.stringify(defaultStepsDurationInSeconds);
};

const stepControlsHasChanged = (
	stepControls1: StepControls,
	defaultStepControls: StepControls
): boolean => {
	// console.log('stepControlsHasChanged stepControls1:', stepControls1, ' stepControls2:', defaultStepControls);

	if (stepControls1 === undefined && defaultStepControls === undefined) return false;

	if (stepControls1 === undefined || defaultStepControls === undefined) return true;

	return JSON.stringify(stepControls1) != JSON.stringify(defaultStepControls);
};
