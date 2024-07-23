import { CoffeeRecipe } from "./CoffeeRecipe";
import type { Reference } from "./reference.type";
import * as m from '$lib/paraglide/messages.js';

export class HarioSwitchTetsuKasuyaCoffeeRecipe extends CoffeeRecipe {
    firstPourTemp = 90;
    firstPourPercentage: number = 21.4285;
    firstPourInGrams = Math.round(this.waterInGrams * this.firstPourPercentage / 100);
    
    secondPourTemp = 90;
    secondPourPercentage: number = 21.4285;
    secondPourInGrams = Math.round(this.waterInGrams * this.secondPourPercentage / 100);
    secondPourTotal = this.firstPourInGrams + this.secondPourInGrams;
    
    thirdPourTemp = 70;
    thirdPourInGrams: number = this.waterInGrams - this.firstPourInGrams - this.secondPourInGrams;    

    constructor(beanInGrams: number, coffeeToWaterRatio: number, waterInGrams: number) {
        super('harioSwitch_TetsuKasuya', beanInGrams, coffeeToWaterRatio, waterInGrams);
    }

    get steps(): string[] {
        return [
            m.label_hario_switch_tetsu_kasuya_step_01( {firstPourInGrams: this.firstPourInGrams, firstPourTemp: this.firstPourTemp }),
            m.label_hario_switch_tetsu_kasuya_step_02( {secondPourInGrams: this.secondPourInGrams, secondPourTotal: this.secondPourTotal, secondPourTemp: this.firstPourTemp }),
            m.label_hario_switch_tetsu_kasuya_step_03( {thirdPourInGrams: this.thirdPourInGrams, thirdPourTotal: this.waterInGrams, thirdPourTemp: this.firstPourTemp }),
            m.label_hario_switch_tetsu_kasuya_step_04(),            
        ]
    }

    get references(): Reference[] {
        return [
            { description : 'Is it the God Recipe, or the Devil Recipe? ｜ The Ultimate Switch Recipe Ever!! - Tetsu Kasuya', url: 'https://www.youtube.com/watch?v=gC8K40kZ_6E' }
        ];
    }
}