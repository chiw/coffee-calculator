import { displayNumber } from "$lib/utils/NumberDisplayUtils";
import type { CoffeeParametersConfig, PourParametersConfig, StepWaterInfo } from "./CoffeeRecipeTypes";

export const sumOfDurations = (durations: number[]) => durations.reduce((a, b) => a + b, 0);

export const calculatePourWaterInGrams = (waterInGrams: number, waterPercentage: number): number => { return waterInGrams * waterPercentage / 100; }

export const calculateStepWaterInfos = (coffeeParameters: CoffeeParametersConfig, pourParameters: PourParametersConfig[]): StepWaterInfo[]  => {
    let totalWaterInGrams = 0;

    let stepWaterInfos: StepWaterInfo[] = [];
    pourParameters.map(pourParam => {
        let stepWaterInGrams = calculatePourWaterInGrams(coffeeParameters.waterInGrams, pourParam.waterPercentage);
        let stepTotalWaterInGrams = totalWaterInGrams === 0 ? 0 : (stepWaterInGrams + totalWaterInGrams);

        let stepWaterInfo = createStepWaterInfo(stepWaterInGrams, stepTotalWaterInGrams, pourParam.waterTemp);
        // console.log('calculateStepWaterInfos push stepWaterInfo ', stepWaterInfo);
        stepWaterInfos.push(stepWaterInfo);
        totalWaterInGrams +=  stepWaterInGrams;
    })
    console.log('calculateStepWaterInfos', stepWaterInfos);
    return stepWaterInfos;
}

const createStepWaterInfo = (waterInGrams: number, totalWaterInGrams: number, waterTemperature: number) => {
    // console.log('createStepWaterInfo ', waterInGrams, totalWaterInGrams, waterTemperature);

    return <StepWaterInfo> {
        waterInGrams: displayNumber(waterInGrams),
        totalWaterInGrams: displayNumber(totalWaterInGrams),
        showTotalWaterInGrams: totalWaterInGrams > 0 ? true : false,
        waterTemperature: waterTemperature
    };
}