import type { CoffeeRecipeId } from "./CoffeeRecipeConstants";

import type { Reference, CoffeeParametersConfig } from "./CoffeeRecipeTypes";

export abstract class CoffeeRecipe {
    recipeId: CoffeeRecipeId;
    defaultCoffeeParams: CoffeeParametersConfig;
    public references: Reference[] = [];

    constructor(recipeId: CoffeeRecipeId, inDefaultCoffeeParams: CoffeeParametersConfig, references: Reference[]) {
        this.recipeId = recipeId;
        this.defaultCoffeeParams = inDefaultCoffeeParams;
        this.references = references;
    }
}