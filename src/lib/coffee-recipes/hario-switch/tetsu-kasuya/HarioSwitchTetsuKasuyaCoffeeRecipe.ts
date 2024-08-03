import { CoffeeRecipe } from "../../CoffeeRecipe";
import { CoffeeRecipeId } from "../../CoffeeRecipeConstants";
import { createCoffeeParams } from "../../CoffeeRecipesFactory";
import type { Reference } from "../../Reference.type";

export class HarioSwitchTetsuKasuyaCoffeeRecipe extends CoffeeRecipe {
    
    constructor() {
        super(CoffeeRecipeId.HarioSwitch_TetsuKasuya, createCoffeeParams(CoffeeRecipeId.HarioSwitch_TetsuKasuya, 20, -1, 280));
    }

    references: Reference[] = [
        { description : 'Is it the God Recipe, or the Devil Recipe? ｜ The Ultimate Switch Recipe Ever!! - Tetsu Kasuya', url: 'https://www.youtube.com/watch?v=gC8K40kZ_6E' }
    ];
}