import { CoffeeParams } from "$lib/recipes/CoffeeParams";
import type { CoffeeRecipe } from "$lib/recipes/CoffeeRecipe";
import { CoffeeRecipeId } from "$lib/recipes/CoffeeRecipeConstants";
import { createCoffeeParams, createCoffeeRecipe, createCoffeeRecipeSteps } from "$lib/recipes/CoffeeRecipesFactory";
import { setContext } from "svelte";

export function createCoffeeRecipeStore(defaultCoffeeRecipeId: CoffeeRecipeId) {

    let _recipeId: CoffeeRecipeId = $state(defaultCoffeeRecipeId);

    let _coffeeRecipe: CoffeeRecipe = $state(createCoffeeRecipe(defaultCoffeeRecipeId));

    let _beanInGrams = $state(_coffeeRecipe.coffeeParams.beanInGrams);
    let _coffeeToWaterRatio = $state(_coffeeRecipe.coffeeParams.coffeeToWaterRatio);
    let _waterInGrams = $state(_coffeeRecipe.coffeeParams.waterInGrams);

    $effect(() => {
        _coffeeRecipe = createCoffeeRecipe(_recipeId);
    });

    $effect(() => {
        _beanInGrams = _coffeeRecipe.coffeeParams.beanInGrams;
        _coffeeToWaterRatio = _coffeeRecipe.coffeeParams.coffeeToWaterRatio;
        _waterInGrams = _coffeeRecipe.coffeeParams.waterInGrams;
    });
    
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