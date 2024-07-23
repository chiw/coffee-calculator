import type { Reference } from "./reference.type";

export abstract class CoffeeRecipe {
    recipeName: string;
    beanInGrams: number;
    coffeeToWaterRatio: number;
    waterInGrams: number;

    constructor(recipeName: string, beanInGrams: number, coffeeToWaterRatio: number, waterInGrams: number) {
        this.recipeName = recipeName;
        this.beanInGrams = beanInGrams;
        this.coffeeToWaterRatio = coffeeToWaterRatio;
        this.waterInGrams = waterInGrams;
    }

    get steps(): string[] {
        return [];
    }

    get references(): Reference[] {
        return [];
    }
}