import type { CoffeeRecipeId } from "./CoffeeRecipeConstants";
import type { Reference } from "./Reference.type";
import type { CoffeeParams } from "./CoffeeParams";

export abstract class CoffeeRecipe {
    recipeId: CoffeeRecipeId;    
    coffeeParams: CoffeeParams;    
    public references: Reference[] = [];
    
    constructor(recipeId: CoffeeRecipeId, coffeeParams: CoffeeParams) {
        this.recipeId = recipeId;
        this.coffeeParams = coffeeParams;
    }
}