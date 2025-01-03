import { CoffeeRecipeId } from "$lib/coffee-recipes";
import { getCoffeeRecipeDefaultConfig } from "$lib/coffee-recipes/CoffeeRecipeConstants";
import { createCoffeeRecipe, createCoffeeRecipeSteps } from "$lib/coffee-recipes/CoffeeRecipesFactory";
import type { CoffeeParametersConfig, CoffeeRecipe, CoffeeRecipeSteps, StepConfig } from "$lib/coffee-recipes/CoffeeRecipeTypes";

import { getContext, setContext } from "svelte";

export function createCoffeeRecipeRunes(defaultCoffeeRecipeId: CoffeeRecipeId) {

    let _recipeId: CoffeeRecipeId = $state(defaultCoffeeRecipeId);

    let _coffeeRecipe: CoffeeRecipe = $derived(createCoffeeRecipe(_recipeId));

    let _coffeeParams: CoffeeParametersConfig = $state(_coffeeRecipe.defaultCoffeeParams);

    let _stepsConfig: StepConfig[] = $state(getCoffeeRecipeDefaultConfig(defaultCoffeeRecipeId).steps);

    $effect(() => {
        console.log('in $effect');
        _coffeeParams = _coffeeRecipe.defaultCoffeeParams;
        _stepsConfig = _coffeeRecipe.defaultSteps;
    });

    let _coffeeRecipeSteps: CoffeeRecipeSteps = $derived(createCoffeeRecipeSteps(_recipeId, _coffeeParams, _stepsConfig));

    $inspect(_recipeId, _coffeeRecipe, _coffeeParams, _coffeeRecipeSteps);

    return {
        get recipeId() { return _recipeId; },
        set recipeId(value) { _recipeId = value; },

        get coffeeRecipe() { return _coffeeRecipe; },
        get coffeeRecipeSteps() { return _coffeeRecipeSteps; },

        get coffeeParams() { return _coffeeParams; },
        set coffeeParams(value) { _coffeeParams = value; },
        
        get stepsConfig() { return _stepsConfig; },
        set stepsConfig(value) { _stepsConfig = value; }
    }
}

const COFFEE_RECIPE_RUNES_CONTEXT_KEY = Symbol('COFFEE_RECIPE_RUNES_CONTEXT_KEY');

export const setCoffeeRecipeRunes = () => {    
    return setContext(COFFEE_RECIPE_RUNES_CONTEXT_KEY, createCoffeeRecipeRunes(CoffeeRecipeId.hario_switch_tetsukasuya));
}

export const getCoffeeRecipeRunes = () => {
    return getContext<ReturnType<typeof setCoffeeRecipeRunes>>(COFFEE_RECIPE_RUNES_CONTEXT_KEY);
}