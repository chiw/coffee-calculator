import { CoffeeRecipe } from "./CoffeeRecipe";
import type { Reference } from "./Reference.type";
import * as m from '$lib/paraglide/messages.js';

export class HarioSwitchEmiFukahoriCoffeeRecipe extends CoffeeRecipe {
    firstPourPercentage: number = 25;
    firstPourWaterInGrams: number = Math.round(this.waterInGrams * this.firstPourPercentage / 100);

    secondPourPercentage: number = 75;
    secondPourWaterInGrams: number = Math.round(this.waterInGrams * this.secondPourPercentage / 100);

    constructor() {
        super('harioSwitch_EmiFukahori');
    }

    get defaultParameters() {
        return {
            defaultBeanInGrams : 14,
            defaultWaterInGrams: 200,
            defaultCoffeeToWaterRatio: -1
        }
    }

    get steps(): string[] {
        return [
            m.label_hario_switch_emi_fukahori_step_01( {firstPourWaterInGrams: this.firstPourWaterInGrams }),
            m.label_hario_switch_emi_fukahori_step_02( {secondPourWaterInGrams: this.secondPourWaterInGrams }),
            m.label_hario_switch_emi_fukahori_step_03()
        ]
    }

    get stepsTimeframe(): number[][] {
        return [
            [0, 30], 
            [30, 70], 
            [70, 140]
        ];
    }

    get references(): Reference[] {
        return [
            { description : 'Easy Hario Switch Recipe from Emi Fukahori (World Brewers Cup Champion)', url: 'https://europeancoffeetrip.com/easy-hario-switch-recipe-emi-fukahor/' }
        ];
    }

    get isTimerRecipe(): boolean {
        return true;
    }

    get timerInSeconds() : number {
        return 140;
    }
}