import { CoffeeRecipeId } from "./CoffeeRecipeConstants";
import { CoffeeRecipe } from "./CoffeeRecipe";
import type { CoffeeParams } from "./CoffeeParams";
import { HarioSwitchEmiFukahoriCoffeeParams, HarioSwitchEmiFukahoriCoffeeRecipe, HarioSwitchEmiFukahoriCoffeeRecipeSteps } from "./hario-switch/emi-fukahori";
import { HarioSwitchTetsuKasuyaCoffeeParams, HarioSwitchTetsuKasuyaCoffeeRecipe, HarioSwitchTetsuKasuyaCoffeeRecipeSteps } from "./hario-switch/tetsu-kasuya";
import { HarioSwitchOleKristianBoenCoffeeParams, HarioSwitchOleKristianBoenCoffeeRecipe, HarioSwitchOleKristianBoenCoffeeRecipeSteps } from "./hario-switch/ole-kristian-boen";


export const createCoffeeRecipe = (recipeId: CoffeeRecipeId): CoffeeRecipe => {
    console.log('createCoffeeRecipe recipeId: ', recipeId);

    switch(recipeId) {
        case CoffeeRecipeId.HarioSwitch_TetsuKasuya : {            
            return new HarioSwitchTetsuKasuyaCoffeeRecipe();
        };
        case CoffeeRecipeId.HarioSwitch_EmiFukahori : {            
            return new HarioSwitchEmiFukahoriCoffeeRecipe(); 
        };
        case CoffeeRecipeId.HarioSwitch_OleKristianBoen : {
            return new HarioSwitchOleKristianBoenCoffeeRecipe();
        }
        default:
            return new HarioSwitchTetsuKasuyaCoffeeRecipe();
    }
}

export const createCoffeeParams = (recipeId: CoffeeRecipeId, beanInGrams: number, coffeeToWaterRatio: number, waterInGrams: number): CoffeeParams => {
    console.log('createCoffeeParams recipeId: ', recipeId, ' beanInGrams: ', beanInGrams, ' coffeeToWaterRatio: ', coffeeToWaterRatio, ' waterInGrams: ', waterInGrams);

    switch(recipeId) {
        case CoffeeRecipeId.HarioSwitch_TetsuKasuya : {            
            return new HarioSwitchTetsuKasuyaCoffeeParams(beanInGrams, coffeeToWaterRatio, waterInGrams);
        };
        case CoffeeRecipeId.HarioSwitch_EmiFukahori : {            
            return new HarioSwitchEmiFukahoriCoffeeParams(beanInGrams, coffeeToWaterRatio, waterInGrams); 
        };
        case CoffeeRecipeId.HarioSwitch_OleKristianBoen : {
            return new HarioSwitchOleKristianBoenCoffeeParams(beanInGrams, coffeeToWaterRatio, waterInGrams);
        }
        default:
            return new HarioSwitchTetsuKasuyaCoffeeParams(beanInGrams, coffeeToWaterRatio, waterInGrams);
    }
}

export const createCoffeeRecipeSteps = (coffeeParams: CoffeeParams) => {
    console.log('createCoffeeParams coffeeParams: ', coffeeParams);

    switch(coffeeParams.recipeId) {
        case CoffeeRecipeId.HarioSwitch_TetsuKasuya : {            
            return new HarioSwitchTetsuKasuyaCoffeeRecipeSteps(coffeeParams);
        };
        case CoffeeRecipeId.HarioSwitch_EmiFukahori : {            
            return new HarioSwitchEmiFukahoriCoffeeRecipeSteps(coffeeParams); 
        };
        case CoffeeRecipeId.HarioSwitch_OleKristianBoen : {
            return new HarioSwitchOleKristianBoenCoffeeRecipeSteps(coffeeParams);
        }
        default:
            return new HarioSwitchTetsuKasuyaCoffeeRecipeSteps(coffeeParams);
    }
}