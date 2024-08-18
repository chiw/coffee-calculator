import * as m from '$lib/paraglide/messages.js';
import type { CoffeeParams } from '../../CoffeeParams';
import { CoffeeRecipeId } from '../../CoffeeRecipeConstants';
import { CoffeeReipeSteps } from '../../CoffeeRecipeSteps';
import { calculatePourWaterInGrams } from '../../CoffeeRecipeUtils';
import type { PourParam } from '../../PourParam.type';

export class HarioSwitchCoffeeChroniclerCoffeeRecipeSteps extends CoffeeReipeSteps {
    
    constructor(coffeeParams: CoffeeParams) {
        super(CoffeeRecipeId.HarioSwitch_CoffeeChronicler, coffeeParams);
        console.log('HarioSwitchCoffeeChroniclerCoffeeRecipeSteps constructor coffeeRecipeId: ', this.coffeeRecipeId, ' coffeeParams: ', this.coffeeParams);
    }

    isTimerRecipe: boolean = true;
    timerInSeconds: number = 140;

    pourParams: PourParam[] = [
        { waterPercentage: 50, waterTemp: 93},
        { waterPercentage: 50, waterTemp: 93}
    ];

    firstPourWaterInGrams: number = calculatePourWaterInGrams(this.coffeeParams.waterInGrams, this.pourParams[0]);
    secondPourWaterInGrams: number = calculatePourWaterInGrams(this.coffeeParams.waterInGrams, this.pourParams[1]);
    secondPourTotal: number = this.coffeeParams.waterInGrams;

    steps: string[] = [
        m.label_hario_switch_coffee_chronicler_step_01( {firstPourWaterInGrams:  this.firstPourWaterInGrams }),
        m.label_hario_switch_coffee_chronicler_step_02( {secondPourWaterInGrams: this.secondPourWaterInGrams, secondPourTotal: this.secondPourTotal }),
        m.label_hario_switch_coffee_chronicler_step_03()
    ];

    stepsTimeframe: number[][] = [
        [0, 25], 
        [25, 120], 
        [120, 195]
    ];

    public stepsTimeframeDisplay: string[][] = [
        ['0:00', '0:25'],
        ['0:25', '2:00'],
        ['2:00', '3:15']
    ];
}