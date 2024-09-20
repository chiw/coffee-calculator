import type { CoffeeRecipeId } from "./CoffeeRecipeConstants";
import type { PourParam } from "./PourParam.type";
import type { CoffeeParams } from "./CoffeeParams";
import { displayNumber } from "$lib/utils/NumberDisplayUtils";
import { toHHMMSS } from "$lib/utils/TimeUtils";
import type { StepWaterInfo } from "./StepWaterInfo.type";
import { calculatePourWaterInGrams } from "./CoffeeRecipeUtils";
export abstract class CoffeeRecipeSteps {

    public coffeeRecipeId: CoffeeRecipeId;
    
    public coffeeParams: CoffeeParams;

    public pourParams: PourParam[] = [];

    public steps: string[] = [];
    public stepsDurationInSeconds: number[] = [];
    public stepsTimeframe: number[][] = [];
    public stepsTimeframeDisplay: string[][] = [];
    
    public stepWaterInfos: StepWaterInfo[] = [];
    
    public isTimerRecipe: boolean = false;
    public isImmersionDripperRecipe: boolean = false;
    public timerInSeconds = 0;

    constructor(coffeeRecipeId: CoffeeRecipeId, coffeeParams: CoffeeParams, stepsDurationInSeconds: number[], pourParams: PourParam[], steps, isTimerRecipe: boolean = false, isImmersionDripperRecipe: boolean = false) {
        this.isTimerRecipe = isTimerRecipe;
        this.isImmersionDripperRecipe = isImmersionDripperRecipe;
        this.stepsDurationInSeconds = stepsDurationInSeconds;
        this.coffeeRecipeId = coffeeRecipeId;
        this.coffeeParams = coffeeParams;
        this.pourParams = pourParams;
        this.steps = steps;
        this.timerInSeconds = this.sumOfDurations(stepsDurationInSeconds);
        this.calculateStepsTimeframe();
        this.calculateStepWaterInfos();
    }

    numDisplay = (number: number) => displayNumber(number);

    calculateStepsTimeframe = () => {
        let from: number = 0;
        this.stepsDurationInSeconds.map(duration => {
            let timeframe = this.calculateTimeframes(from, duration);
            this.stepsTimeframe.push(timeframe);
            from = timeframe[1];

            let stepTimeDisplay = [toHHMMSS(timeframe[0]), toHHMMSS(timeframe[1])];
            this.stepsTimeframeDisplay.push(stepTimeDisplay);
        })
    }

    calculateTimeframes = (from: number, duration: number) : number[] => {
        return [from, from + duration];
    }

    sumOfDurations = (durations: number[]) => durations.reduce((a, b) => a + b, 0);

    calculateStepWaterInfos = () => {
        let totalWaterInGrams = 0;
        this.pourParams.map(pourParam => {
            let stepWaterInGrams = calculatePourWaterInGrams(this.coffeeParams.waterInGrams, pourParam);
            let stepTotalWaterInGrams = totalWaterInGrams === 0 ? 0 : (stepWaterInGrams + totalWaterInGrams);

            let stepWaterInfo = this.createStepWaterInfo(stepWaterInGrams, stepTotalWaterInGrams, pourParam.waterTemp);
            console.log('calculateStepWaterInfos push stepWaterInfo ', stepWaterInfo);
            this.stepWaterInfos.push(stepWaterInfo);
            totalWaterInGrams +=  stepWaterInGrams;
        })
        console.log('calculateStepWaterInfos stepWaterInfos ', this.stepWaterInfos);
    }

    createStepWaterInfo = (waterInGrams: number, totalWaterInGrams: number, waterTemperature: number) => {
        return {
            waterInGrams: this.numDisplay(waterInGrams),
            totalWaterInGrams: this.numDisplay(totalWaterInGrams),
            showTotalWaterInGrams: totalWaterInGrams > 0 ? true : false,
            waterTemperature: waterTemperature
        } as StepWaterInfo;
    }

}