import type { CoffeeRecipeId } from "./CoffeeRecipeConstants";
import type { Reference } from "./Reference.type";
import type { CoffeeParams } from "./CoffeeParams";

export abstract class CoffeeRecipe {
    recipeId: CoffeeRecipeId;
    defaultCoffeeParams: CoffeeParams;
    public references: Reference[] = [];

    constructor(recipeId: CoffeeRecipeId, defaultCoffeeParams: CoffeeParams, references: Reference[]) {
        this.recipeId = recipeId;
        this.defaultCoffeeParams = defaultCoffeeParams;
        this.references = references;
    }
}