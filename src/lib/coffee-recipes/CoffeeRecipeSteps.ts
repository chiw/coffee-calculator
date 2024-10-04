import type { CoffeeRecipeId } from "./CoffeeRecipeConstants";
import type { CoffeeParameters } from "./CoffeeParameters";
import { displayNumber } from "$lib/utils/NumberDisplayUtils";
import { calculateStepsTimeframe } from "$lib/utils/TimeUtils";
import { calculatePourWaterInGrams } from "./CoffeeRecipeUtils";
import type { PourParametersConfig, StepConfig, StepWaterInfo, Timeframe } from "./CoffeeRecipeTypes";
export abstract class CoffeeRecipeSteps {

    public coffeeRecipeId: CoffeeRecipeId;
    
    public coffeeParameters: CoffeeParameters;

    public pourParameters: PourParametersConfig[] = [];

    public steps: StepConfig[] = [];
    public stepsDurationInSeconds: number[] = [];
    
    public stepsTimeframe: Timeframe[] = [];
        
    public stepWaterInfos: StepWaterInfo[] = [];
    
    public isTimerRecipe: boolean = false;
    public isImmersionDripperRecipe: boolean = false;
    public timerInSeconds = 0;

    constructor(
        coffeeRecipeId: CoffeeRecipeId, coffeeParams: CoffeeParameters, stepsDurationInSeconds: number[], 
        pourParameters: PourParametersConfig[], steps: StepConfig[], isTimerRecipe: boolean = false, 
        isImmersionDripperRecipe: boolean = false) {

        this.isTimerRecipe = isTimerRecipe;
        this.isImmersionDripperRecipe = isImmersionDripperRecipe;
        this.stepsDurationInSeconds = stepsDurationInSeconds;
        this.coffeeRecipeId = coffeeRecipeId;
        this.coffeeParameters = coffeeParams;
        this.pourParameters = pourParameters;
        this.steps = steps;
        this.timerInSeconds = this.sumOfDurations(stepsDurationInSeconds);
        this.stepsTimeframe = calculateStepsTimeframe(stepsDurationInSeconds);
        this.calculateStepWaterInfos();
    }

    numDisplay = (number: number) => displayNumber(number);

    sumOfDurations = (durations: number[]) => durations.reduce((a, b) => a + b, 0);

    calculateStepWaterInfos = () => {
        let totalWaterInGrams = 0;
        this.pourParameters.map(pourParam => {
            let stepWaterInGrams = calculatePourWaterInGrams(this.coffeeParameters.waterInGrams, pourParam);
            let stepTotalWaterInGrams = totalWaterInGrams === 0 ? 0 : (stepWaterInGrams + totalWaterInGrams);

            let stepWaterInfo = this.createStepWaterInfo(stepWaterInGrams, stepTotalWaterInGrams, pourParam.waterTemp);
            // console.log('calculateStepWaterInfos push stepWaterInfo ', stepWaterInfo);
            this.stepWaterInfos.push(stepWaterInfo);
            totalWaterInGrams +=  stepWaterInGrams;
        })
        // console.log('calculateStepWaterInfos stepWaterInfos ', this.stepWaterInfos);
    }

    createStepWaterInfo = (waterInGrams: number, totalWaterInGrams: number, waterTemperature: number) => {
        console.log('createStepWaterInfo ', waterInGrams, totalWaterInGrams, waterTemperature);

        return {
            waterInGrams: this.numDisplay(waterInGrams),
            totalWaterInGrams: this.numDisplay(totalWaterInGrams),
            showTotalWaterInGrams: totalWaterInGrams > 0 ? true : false,
            waterTemperature: waterTemperature
        } as StepWaterInfo;
    }

}