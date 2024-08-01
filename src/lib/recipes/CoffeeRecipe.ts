import type { CoffeeRecipeId } from "./CoffeeRecipeConstants";
import type { CoffeeReipeSteps } from "./CoffeeRecipeSteps";
import type { Reference } from "./Reference.type";
import { calculateRecipeCoffeeToWaterRatio, calculateRecipeWaterInGrams } from "./CoffeeRecipeUtils";
import type { CoffeeParams } from "./CoffeeParams";
import { createCoffeeParams } from "./CoffeeRecipesFactory";

export abstract class CoffeeRecipe {
    recipeId: CoffeeRecipeId;    
    coffeeParams: CoffeeParams;    
    public references: Reference[] = [];
    
    constructor(recipeId: CoffeeRecipeId) {
        this.recipeId = recipeId;
        this.coffeeParams = createCoffeeParams(recipeId, this.defaultParameters.defaultBeanInGrams, this.defaultParameters.defaultCoffeeToWaterRatio, this.defaultParameters.defaultWaterInGrams);
    }
    
    get defaultParameters() {
        return {
            defaultBeanInGrams : 20,
            defaultWaterInGrams: 280,
            defaultCoffeeToWaterRatio: -1
        }
    }
}