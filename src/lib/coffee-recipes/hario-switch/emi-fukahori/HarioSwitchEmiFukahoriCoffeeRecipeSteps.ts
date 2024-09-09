import { SwitchState } from '$lib/coffee-recipes/SwitchState';
import * as m from '$lib/paraglide/messages.js';
import type { CoffeeParams } from '../../CoffeeParams';
import { CoffeeRecipeId } from '../../CoffeeRecipeConstants';
import { CoffeeReipeSteps } from '../../CoffeeRecipeSteps';
import { calculatePourWaterInGrams } from '../../CoffeeRecipeUtils';
import type { PourParam } from '../../PourParam.type';

export class HarioSwitchEmiFukahoriCoffeeRecipeSteps extends CoffeeReipeSteps {
    
    constructor(coffeeParams: CoffeeParams, stepsDurationInSeconds: number[]) {
        super(CoffeeRecipeId.HarioSwitch_EmiFukahori, coffeeParams, stepsDurationInSeconds ? stepsDurationInSeconds : [30, 40, 70]);
        console.log('HarioSwitchEmiFukahoriCoffeeRecipeSteps constructor coffeeRecipeId: ', this.coffeeRecipeId, ' coffeeParams: ', this.coffeeParams, 'stepsDurationInSeconds', this.stepsDurationInSeconds);
    }

    isTimerRecipe: boolean = true;

    pourParams: PourParam[] = [
        { waterPercentage: 25, waterTemp: 93},
        { waterPercentage: 75, waterTemp: 93}
    ];

    firstPourWaterInGrams = calculatePourWaterInGrams(this.coffeeParams.waterInGrams, this.pourParams[0]);
    secondPourWaterInGrams = calculatePourWaterInGrams(this.coffeeParams.waterInGrams, this.pourParams[1]);
    secondPourTotal = this.coffeeParams.waterInGrams;

    steps = [
        {
            switchState: SwitchState.CLOSED, 
            msgKey: m.label_hario_switch_emi_fukahori_step_01, 
            params: {firstPourWaterInGrams:  this.numDisplay((this.firstPourWaterInGrams)) }
        },
        {
            switchState: SwitchState.OPEN,
            msgKey: m.label_hario_switch_emi_fukahori_step_02,
            params: {secondPourWaterInGrams: this.numDisplay(this.secondPourWaterInGrams), secondPourTotal: this.numDisplay(this.secondPourTotal) }
        },
        {
            switchState: SwitchState.OPEN,
            msgKey: m.label_hario_switch_emi_fukahori_step_03,
            params: {}
        }
    ];
}