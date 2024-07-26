import { CoffeeRecipeId } from "./CoffeeRecipeConstants";
import { CoffeeRecipe } from "./CoffeeRecipe";
import { HarioSwitchEmiFukahoriCoffeeRecipe } from "./HarioSwitchEmiFukahoriCoffeeRecipe";
import { HarioSwitchTetsuKasuyaCoffeeRecipe } from "./HarioSwitchTetsuKasuyaCoffeeRecipe";

export const createCoffeeRecipe = (recipeId: CoffeeRecipeId): CoffeeRecipe => {
    console.log('createCoffeeRecipe recipeId: ', recipeId);

    switch(recipeId) {
        case CoffeeRecipeId.HarioSwitch_TetsuKasuya : {            
            return new HarioSwitchTetsuKasuyaCoffeeRecipe();
        };
        case CoffeeRecipeId.HarioSwitch_EmiFukahori : {            
            return new HarioSwitchEmiFukahoriCoffeeRecipe(); 
        };
        default:
            return new HarioSwitchTetsuKasuyaCoffeeRecipe();
    }
}