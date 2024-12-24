import { CoffeeRecipe } from "./CoffeeRecipe";
import type { CoffeeRecipeId } from "./CoffeeRecipeConstants";
import type { CoffeeParametersConfig } from "./CoffeeRecipeTypes";
import type { Reference } from "./Reference.type";

export class StandardCoffeeRecipe extends CoffeeRecipe {

    constructor(coffeeRecipeId: CoffeeRecipeId, inDefaultCoffeeParams: CoffeeParametersConfig, references: Reference[]) {
        console.log(
            'StandardCoffeeRecipe coffeeRecipeId: ', coffeeRecipeId,
            ' inDefaultCoffeeParams: ', inDefaultCoffeeParams, 
            ' references: ', references);
        
        super(coffeeRecipeId, inDefaultCoffeeParams, references);
    }
}