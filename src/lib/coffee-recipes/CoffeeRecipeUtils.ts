// import type { PourParam } from "./PourParam.type";

import type { PourParametersConfig } from "./CoffeeRecipeTypes";


function calculateRecipeWaterInGrams(beanInGrams: number, coffeeToWaterRatio: number) {
    return beanInGrams * coffeeToWaterRatio;
}

function calculateRecipeCoffeeToWaterRatio(waterInGrams: number, beanInGrams: number) {
    return waterInGrams / beanInGrams;
}

function calculatePourWaterInGrams(waterInGrams: number, pourParametersConfig: PourParametersConfig) {
//     return Math.round(waterInGrams * pourParametersConfig.waterPercentage / 100);
        return (waterInGrams * pourParametersConfig.waterPercentage / 100);
}

export {
    calculateRecipeWaterInGrams,
    calculateRecipeCoffeeToWaterRatio,
    calculatePourWaterInGrams
}