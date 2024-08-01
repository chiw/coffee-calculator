import { CoffeeRecipe } from "./CoffeeRecipe";
import type { Reference } from "./Reference.type";
import * as m from '$lib/paraglide/messages.js';
import { CoffeeRecipeId } from "./CoffeeRecipeConstants";
import { HarioSwitchTetsuKasuyaCoffeeRecipeSteps } from "./HarioSwitchTetsuKasuyaCoffeeRecipeSteps";
import type { CoffeeReipeSteps } from "./CoffeeRecipeSteps";

export class HarioSwitchTetsuKasuyaCoffeeRecipe extends CoffeeRecipe {
    
    constructor() {
        super(CoffeeRecipeId.HarioSwitch_TetsuKasuya);
    }

    get defaultParameters() {
        return {
            defaultBeanInGrams : 20,
            defaultWaterInGrams: 280,
            defaultCoffeeToWaterRatio: -1
        }
    }

    references: Reference[] = [
        { description : 'Is it the God Recipe, or the Devil Recipe? ｜ The Ultimate Switch Recipe Ever!! - Tetsu Kasuya', url: 'https://www.youtube.com/watch?v=gC8K40kZ_6E' }
    ];
}