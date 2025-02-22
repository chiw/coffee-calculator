import { CoffeeRecipeId } from "$lib/coffee-recipes";
import { createCoffeeRecipe, createCoffeeRecipeStepsWithChangeFactors } from "$lib/coffee-recipes/CoffeeRecipesFactory";
import type { CoffeeRecipe, CoffeeRecipeSteps, RecipeChangeFactors } from "$lib/coffee-recipes/CoffeeRecipeTypes";

import { getContext, setContext } from "svelte";

import { getSeoRunes } from "../seo/SeoRunes.svelte";

export function createCoffeeRecipeRunes(defaultCoffeeRecipeId: CoffeeRecipeId) {

    let _recipeId: CoffeeRecipeId = $state(defaultCoffeeRecipeId);

    let _coffeeRecipe: CoffeeRecipe = $derived(createCoffeeRecipe(_recipeId));

    let _recipeChangeFactors: RecipeChangeFactors = $state(_coffeeRecipe.defaultRecipeChangeFactors);

    $effect(() => {
        // console.log('in $effect');
        $inspect.trace();
        _recipeChangeFactors = _coffeeRecipe.defaultRecipeChangeFactors;
        if(_coffeeRecipe) {
            getSeoRunes().updateSeo(_coffeeRecipe.seoData);
        }
    });

    let _coffeeRecipeSteps: CoffeeRecipeSteps = $derived(createCoffeeRecipeStepsWithChangeFactors(_recipeId, _recipeChangeFactors, _coffeeRecipe));

    $inspect(_recipeId, _coffeeRecipe, _recipeChangeFactors).with(console.trace);

    return {
        get recipeId() { return _recipeId; },
        set recipeId(value) { _recipeId = value; },

        get coffeeRecipe() { return _coffeeRecipe; },
        get coffeeRecipeSteps() { return _coffeeRecipeSteps; },

        get recipeChangeFactors() { return _recipeChangeFactors},
        set recipeChangeFactors(value) { _recipeChangeFactors = value}
    }
}

const COFFEE_RECIPE_RUNES_CONTEXT_KEY = Symbol('COFFEE_RECIPE_RUNES_CONTEXT_KEY');

export const setCoffeeRecipeRunes = () => {    
    return setContext(COFFEE_RECIPE_RUNES_CONTEXT_KEY, createCoffeeRecipeRunes(CoffeeRecipeId.hario_switch_tetsukasuyanewhybrid));
}

export const getCoffeeRecipeRunes = () => {
    return getContext<ReturnType<typeof setCoffeeRecipeRunes>>(COFFEE_RECIPE_RUNES_CONTEXT_KEY);
}