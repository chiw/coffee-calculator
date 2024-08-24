import * as m from '$lib/paraglide/messages.js';
import { CoffeeRecipeId } from '../../CoffeeRecipeConstants';
import { CoffeeParams } from '../../CoffeeParams';
import { CoffeeReipeSteps } from '../../CoffeeRecipeSteps';
import { calculatePourWaterInGrams } from '../../CoffeeRecipeUtils';
import type { PourParam } from '../../PourParam.type';

export class HarioSwitchTetsuKasuyaCoffeeRecipeSteps extends CoffeeReipeSteps {

    constructor(coffeeParams: CoffeeParams) {
        super(CoffeeRecipeId.HarioSwitch_TetsuKasuya, coffeeParams, [30, 45, 30, 75]);
        console.log('HarioSwitchTetsuKasuyaCoffeeRecipeSteps constructor coffeeRecipeId: ', this.coffeeRecipeId, ' coffeeParams: ', this.coffeeParams);
    }

    isTimerRecipe: boolean = true;
    timerInSeconds: number = 180;

    pourParams: PourParam[] = [
        { waterPercentage: 21.4285, waterTemp: 93},
        { waterPercentage: 21.4285, waterTemp: 93},
        { waterPercentage: 100 - (21.4285 * 2), waterTemp: 70}
    ];

    firstPourInGrams: number = calculatePourWaterInGrams(this.coffeeParams.waterInGrams, this.pourParams[0]);
    secondPourInGrams: number = calculatePourWaterInGrams(this.coffeeParams.waterInGrams, this.pourParams[1]);
    secondPourTotal = this.firstPourInGrams + this.secondPourInGrams;
    thirdPourInGrams: number = this.coffeeParams.waterInGrams - this.firstPourInGrams - this.secondPourInGrams;

    steps: string[] = [
        m.label_hario_switch_tetsu_kasuya_step_01( {firstPourInGrams: this.numDisplay(this.firstPourInGrams), firstPourTemp: this.pourParams[0].waterTemp }),
        m.label_hario_switch_tetsu_kasuya_step_02( {secondPourInGrams: this.numDisplay(this.secondPourInGrams), secondPourTotal: this.numDisplay(this.secondPourTotal), secondPourTemp: this.pourParams[1].waterTemp }),
        m.label_hario_switch_tetsu_kasuya_step_03( {thirdPourInGrams: this.thirdPourInGrams, thirdPourTotal: this.numDisplay(this.coffeeParams.waterInGrams), thirdPourTemp: this.pourParams[2].waterTemp }),
        m.label_hario_switch_tetsu_kasuya_step_04()
    ];
}