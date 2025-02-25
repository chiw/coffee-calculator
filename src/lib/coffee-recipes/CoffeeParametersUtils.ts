import type { CoffeeParametersConfig } from './CoffeeRecipeTypes';

function calculateRecipeWaterInGrams(beanInGrams: number, coffeeToWaterRatio: number): number {
	return beanInGrams * coffeeToWaterRatio;
}

function calculateRecipeCoffeeToWaterRatio(waterInGrams: number, beanInGrams: number): number {
	return waterInGrams / beanInGrams;
}

function caculateCoffeeParameters(inCoffeeParams: CoffeeParametersConfig): CoffeeParametersConfig {
	/* beanInGrams x coffeeToWaterRatio = waterInGrams */
	const beanInGrams = inCoffeeParams.beanInGrams ? inCoffeeParams.beanInGrams : 0;
	let coffeeToWaterRatio = inCoffeeParams.coffeeToWaterRatio
		? inCoffeeParams.coffeeToWaterRatio
		: -1;
	let waterInGrams = inCoffeeParams.waterInGrams ? inCoffeeParams.waterInGrams : -1;

	// init coffee param case
	if (waterInGrams < 0) {
		waterInGrams = calculateRecipeWaterInGrams(beanInGrams, coffeeToWaterRatio);
	}

	if (coffeeToWaterRatio < 0) {
		coffeeToWaterRatio = calculateRecipeCoffeeToWaterRatio(waterInGrams, beanInGrams);
	}

	// update case
	if (waterInGrams > 0 && coffeeToWaterRatio > 0) {
		// console.log('update case, coffeeToWaterRatio should have been fixed, calculate new waterInGrams');
		waterInGrams = calculateRecipeWaterInGrams(beanInGrams, coffeeToWaterRatio);
	}

	return <CoffeeParametersConfig>{
		beanInGrams: beanInGrams,
		coffeeToWaterRatio: coffeeToWaterRatio,
		waterInGrams: waterInGrams
	};
}

export { calculateRecipeWaterInGrams, calculateRecipeCoffeeToWaterRatio, caculateCoffeeParameters };
