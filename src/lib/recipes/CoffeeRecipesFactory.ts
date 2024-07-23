import { HarioSwitchTetsuKasuyaCoffeeRecipe } from "./HarioSwitchTetsuKasuyaCoffeeRecipe";

export const createCoffeeRecipe = (recipeName: string, beanInGrams: number, coffeeToWaterRatio: number, waterInGrams: number): CoffeeRecipe => {
    console.log('recipeName: ', recipeName, 'beanInGrams:', beanInGrams, 'coffeeToWaterRatio', coffeeToWaterRatio, 'waterInGrams', waterInGrams)

    switch(recipeName) {
        case 'harioSwitch_TetsuKasuya' : return new HarioSwitchTetsuKasuyaCoffeeRecipe(beanInGrams, coffeeToWaterRatio, waterInGrams);
        default:
            return new HarioSwitchTetsuKasuyaCoffeeRecipe(beanInGrams, coffeeToWaterRatio, waterInGrams);
    }
}