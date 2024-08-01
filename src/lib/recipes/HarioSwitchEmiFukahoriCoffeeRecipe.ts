import { CoffeeRecipe } from "./CoffeeRecipe";
import type { Reference } from "./Reference.type";
import * as m from '$lib/paraglide/messages.js';

import { CoffeeRecipeId } from "./CoffeeRecipeConstants";
import { HarioSwitchEmiFukahoriCoffeeRecipeSteps } from "./HarioSwitchEmiFukahoriCoffeeRecipeSteps";
import { CoffeeReipeSteps } from "./CoffeeRecipeSteps";

export class HarioSwitchEmiFukahoriCoffeeRecipe extends CoffeeRecipe {
    
    constructor() {
        super(CoffeeRecipeId.HarioSwitch_EmiFukahori);
    }

    get defaultParameters() {
        return {
            defaultBeanInGrams : 14,
            defaultWaterInGrams: 200,
            defaultCoffeeToWaterRatio: -1
        }
    }
    
    references: Reference[] = [
        { description : 'Easy Hario Switch Recipe from Emi Fukahori (World Brewers Cup Champion)', url: 'https://europeancoffeetrip.com/easy-hario-switch-recipe-emi-fukahor/' }
    ];
}