import type { CoffeeRecipeConfig } from "./CoffeeRecipeTypes.d"; 
import { PouringTechnique, PourOverStage, SwitchState } from "./CoffeeRecipeTypes.d";

export const CoffeeRecipeId = {
    HarioSwitch_TetsuKasuya: 'HarioSwitch_TetsuKasuya',
    HarioSwitch_EmiFukahori: 'HarioSwitch_EmiFukahori',
    HarioSwitch_OleKristianBoen: 'HarioSwitch_OleKristianBoen',
    HarioSwitch_CoffeeChronicler: 'HarioSwitch_CoffeeChronicler',
    HarioV60_JamesHoffmann: 'HarioV60_JamesHoffmann'
} as const;
export type CoffeeRecipeId = keyof typeof CoffeeRecipeId;

export const CoffeeRecipesChoices = [
    { id: CoffeeRecipeId.HarioSwitch_TetsuKasuya },
    { id: CoffeeRecipeId.HarioSwitch_EmiFukahori },
    { id: CoffeeRecipeId.HarioSwitch_OleKristianBoen },
    { id: CoffeeRecipeId.HarioSwitch_CoffeeChronicler },
    { id: CoffeeRecipeId.HarioV60_JamesHoffmann }
] as const;

export const getCoffeeRecipeDefaultConfig = (coffeeRecipId: CoffeeRecipeId) : CoffeeRecipeConfig => {
    switch(coffeeRecipId) {
        case CoffeeRecipeId.HarioSwitch_TetsuKasuya : {
            return <CoffeeRecipeConfig>{
                isTimerRecipe: true,
                isImmersionDripperRecipe: true,
                coffeeParameters: {
                    beanInGrams: 20,
                    coffeeToWaterRatio: -1,
                    waterInGrams: 280
                },
                stepsDurationInSeconds: [30, 45, 30, 75],
                pourParameters: [
                    { waterPercentage: 21.4285, waterTemp: 93},
                    { waterPercentage: 21.4285, waterTemp: 93},
                    { waterPercentage: 100 - (21.4285 * 2), waterTemp: 70}
                ],
                steps: [
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.BLOOMING,
                        showWaterTemperature: true
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.FIRST_POUR,
                        showWaterTemperature: true
                    },
                    {
                        switchState: SwitchState.CLOSED,
                        stage: PourOverStage.SECOND_POUR,
                        showWaterTemperature: true
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.FINAL
                    }
                ],
                references: [
                    { 
                        description : 'Is it the God Recipe, or the Devil Recipe? ｜ The Ultimate Switch Recipe Ever!! - Tetsu Kasuya', 
                        url: 'https://www.youtube.com/watch?v=gC8K40kZ_6E' 
                    }
                ]
            }
        };
        case CoffeeRecipeId.HarioSwitch_EmiFukahori : {
            return  <CoffeeRecipeConfig>{
                isTimerRecipe: true,
                isImmersionDripperRecipe: true,
                coffeeParameters: {
                    beanInGrams: 14,
                    coffeeToWaterRatio: -1,
                    waterInGrams: 200
                },
                stepsDurationInSeconds: [30, 40, 70],
                pourParameters: [
                    { waterPercentage: 25, waterTemp: 93},
                    { waterPercentage: 75, waterTemp: 93}
                ],
                steps: [
                    {
                        switchState: SwitchState.CLOSED,
                        stage: PourOverStage.BLOOMING
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.POURING,
                        pouringTechnique: PouringTechnique.CENTER
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.FINAL
                    }
                ],
                references: [
                    { 
                        description : 'Easy Hario Switch Recipe from Emi Fukahori (World Brewers Cup Champion)', 
                        url: 'https://europeancoffeetrip.com/easy-hario-switch-recipe-emi-fukahor/' 
                    }
                ]
            }
        };
        case CoffeeRecipeId.HarioSwitch_OleKristianBoen : {
            return  <CoffeeRecipeConfig>{
                isTimerRecipe: true,
                isImmersionDripperRecipe: true,
                coffeeParameters: {
                    beanInGrams: 16.5,
                    coffeeToWaterRatio: -1,
                    waterInGrams: 240
                },
                stepsDurationInSeconds: [40, 50, 40, 65],
                pourParameters: [
                    { waterPercentage: 20.8333, waterTemp: 96},
                    { waterPercentage: 41.6667, waterTemp: 96},
                    { waterPercentage: 37.5, waterTemp: 96},
                ],
                steps: [
                    {
                        switchState: SwitchState.CLOSED,
                        stage: PourOverStage.BLOOMING,
                        showWaterTemperature: true
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.FIRST_POUR,
                        pouringTechnique: PouringTechnique.CENTER
                    },
                    {
                        switchState: SwitchState.CLOSED,
                        stage: PourOverStage.SECOND_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.FINAL
                    }
                ],
                references: [
                    { 
                        description : "Ole Kristian Bøen's Hario Switch Recipe", 
                        url: 'https://www.hario-europe.com/blogs/hario-community/ole-kristian-boens-switch-recipe' 
                    }
                ]
            }
        };
        case CoffeeRecipeId.HarioSwitch_CoffeeChronicler : {
            return <CoffeeRecipeConfig>{
                isTimerRecipe: true,
                isImmersionDripperRecipe: true,
                coffeeParameters: {
                    beanInGrams: 20,
                    coffeeToWaterRatio: 16,
                    waterInGrams: -1
                },
                stepsDurationInSeconds: [25, 95, 75],
                pourParameters: [
                    { waterPercentage: 50, waterTemp: 93},
                    { waterPercentage: 50, waterTemp: 93}
                ],
                steps: [
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.FIRST_POUR
                    },
                    {
                        switchState: SwitchState.CLOSED,
                        stage: PourOverStage.SECOND_POUR
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.FINAL
                    }
                ],
                references: [
                    { 
                        description : 'Hario Switch Review: The Hybrid Brewer You Need to Try', 
                        url: 'https://coffeechronicler.com/hario-switch/' 
                    },
                    { 
                        description : '(YouTube) The ultimate Hario Switch RECIPE: A consistent cup that will blow your mind', 
                        url: 'https://www.youtube.com/watch?v=68ZOXrXbVHc' 
                    }
                ]
            }
        }
        case CoffeeRecipeId.HarioV60_JamesHoffmann : {
            return <CoffeeRecipeConfig>{
                isTimerRecipe: true,
                isImmersionDripperRecipe: false,
                coffeeParameters: {
                    beanInGrams: 15,
                    coffeeToWaterRatio: -1,
                    waterInGrams: 250
                },
                stepsDurationInSeconds: [45, 15, 10, 10, 10, 10, 10, 10, 5, 55],
                pourParameters: [
                    { waterPercentage: 20, waterTemp: 93},
                    { waterPercentage: 20, waterTemp: 93},
                    { waterPercentage: 0, waterTemp: 93},
                    { waterPercentage: 20, waterTemp: 93},
                    { waterPercentage: 0, waterTemp: 93},
                    { waterPercentage: 20, waterTemp: 93},
                    { waterPercentage: 0, waterTemp: 93},
                    { waterPercentage: 20, waterTemp: 93},
                    { waterPercentage: 0, waterTemp: 93},
                ],
                steps: [
                    {
                        stage: PourOverStage.BLOOMING,
                        swirl: true
                    },
                    {
                        
                        stage: PourOverStage.FIRST_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE
                    },
                    {                        
                        stage: PourOverStage.PAUSE
                    },
                    {
                        
                        stage: PourOverStage.SECOND_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE
                    },
                    {
                        
                        stage: PourOverStage.PAUSE
                    },
                    {
                        
                        stage: PourOverStage.THIRD_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE
                    },
                    {
                        
                        stage: PourOverStage.PAUSE
                    },
                    {
                        
                        stage: PourOverStage.FOURTH_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE
                    },
                    {
                        
                        stage: PourOverStage.PAUSE,
                        swirl: true
                    },
                    {                        
                        stage: PourOverStage.FINAL
                    }
                ],
                references: [
                    { 
                        description : 'A Better 1 Cup V60 Technique - James Hoffmann', 
                        url: 'https://www.youtube.com/watch?v=1oB1oDrDkHM' 
                    }
                ]
            }
        };
        default: {
            return <CoffeeRecipeConfig>{
                isTimerRecipe: false,
                isImmersionDripperRecipe: false,
                coffeeParameters: {
                    beanInGrams: -1,
                    coffeeToWaterRatio: -1,
                    waterInGrams: -1
                },
                stepsDurationInSeconds: [],
                pourParameters: [],
                steps: [],
                references: []
            }
        }

    }
}