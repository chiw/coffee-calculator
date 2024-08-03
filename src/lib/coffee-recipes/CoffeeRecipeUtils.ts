import type { PourParam } from "./PourParam.type";

function calculateRecipeWaterInGrams(beanInGrams: number, coffeeToWaterRatio: number) {
    return beanInGrams * coffeeToWaterRatio;
}

function calculateRecipeCoffeeToWaterRatio(waterInGrams: number, beanInGrams: number) {
    return waterInGrams / beanInGrams;
}

function calculatePourWaterInGrams(waterInGrams: number, pourParam: PourParam) {
    return Math.round(waterInGrams * pourParam.waterPercentage / 100);
}

export {
    calculateRecipeWaterInGrams,
    calculateRecipeCoffeeToWaterRatio,
    calculatePourWaterInGrams
}