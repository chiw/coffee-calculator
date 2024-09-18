import type { CoffeeRecipeId } from "./CoffeeRecipeConstants";
import type { PourParam } from "./PourParam.type";
import type { CoffeeParams } from "./CoffeeParams";
import { displayNumber } from "$lib/utils/NumberDisplayUtils";
import { toHHMMSS } from "$lib/utils/TimeUtils";
export abstract class CoffeeReipeSteps {

    public coffeeRecipeId: CoffeeRecipeId;
    
    public coffeeParams: CoffeeParams;

    public pourParams: PourParam[] = [];

    public _steps: string[] = [];
    public stepsDurationInSeconds: number[] = [];
    public stepsTimeframe: number[][] = [];
    public stepsTimeframeDisplay: string[][] = [];
    public isTimerRecipe: boolean = false;
    public isImmersionDripperRecipe: boolean = false;
    public timerInSeconds = 0;

    constructor(coffeeRecipeId: CoffeeRecipeId, coffeeParams: CoffeeParams, stepsDurationInSeconds: number[]) {
        this.stepsDurationInSeconds = stepsDurationInSeconds;
        this.coffeeRecipeId = coffeeRecipeId;
        this.coffeeParams = coffeeParams;
        this.timerInSeconds = this.sumOfDurations(stepsDurationInSeconds);
        this.calculateStepsTimeframe();
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
}