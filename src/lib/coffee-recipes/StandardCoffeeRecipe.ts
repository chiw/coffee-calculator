import type { CoffeeParameters } from "./CoffeeParameters";
import { CoffeeRecipe } from "./CoffeeRecipe";
import type { CoffeeRecipeId } from "./CoffeeRecipeConstants";
import type { Reference } from "./Reference.type";

export class StandardCoffeeRecipe extends CoffeeRecipe {

    constructor(coffeeRecipeId: CoffeeRecipeId, defaultCoffeeParams: CoffeeParameters, references: Reference[]) {
        console.log(
            'StandardCoffeeRecipe coffeeRecipeId: ', coffeeRecipeId,
            ' defaultCoffeeParams: ', defaultCoffeeParams, 
            ' references: ', references);
        
        super(coffeeRecipeId, defaultCoffeeParams, references);
    }
}