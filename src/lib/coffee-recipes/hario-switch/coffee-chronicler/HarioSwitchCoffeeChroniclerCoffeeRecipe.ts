import { CoffeeRecipe } from "../../CoffeeRecipe";
import { CoffeeRecipeId } from "../../CoffeeRecipeConstants";
import { createCoffeeParams } from "../../CoffeeRecipesFactory";
import type { Reference } from "../../Reference.type";

export class HarioSwitchCoffeeChroniclerCoffeeRecipe extends CoffeeRecipe {
    
    constructor() {
        super(CoffeeRecipeId.HarioSwitch_CoffeeChronicler, createCoffeeParams(CoffeeRecipeId.HarioSwitch_CoffeeChronicler, 20, 16, -1));
    }

    references: Reference[] = [
        { description : 'Hario Switch Review: The Hybrid Brewer You Need to Try', url: 'https://coffeechronicler.com/hario-switch/' },
        { description : '(YouTube) The ultimate Hario Switch RECIPE: A consistent cup that will blow your mind', url: 'https://www.youtube.com/watch?v=68ZOXrXbVHc' }
    ];
}