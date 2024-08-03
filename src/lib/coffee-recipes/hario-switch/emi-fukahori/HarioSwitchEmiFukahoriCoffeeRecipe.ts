import { CoffeeRecipe } from "../../CoffeeRecipe";
import { CoffeeRecipeId } from "../../CoffeeRecipeConstants";
import { createCoffeeParams } from "../../CoffeeRecipesFactory";
import type { Reference } from "../../Reference.type";

export class HarioSwitchEmiFukahoriCoffeeRecipe extends CoffeeRecipe {
    
    constructor() {
        super(CoffeeRecipeId.HarioSwitch_EmiFukahori, createCoffeeParams(CoffeeRecipeId.HarioSwitch_EmiFukahori, 14, -1, 200));
    }

    references: Reference[] = [
        { description : 'Easy Hario Switch Recipe from Emi Fukahori (World Brewers Cup Champion)', url: 'https://europeancoffeetrip.com/easy-hario-switch-recipe-emi-fukahor/' }
    ];
}