import type { CoffeeRecipeId } from "./CoffeeRecipeConstants";

import type { CoffeeParameters } from "./CoffeeParameters";
import type { Reference } from "./CoffeeRecipeTypes";

export abstract class CoffeeRecipe {
    recipeId: CoffeeRecipeId;
    defaultCoffeeParams: CoffeeParameters;
    public references: Reference[] = [];

    constructor(recipeId: CoffeeRecipeId, defaultCoffeeParams: CoffeeParameters, references: Reference[]) {
        this.recipeId = recipeId;
        this.defaultCoffeeParams = defaultCoffeeParams;
        this.references = references;
    }
}