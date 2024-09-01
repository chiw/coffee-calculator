import { SwitchState } from '$lib/coffee-recipes/SwitchState';
import * as m from '$lib/paraglide/messages.js';
import type { CoffeeParams } from '../../CoffeeParams';
import { CoffeeRecipeId } from '../../CoffeeRecipeConstants';
import { CoffeeReipeSteps } from '../../CoffeeRecipeSteps';
import { calculatePourWaterInGrams } from '../../CoffeeRecipeUtils';
import type { PourParam } from '../../PourParam.type';

export class HarioSwitchOleKristianBoenCoffeeRecipeSteps extends CoffeeReipeSteps {
    
    constructor(coffeeParams: CoffeeParams) {
        super(CoffeeRecipeId.HarioSwitch_OleKristianBoen, coffeeParams, [40, 50, 40, 65]);
        console.log('HarioSwitchOleKristianBoenCoffeeRecipeSteps constructor coffeeRecipeId: ', this.coffeeRecipeId, ' coffeeParams: ', this.coffeeParams);
    }

    isTimerRecipe: boolean = true;

    pourParams: PourParam[] = [
        { waterPercentage: 20.8333, waterTemp: 96},
        { waterPercentage: 41.6667, waterTemp: 96},
        { waterPercentage: 37.5, waterTemp: 96},
    ];

    firstPourWaterInGrams: number = calculatePourWaterInGrams(this.coffeeParams.waterInGrams, this.pourParams[0]);
    secondPourWaterInGrams: number = calculatePourWaterInGrams(this.coffeeParams.waterInGrams, this.pourParams[1]);
    secondPourTotal: number = this.firstPourWaterInGrams + this.secondPourWaterInGrams;
    thirdPourWaterInGrams: number = calculatePourWaterInGrams(this.coffeeParams.waterInGrams, this.pourParams[2]);
    thirdPourTotal: number = this.coffeeParams.waterInGrams;

    steps = [
        {
            switchState: SwitchState.CLOSED,
            msgKey: m.label_hario_switch_ole_kristian_boen_step_01, 
            params: {firstPourWaterInGrams:  this.numDisplay(this.firstPourWaterInGrams), firstPourTemp: this.pourParams[0].waterTemp }
        },
        {
            switchState: SwitchState.OPEN,
            msgKey: m.label_hario_switch_ole_kristian_boen_step_02,
            params: {secondPourWaterInGrams: this.numDisplay(this.secondPourWaterInGrams), secondPourTotal: this.numDisplay(this.secondPourTotal) }
        },
        {
            switchState: SwitchState.CLOSED,
            msgKey: m.label_hario_switch_ole_kristian_boen_step_03,
            params: {thirdPourWaterInGrams: this.numDisplay(this.thirdPourWaterInGrams), thirdPourTotal: this.numDisplay(this.thirdPourTotal)}
        },
        {
            switchState: SwitchState.OPEN,
            msgKey: m.label_hario_switch_ole_kristian_boen_step_04,
            params: {}
        }
    ]
}