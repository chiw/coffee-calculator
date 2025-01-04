import { PourOverStage, Method46Flavor, Method46Concentration, PouringTechnique, type StepConfig } from "./CoffeeRecipeTypes.d";

const stages: string[] = [
    PourOverStage.FIRST_POUR, PourOverStage.SECOND_POUR, PourOverStage.THIRD_POUR, PourOverStage.FOURTH_POUR, PourOverStage.FIFTH_POUR
];

export const PourRatio40Config = {
    "STANDARD" : { "waterPercentage": [20, 20], "durationInSeconds" : [45, 45] },
    "SWEETER"  : { "waterPercentage": [16.6667, 23.3333], "durationInSeconds" : [45, 45] },
    "BRIGHTER" : { "waterPercentage": [23.3333, 16.6667], "durationInSeconds" : [45, 45] },
    "DEFAULT"  : { "waterPercentage": [20, 20], "durationInSeconds" : [45, 45] }
}

export const PourRatio60Config = {
    "LIGHTER" : { "waterPercentage": [60], "durationInSeconds" : [120] },
    "STRONGER" : { "waterPercentage": [30, 30], "durationInSeconds" : [60, 60] },
    "EVEN_STRONGER" : { "waterPercentage": [20, 20, 20], "durationInSeconds" : [45, 30, 45] },
    "DEFAULT" : { "waterPercentage": [20, 20, 20], "durationInSeconds" : [45, 30, 45] },
}

export const getPourRatio40WaterPercentages = (pourRatios40: string): number[] => {
    if(pourRatios40 == Method46Flavor.STANDARD) {
        return PourRatio40Config.STANDARD.waterPercentage;
    }

    if(pourRatios40 == Method46Flavor.SWEETER) {
        return PourRatio40Config.SWEETER.waterPercentage;
    }

    if(pourRatios40 == Method46Flavor.BRIGHTER) {
        return PourRatio40Config.BRIGHTER.waterPercentage;
    }

    return PourRatio40Config.DEFAULT.waterPercentage;
}

export const getRatio40WaterInGrams = (pourRatios40: string, waterInGrams: number) => {
    console.log('getRatio40WaterInGrams pourRatios40', pourRatios40, 'waterInGrams', waterInGrams);
    return getPourRatio40WaterPercentages(pourRatios40).map(waterPercentage => (waterPercentage * waterInGrams) / 100);
}

export const getPourRatio60WaterPercentages = (pourRatios60: string): number[] => {
    if(pourRatios60 == Method46Concentration.LIGHTER) {
        return PourRatio60Config.LIGHTER.waterPercentage;
    }

    if(pourRatios60 == Method46Concentration.STRONGER) {
        return PourRatio60Config.STRONGER.waterPercentage;
    }

    if(pourRatios60 == Method46Concentration.EVEN_STRONGER) {
        return PourRatio60Config.EVEN_STRONGER.waterPercentage;
    }

    return PourRatio60Config.DEFAULT.waterPercentage;
}

export const getRatio60WaterInGrams = (pourRatios60: string, waterInGrams: number) => {
    console.log('getRatio60WaterInGrams pourRatios60', pourRatios60, 'waterInGrams', waterInGrams);
    return getPourRatio60WaterPercentages(pourRatios60).map(waterPercentage => (waterPercentage * waterInGrams) / 100);
}

export const calculateMethod46Steps = (pourRatios40: string, pourRatios60: string): StepConfig[] => {
 
    let stepConfigs : StepConfig[] = [];

    let pourRatios40WaterPercentages: number[] = PourRatio40Config.DEFAULT.waterPercentage;
    let pourRatios40StepsDurationInSeconds: number[] = PourRatio40Config.DEFAULT.durationInSeconds;

    if(pourRatios40 == Method46Flavor.STANDARD) {
        pourRatios40WaterPercentages = PourRatio40Config.STANDARD.waterPercentage;
    } else if (pourRatios40 == Method46Flavor.SWEETER) {
        pourRatios40WaterPercentages = PourRatio40Config.SWEETER.waterPercentage;
    } else if (pourRatios40 == Method46Flavor.BRIGHTER) {
        pourRatios40WaterPercentages = PourRatio40Config.BRIGHTER.waterPercentage;
    }

    console.log('calculateMethod46Steps pourRation40', pourRatios40, 'pourRatios40WaterPercentages', pourRatios40WaterPercentages);

    let pourRatios60WaterPercentages: number[] = PourRatio60Config.DEFAULT.waterPercentage;
    let pourRatios60StepsDurationInSeconds: number[] = PourRatio60Config.DEFAULT.durationInSeconds;

    if(pourRatios60 == Method46Concentration.LIGHTER) {
        pourRatios60WaterPercentages = PourRatio60Config.LIGHTER.waterPercentage;
        pourRatios60StepsDurationInSeconds = PourRatio60Config.LIGHTER.durationInSeconds;
    } else if (pourRatios60 == Method46Concentration.STRONGER) {
        pourRatios60WaterPercentages = PourRatio60Config.STRONGER.waterPercentage;
        pourRatios60StepsDurationInSeconds = PourRatio60Config.STRONGER.durationInSeconds;
    } else if (pourRatios60 == Method46Concentration.EVEN_STRONGER) {
        pourRatios60WaterPercentages = PourRatio60Config.EVEN_STRONGER.waterPercentage;
        pourRatios60StepsDurationInSeconds = PourRatio60Config.EVEN_STRONGER.durationInSeconds;
    }
    console.log('calculateMethod46Steps pourRatios60', pourRatios60, 'pourRatios60WaterPercentages', pourRatios60WaterPercentages);

    let waterTemp = 93;
    let stepsWaterPercentages = pourRatios40WaterPercentages.concat(pourRatios60WaterPercentages);
    let stepsDurationInSeconds = pourRatios40StepsDurationInSeconds.concat(pourRatios60StepsDurationInSeconds);

    stepsWaterPercentages.forEach((percentage, index) => {
        stepConfigs.push(<StepConfig> {
            stage: stages[index],
            pouringTechnique: PouringTechnique.CIRCLE,
            durationInSeconds: stepsDurationInSeconds[index],
            pourParameters: { waterPercentage: stepsWaterPercentages[index], waterTemp: waterTemp}
        });
    });

    console.log('calculateMethod46Steps stepConfigs', stepConfigs);

    return stepConfigs;
}