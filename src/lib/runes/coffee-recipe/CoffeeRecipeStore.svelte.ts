import { CoffeeParams } from "$lib/coffee-recipes/CoffeeParams";
import type { CoffeeRecipe } from "$lib/coffee-recipes/CoffeeRecipe";
import { CoffeeRecipeId } from "$lib/coffee-recipes/CoffeeRecipeConstants";
import { createCoffeeParams, createCoffeeRecipe, createCoffeeRecipeSteps } from "$lib/coffee-recipes/CoffeeRecipesFactory";

import { getContext, setContext } from "svelte";

export function createCoffeeRecipeStore(defaultCoffeeRecipeId: CoffeeRecipeId) {

    let _recipeId: CoffeeRecipeId = $state(defaultCoffeeRecipeId);

    let _coffeeRecipe: CoffeeRecipe = $state(createCoffeeRecipe(defaultCoffeeRecipeId));

    let _beanInGrams = $state(_coffeeRecipe.defaultCoffeeParams.beanInGrams);
    let _coffeeToWaterRatio = $state(_coffeeRecipe.defaultCoffeeParams.coffeeToWaterRatio);
    let _waterInGrams = $state(_coffeeRecipe.defaultCoffeeParams.waterInGrams);

    $effect(() => {
        _coffeeRecipe = createCoffeeRecipe(_recipeId);
    });

    $effect(() => {
        setToRecipeDefault();
    });

    function setToRecipeDefault() {
        _beanInGrams = _coffeeRecipe.defaultCoffeeParams.beanInGrams;
        _coffeeToWaterRatio = _coffeeRecipe.defaultCoffeeParams.coffeeToWaterRatio;
        _waterInGrams = _coffeeRecipe.defaultCoffeeParams.waterInGrams;
    }
    
    let _coffeeParams = $derived(deriveCoffeeParams(_coffeeRecipe.recipeId, _beanInGrams, _coffeeToWaterRatio, _waterInGrams));

    let _coffeeRecipeSteps = $derived(createCoffeeRecipeSteps(_coffeeParams));

    $inspect(_recipeId, _coffeeRecipe, _coffeeParams, _coffeeRecipeSteps);

    function deriveCoffeeParams(recipeId: CoffeeRecipeId, beanInGrams: number, coffeeToWaterRatio: number, waterInGrams: number): CoffeeParams {
        console.log('deriveCoffeeParams recipeId: ', recipeId, ' beanInGrams: ', beanInGrams, ' coffeeToWaterRatio: ', coffeeToWaterRatio, ' waterInGrams: ', waterInGrams);
        return createCoffeeParams(recipeId, beanInGrams, coffeeToWaterRatio, waterInGrams);
    }

    return {
        get recipeId() { return _recipeId; },
        set recipeId(value) { _recipeId = value; },

        get coffeeRecipe() { return _coffeeRecipe; },
        set coffeeRecipe(value) { _coffeeRecipe = value; },

        get beanInGrams() { return _beanInGrams; },
        set beanInGrams(value) { _beanInGrams = value; },

        get coffeeToWaterRatio() { return _coffeeToWaterRatio; },

        get waterInGrams() { return _waterInGrams; },

        get coffeeRecipeSteps() { return _coffeeRecipeSteps; },

        get coffeeParams() { return _coffeeParams; }
    }
}

const COFFEE_RECIPE_STORE_CONTEXT_KEY = Symbol('COFFEE_RECIPE_STORE_CONTEXT_KEY');

export function setCoffeeRecipeStore() {    
    return setContext(COFFEE_RECIPE_STORE_CONTEXT_KEY, createCoffeeRecipeStore(CoffeeRecipeId.HarioSwitch_TetsuKasuya));
}

export function getCoffeeRecipeStore() {
    return getContext<ReturnType<typeof setCoffeeRecipeStore>>(COFFEE_RECIPE_STORE_CONTEXT_KEY);
}