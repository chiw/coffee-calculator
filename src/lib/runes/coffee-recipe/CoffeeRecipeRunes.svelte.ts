import { CoffeeRecipeId } from "$lib/coffee-recipes";
import { getCoffeeRecipeDefaultConfig } from "$lib/coffee-recipes/CoffeeRecipeConstants";
import { createCoffeeRecipe, createCoffeeRecipeSteps, createCoffeeRecipeStepsWithChangeFactors } from "$lib/coffee-recipes/CoffeeRecipesFactory";
import type { CoffeeParametersConfig, CoffeeRecipe, CoffeeRecipeSteps, RecipeChangeFactors, StepAdjustmentSelectedOptionConfig, StepConfig, StepControls } from "$lib/coffee-recipes/CoffeeRecipeTypes";

import { getContext, setContext } from "svelte";

export function createCoffeeRecipeRunes(defaultCoffeeRecipeId: CoffeeRecipeId) {

    let _recipeId: CoffeeRecipeId = $state(defaultCoffeeRecipeId);

    let _coffeeRecipe: CoffeeRecipe = $derived(createCoffeeRecipe(_recipeId));

    // let _coffeeParams: CoffeeParametersConfig = $state(_coffeeRecipe.defaultCoffeeParams);

    // let _stepControls: StepControls = $state(_coffeeRecipe.defaultStepControls);

    let _recipeChangeFactors: RecipeChangeFactors = $state(_coffeeRecipe.defaultRecipeChangeFactors);

    // let _stepAdjustmentSelectedOptions: StepAdjustmentSelectedOptionConfig[] = $state(_coffeeRecipe.defaultStepAdjustmentSelectedOptions);

    // let _stepsConfig: StepConfig[] = $state(getCoffeeRecipeDefaultConfig(defaultCoffeeRecipeId).steps);

    $effect(() => {
        // console.log('in $effect');
        $inspect.trace();
        // _coffeeParams = _coffeeRecipe.defaultCoffeeParams;
        // _stepControls = _coffeeRecipe.defaultStepControls;
        _recipeChangeFactors = _coffeeRecipe.defaultRecipeChangeFactors;
        // _stepAdjustmentSelectedOptions = _coffeeRecipe.defaultStepAdjustmentSelectedOptions;
        // _stepsConfig = _coffeeRecipe.defaultSteps;
    });

    // let _coffeeRecipeSteps: CoffeeRecipeSteps = $derived(createCoffeeRecipeSteps(_recipeId, _coffeeParams, _stepsConfig, _stepAdjustmentSelectedOptions));
    // let _coffeeRecipeSteps: CoffeeRecipeSteps = $derived(createCoffeeRecipeSteps(_recipeId, _coffeeParams, _stepsConfig, _stepControls));
    let _coffeeRecipeSteps: CoffeeRecipeSteps = $derived(createCoffeeRecipeStepsWithChangeFactors(_recipeId, _recipeChangeFactors));

    // $inspect(_recipeId, _coffeeRecipe, _coffeeParams, _coffeeRecipeSteps).with(console.trace);
    $inspect(_recipeId, _coffeeRecipe, _recipeChangeFactors).with(console.trace);

    return {
        get recipeId() { return _recipeId; },
        set recipeId(value) { _recipeId = value; },

        get coffeeRecipe() { return _coffeeRecipe; },
        get coffeeRecipeSteps() { return _coffeeRecipeSteps; },

        // get coffeeParams() { return _coffeeParams; },
        // set coffeeParams(value) { _coffeeParams = value; },
        
        // get stepsConfig() { return _stepsConfig; },
        // set stepsConfig(value) { _stepsConfig = value; },

        // get stepControls() { return _stepControls; },
        // set stepControls(value) { _stepControls = value; },

        get recipeChangeFactors() { return _recipeChangeFactors},
        set recipeChangeFactors(value) { _recipeChangeFactors = value}

        // get stepAdjustmentSelectedOptions() { return _stepAdjustmentSelectedOptions; },
        // set stepAdjustmentSelectedOptions(value) { _stepAdjustmentSelectedOptions = value; }
    }
}

const COFFEE_RECIPE_RUNES_CONTEXT_KEY = Symbol('COFFEE_RECIPE_RUNES_CONTEXT_KEY');

export const setCoffeeRecipeRunes = () => {    
    return setContext(COFFEE_RECIPE_RUNES_CONTEXT_KEY, createCoffeeRecipeRunes(CoffeeRecipeId.hario_switch_tetsukasuya));
}

export const getCoffeeRecipeRunes = () => {
    return getContext<ReturnType<typeof setCoffeeRecipeRunes>>(COFFEE_RECIPE_RUNES_CONTEXT_KEY);
}