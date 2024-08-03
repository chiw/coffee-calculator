import { CoffeeRecipe } from "../../CoffeeRecipe";
import { CoffeeRecipeId } from "../../CoffeeRecipeConstants";
import { createCoffeeParams } from "../../CoffeeRecipesFactory";
import type { Reference } from "../../Reference.type";

export class HarioSwitchOleKristianBoenCoffeeRecipe extends CoffeeRecipe {
    
    constructor() {
        super(CoffeeRecipeId.HarioSwitch_OleKristianBoen, createCoffeeParams(CoffeeRecipeId.HarioSwitch_OleKristianBoen, 16.5, -1, 240));
    }

    references: Reference[] = [
        { description : "Ole Kristian Bøen's Hario Switch Recipe", url: 'https://www.hario-europe.com/blogs/hario-community/ole-kristian-boens-switch-recipe' }
    ];
}