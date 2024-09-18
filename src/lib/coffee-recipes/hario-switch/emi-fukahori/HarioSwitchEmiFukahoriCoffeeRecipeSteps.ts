import { PouringTechnique } from '$lib/coffee-recipes/PouringTechnique';
import { PourOverStage } from '$lib/coffee-recipes/PourOverStage';
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
    isImmersionDripperRecipe: boolean = true;

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
            stage: PourOverStage.BLOOMING,
            msgKey: m.label_step_msg_water_volume, 
            params: {waterInGrams:  this.numDisplay((this.firstPourWaterInGrams)) }
        },
        {
            switchState: SwitchState.OPEN,
            stage: PourOverStage.POURING,
            pouringTechnique: PouringTechnique.CENTER,
            msgKey: m.label_step_msg_water_volume_with_total,
            params: {waterInGrams: this.numDisplay(this.secondPourWaterInGrams), totalWaterInGrams: this.numDisplay(this.secondPourTotal) }
        },
        {
            switchState: SwitchState.OPEN,
            stage: PourOverStage.FINAL,
            msgKey: m.label_step_msg_let_water_flow_until,
            params: {time: this.stepsTimeframeDisplay[2][1]}
        }
    ];
}