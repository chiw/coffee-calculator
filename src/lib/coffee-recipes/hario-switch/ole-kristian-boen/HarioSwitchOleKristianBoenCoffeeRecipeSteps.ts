import { PouringTechnique } from '$lib/coffee-recipes/PouringTechnique';
import { PourOverStage } from '$lib/coffee-recipes/PourOverStage';
import { SwitchState } from '$lib/coffee-recipes/SwitchState';
import * as m from '$lib/paraglide/messages.js';
import type { CoffeeParams } from '../../CoffeeParams';
import { CoffeeRecipeId } from '../../CoffeeRecipeConstants';
import { CoffeeReipeSteps } from '../../CoffeeRecipeSteps';
import { calculatePourWaterInGrams } from '../../CoffeeRecipeUtils';
import type { PourParam } from '../../PourParam.type';

export class HarioSwitchOleKristianBoenCoffeeRecipeSteps extends CoffeeReipeSteps {
    
    constructor(coffeeParams: CoffeeParams, stepsDurationInSeconds: number[]) {
        super(CoffeeRecipeId.HarioSwitch_OleKristianBoen, coffeeParams, stepsDurationInSeconds ? stepsDurationInSeconds : [40, 50, 40, 65]);
        console.log('HarioSwitchOleKristianBoenCoffeeRecipeSteps constructor coffeeRecipeId: ', this.coffeeRecipeId, ' coffeeParams: ', this.coffeeParams, 'stepsDurationInSeconds', this.stepsDurationInSeconds);
    }

    isTimerRecipe: boolean = true;
    isImmersionDripperRecipe: boolean = true;

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
            stage: PourOverStage.BLOOMING,
            waterTemperature: this.pourParams[0].waterTemp,
            msgKey: m.label_step_msg_water_volume, 
            params: {waterInGrams:  this.numDisplay(this.firstPourWaterInGrams) }
        },
        {
            switchState: SwitchState.OPEN,
            stage: PourOverStage.FIRST_POUR,
            pouringTechnique: PouringTechnique.CENTER,
            msgKey: m.label_step_msg_water_volume_with_total,
            params: {waterInGrams: this.numDisplay(this.secondPourWaterInGrams), totalWaterInGrams: this.numDisplay(this.secondPourTotal) }
        },
        {
            switchState: SwitchState.CLOSED,
            stage: PourOverStage.SECOND_POUR,
            pouringTechnique: PouringTechnique.CIRCLE,
            msgKey: m.label_step_msg_water_volume_with_total,
            params: {waterInGrams: this.numDisplay(this.thirdPourWaterInGrams), totalWaterInGrams: this.numDisplay(this.thirdPourTotal)}
        },
        {
            switchState: SwitchState.OPEN,
            stage: PourOverStage.FINAL,
            msgKey: m.label_step_msg_let_water_flow_until,
            params: {time: this.stepsTimeframeDisplay[3][1]}
        }
    ]
}