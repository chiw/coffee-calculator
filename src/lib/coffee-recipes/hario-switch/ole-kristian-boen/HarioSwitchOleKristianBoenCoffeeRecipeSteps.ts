import * as m from '$lib/paraglide/messages.js';
import type { CoffeeParams } from '../../CoffeeParams';
import { CoffeeRecipeId } from '../../CoffeeRecipeConstants';
import { CoffeeReipeSteps } from '../../CoffeeRecipeSteps';
import { calculatePourWaterInGrams } from '../../CoffeeRecipeUtils';
import type { PourParam } from '../../PourParam.type';

export class HarioSwitchOleKristianBoenCoffeeRecipeSteps extends CoffeeReipeSteps {
    
    constructor(coffeeParams: CoffeeParams) {
        super(CoffeeRecipeId.HarioSwitch_OleKristianBoen, coffeeParams);
        console.log('HarioSwitchOleKristianBoenCoffeeRecipeSteps constructor coffeeRecipeId: ', this.coffeeRecipeId, ' coffeeParams: ', this.coffeeParams);
    }

    isTimerRecipe: boolean = true;
    timerInSeconds: number = 140;

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

    steps: string[] = [
        m.label_hario_switch_ole_kristian_boen_step_01( {firstPourWaterInGrams:  this.firstPourWaterInGrams, firstPourTemp: this.pourParams[0].waterTemp }),
        m.label_hario_switch_ole_kristian_boen_step_02( {secondPourWaterInGrams: this.secondPourWaterInGrams, secondPourTotal: this.secondPourTotal }),
        m.label_hario_switch_ole_kristian_boen_step_03( {thirdPourWaterInGrams: this.thirdPourWaterInGrams, thirdPourTotal: this.thirdPourTotal}),
        m.label_hario_switch_ole_kristian_boen_step_04()
    ];

    stepsTimeframe: number[][] = [
        [0, 40], 
        [40, 90], 
        [90, 130],
        [130, 195]
    ];
}