import * as m from '$lib/paraglide/messages.js';
import type { CoffeeParams } from '../../CoffeeParams';
import { CoffeeRecipeId } from '../../CoffeeRecipeConstants';
import { CoffeeReipeSteps } from '../../CoffeeRecipeSteps';
import { calculatePourWaterInGrams } from '../../CoffeeRecipeUtils';
import type { PourParam } from '../../PourParam.type';

export class HarioSwitchEmiFukahoriCoffeeRecipeSteps extends CoffeeReipeSteps {
    
    constructor(coffeeParams: CoffeeParams) {
        super(CoffeeRecipeId.HarioSwitch_EmiFukahori, coffeeParams, [30, 40, 70]);
        console.log('HarioSwitchEmiFukahoriCoffeeRecipeSteps constructor coffeeRecipeId: ', this.coffeeRecipeId, ' coffeeParams: ', this.coffeeParams);
    }

    isTimerRecipe: boolean = true;
    timerInSeconds: number = 140;

    pourParams: PourParam[] = [
        { waterPercentage: 25, waterTemp: 93},
        { waterPercentage: 75, waterTemp: 93}
    ];

    firstPourWaterInGrams = calculatePourWaterInGrams(this.coffeeParams.waterInGrams, this.pourParams[0]);
    secondPourWaterInGrams = calculatePourWaterInGrams(this.coffeeParams.waterInGrams, this.pourParams[1]);
    secondPourTotal = this.coffeeParams.waterInGrams;

    steps: string[] = [
        m.label_hario_switch_emi_fukahori_step_01( {firstPourWaterInGrams:  this.numDisplay((this.firstPourWaterInGrams)) }),
        m.label_hario_switch_emi_fukahori_step_02( {secondPourWaterInGrams: this.numDisplay(this.secondPourWaterInGrams), secondPourTotal: this.numDisplay(this.secondPourTotal) }),
        m.label_hario_switch_emi_fukahori_step_03()
    ];
}