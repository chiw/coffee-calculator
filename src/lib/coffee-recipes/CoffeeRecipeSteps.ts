import type { CoffeeRecipeId } from "./CoffeeRecipeConstants";
import type { PourParam } from "./PourParam.type";
import type { CoffeeParams } from "./CoffeeParams";
import { displayNumber } from "$lib/utils/NumberDisplayUtils";
export abstract class CoffeeReipeSteps {

    public coffeeRecipeId: CoffeeRecipeId;
    
    public coffeeParams: CoffeeParams;

    public pourParams: PourParam[] = [];

    public _steps: string[] = [];
    public stepsTimeframe: number[][] = [];
    public stepsTimeframeDisplay: string[][] = [];
    public isTimerRecipe: boolean = false;
    public timerInSeconds = 0;

    constructor(coffeeRecipeId: CoffeeRecipeId, coffeeParams: CoffeeParams) {        
        this.coffeeRecipeId = coffeeRecipeId;
        this.coffeeParams = coffeeParams;
    }

    numDisplay = (number: number) => displayNumber(number);
}