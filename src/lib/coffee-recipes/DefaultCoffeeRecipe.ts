import type { CoffeeParams } from "./CoffeeParams";
import { CoffeeRecipe } from "./CoffeeRecipe";
import type { CoffeeRecipeId } from "./CoffeeRecipeConstants";
import type { Reference } from "./Reference.type";

export class DefaultCoffeeRecipe extends CoffeeRecipe {

    constructor(coffeeRecipeId: CoffeeRecipeId, defaultCoffeeParams: CoffeeParams, references: Reference[]) {
        console.log(
            'DefaultCoffeeRecipe coffeeRecipeId: ', coffeeRecipeId,
            ' defaultCoffeeParams: ', defaultCoffeeParams, 
            ' references: ', references);
        
        super(coffeeRecipeId, defaultCoffeeParams, references);
    }
}