import { createCoffeeRecipe } from "$lib/recipes/CoffeeRecipesFactory";

export function createPourover() {
    let _beanInGrams = $state(20); /* 20g */
    let _coffeeToWaterRatio = $state(14); /* 1:14 */
    let _recipe = $state('harioSwitch_TetsuKasuya');

    let _waterInGrams = $derived(_beanInGrams * _coffeeToWaterRatio);

    let _coffeeRecipe = $derived(createCoffeeRecipe(_recipe, _beanInGrams, _coffeeToWaterRatio, _waterInGrams));

    return {
        get beanInGrams() { return _beanInGrams; },
        set beanInGrams(value) { _beanInGrams = value; },
        
        get coffeeToWaterRatio() { return _coffeeToWaterRatio; },
        set coffeeToWaterRatio(value) { _coffeeToWaterRatio = value; },
        
        get recipe() { return _recipe; },
        set recipe(value) { _recipe = value; },
        
        get waterInGrams() { return _waterInGrams; },

        get coffeeRecipe() { return _coffeeRecipe; }
    }
}