import * as m from '$lib/paraglide/messages.js';
import type { CoffeeParams } from '../../CoffeeParams';
import { CoffeeRecipeId } from '../../CoffeeRecipeConstants';
import { CoffeeReipeSteps } from '../../CoffeeRecipeSteps';
import { calculatePourWaterInGrams } from '../../CoffeeRecipeUtils';
import type { PourParam } from '../../PourParam.type';

export class HarioSwitchCoffeeChroniclerCoffeeRecipeSteps extends CoffeeReipeSteps {
    
    constructor(coffeeParams: CoffeeParams) {
        super(CoffeeRecipeId.HarioSwitch_CoffeeChronicler, coffeeParams, [25, 95, 75]);
        console.log('HarioSwitchCoffeeChroniclerCoffeeRecipeSteps constructor coffeeRecipeId: ', this.coffeeRecipeId, ' coffeeParams: ', this.coffeeParams);
    }

    isTimerRecipe: boolean = true;

    pourParams: PourParam[] = [
        { waterPercentage: 50, waterTemp: 93},
        { waterPercentage: 50, waterTemp: 93}
    ];

    firstPourWaterInGrams = calculatePourWaterInGrams(this.coffeeParams.waterInGrams, this.pourParams[0]);
    secondPourWaterInGrams = calculatePourWaterInGrams(this.coffeeParams.waterInGrams, this.pourParams[1]);
    secondPourTotal = this.coffeeParams.waterInGrams;

    steps = [
        { 
            msgKey: m.label_hario_switch_coffee_chronicler_step_01, 
            params: {firstPourWaterInGrams:  this.numDisplay(this.firstPourWaterInGrams)}
        },
        {
            msgKey: m.label_hario_switch_coffee_chronicler_step_02,
            params: {secondPourWaterInGrams: this.numDisplay(this.secondPourWaterInGrams), secondPourTotal: this.numDisplay(this.secondPourTotal) }
        },
        {
            msgKey: m.label_hario_switch_coffee_chronicler_step_03,
            params: {}
        }
    ];
}