import type { CoffeeRecipe } from "$lib/recipes/CoffeeRecipe";
import { CoffeeRecipeId } from "$lib/recipes/CoffeeRecipeConstants";
import { createCoffeeRecipe } from "$lib/recipes/CoffeeRecipesFactory";

export function createCoffeeRecipeStore() {

    let _recipeId: CoffeeRecipeId = $state(CoffeeRecipeId.HarioSwitch_TetsuKasuya);

    let _coffeeRecipe = $derived.by(() => createCoffeeRecipe(_recipeId));

    $inspect(_recipeId, _coffeeRecipe);

    return {
        get recipeId() { return _recipeId; },
        set recipeId(value) { _recipeId = value; },

        get coffeeRecipe() { return _coffeeRecipe; }
    }
}