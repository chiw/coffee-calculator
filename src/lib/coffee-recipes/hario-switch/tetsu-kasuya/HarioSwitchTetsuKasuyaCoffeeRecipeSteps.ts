import * as m from '$lib/paraglide/messages.js';
import { CoffeeRecipeId } from '../../CoffeeRecipeConstants';
import { CoffeeParams } from '../../CoffeeParams';
import { CoffeeReipeSteps } from '../../CoffeeRecipeSteps';
import { calculatePourWaterInGrams } from '../../CoffeeRecipeUtils';
import type { PourParam } from '../../PourParam.type';
import { SwitchState } from '$lib/coffee-recipes/SwitchState';
import { PourOverStage } from '$lib/coffee-recipes/PourOverStage';

export class HarioSwitchTetsuKasuyaCoffeeRecipeSteps extends CoffeeReipeSteps {

    constructor(coffeeParams: CoffeeParams, stepsDurationInSeconds: number[]) {
        super(CoffeeRecipeId.HarioSwitch_TetsuKasuya, coffeeParams, stepsDurationInSeconds ? stepsDurationInSeconds : [30, 45, 30, 75]);
        console.log('HarioSwitchTetsuKasuyaCoffeeRecipeSteps constructor coffeeRecipeId: ', this.coffeeRecipeId, ' coffeeParams: ', this.coffeeParams, 'stepsDurationInSeconds', this.stepsDurationInSeconds);
    }

    isTimerRecipe: boolean = true;
    isImmersionDripperRecipe: boolean = true;

    pourParams: PourParam[] = [
        { waterPercentage: 21.4285, waterTemp: 93},
        { waterPercentage: 21.4285, waterTemp: 93},
        { waterPercentage: 100 - (21.4285 * 2), waterTemp: 70}
    ];

    firstPourInGrams: number = calculatePourWaterInGrams(this.coffeeParams.waterInGrams, this.pourParams[0]);
    secondPourInGrams: number = calculatePourWaterInGrams(this.coffeeParams.waterInGrams, this.pourParams[1]);
    secondPourTotal = this.firstPourInGrams + this.secondPourInGrams;
    thirdPourInGrams: number = this.coffeeParams.waterInGrams - this.firstPourInGrams - this.secondPourInGrams;

    steps = [
        {
            switchState: SwitchState.OPEN,
            stage: PourOverStage.BLOOMING,
            waterTemperature: this.pourParams[0].waterTemp,
            msgKey: m.label_step_msg_water_volume, 
            params: {waterInGrams: this.numDisplay(this.firstPourInGrams) }
        },
        {
            switchState: SwitchState.OPEN,
            stage: PourOverStage.FIRST_POUR,
            waterTemperature: this.pourParams[1].waterTemp,
            msgKey: m.label_step_msg_water_volume_with_total,
            params: {waterInGrams: this.numDisplay(this.secondPourInGrams), totalWaterInGrams: this.numDisplay(this.secondPourTotal) }
        },
        {
            switchState: SwitchState.CLOSED,
            stage: PourOverStage.SECOND_POUR,
            waterTemperature: this.pourParams[2].waterTemp,
            msgKey: m.label_step_msg_water_volume_with_total,
            params: {waterInGrams: this.thirdPourInGrams, totalWaterInGrams: this.numDisplay(this.coffeeParams.waterInGrams) }
        },
        {
            switchState: SwitchState.OPEN,
            stage: PourOverStage.FINAL,
            msgKey: m.label_step_msg_let_water_flow_until,
            params: {time: this.stepsTimeframeDisplay[3][1]}
        }
    ]
}