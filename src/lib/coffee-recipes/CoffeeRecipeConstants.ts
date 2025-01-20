import type { CoffeeRecipeConfig, DripperBrand, DripperRecipe, DripperType, MetaInfos } from "./CoffeeRecipeTypes.d"; 
import {  PouringTechnique, PourOverStage, SwitchState } from "./CoffeeRecipeTypes.d";
import { getCoffeeRecipeMenu, getMenuMetaInfos, type CoffeeRecipeMenu } from "./menu/CoffeeRecipeMenuUtils";

import { createSearchParams, filterMetaInfosBySearchParams, getPathFromMetaInfo, isRecipeMetaInfo} from "./MetaInfoUtils";

export const CoffeeRecipeId = {
    hario_switch_tetsukasuyanewhybrid: 'hario_switch_tetsukasuyanewhybrid',
    hario_switch_tetsukasuya: 'hario_switch_tetsukasuya',
    hario_switch_emifukahori: 'hario_switch_emifukahori',
    hario_switch_olekristianboen: 'hario_switch_olekristianboen',
    hario_switch_coffeechronicler: 'hario_switch_coffeechronicler',
    hario_v60_46method: 'hario_v60_46method',
    hario_v60_jameshoffmann: 'hario_v60_jameshoffmann',
    hario_v60_mattwinton: 'hario_v60_mattwinton'
} as const;
export type CoffeeRecipeId = keyof typeof CoffeeRecipeId;


const dripperBrands: DripperBrand[] = [
    <DripperBrand> {
        name: 'hario',
        drippers: [
            <DripperType> {
                name: 'switch',
                recipes: [
                    <DripperRecipe> { recipeId: CoffeeRecipeId.hario_switch_tetsukasuyanewhybrid, name: 'tetsukasuyanewhybrid', createdBy: 'tetsukasuya'},
                    <DripperRecipe> { recipeId: CoffeeRecipeId.hario_switch_tetsukasuya, name: 'tetsukasuya', createdBy: 'tetsukasuya' },
                    <DripperRecipe> { recipeId: CoffeeRecipeId.hario_switch_emifukahori, name: 'emifukahori', createdBy: 'emifukahori'  },
                    <DripperRecipe> { recipeId: CoffeeRecipeId.hario_switch_olekristianboen, name: 'olekristianboen', createdBy: 'olekristianboen' },
                    <DripperRecipe> { recipeId: CoffeeRecipeId.hario_switch_coffeechronicler, name: 'coffeechronicler', createdBy: 'coffeechronicler' }
                ]
            },
            <DripperType> {
                name: 'v60',
                recipes: [
                    <DripperRecipe> { recipeId: CoffeeRecipeId.hario_v60_46method, name: '46method', createdBy: 'tetsukasuya' },
                    <DripperRecipe> { recipeId: CoffeeRecipeId.hario_v60_jameshoffmann, name: 'jameshoffmann', createdBy: 'jameshoffmann' },
                    <DripperRecipe> { recipeId: CoffeeRecipeId.hario_v60_mattwinton, name: 'mattwinton', createdBy: 'mattwinton' }
                ]
            }
        ]
    }
]

export const Menu: CoffeeRecipeMenu = getCoffeeRecipeMenu(dripperBrands);

export const MenuMetaInfos: MetaInfos[] = getMenuMetaInfos(Menu);

export const AllRecipePaths = MenuMetaInfos.map(metaInfo => getPathFromMetaInfo(metaInfo));

export type CoffeeRecipeSearchResult = {
    metaInfos: MetaInfos,
    requiresRedirect: boolean
}

export const searchRecipeIdByParams = (inParams: string[]) :CoffeeRecipeSearchResult  => {
    let allRecipeMetaInfos = MenuMetaInfos.filter(isRecipeMetaInfo);
    let filteredMetaInfosArr = allRecipeMetaInfos;
    let searchParams = createSearchParams(inParams);

    let resultArr = filterMetaInfosBySearchParams(filteredMetaInfosArr, searchParams);

    console.log('searchRecipeIdByParams', resultArr);

    if(resultArr && resultArr.length > 0) {
        console.log('searchRecipeIdByParams found result/results');
        return <CoffeeRecipeSearchResult> {
            metaInfos: resultArr[0],
            requiresRedirect: resultArr.length != 1
        }
    } else {
        console.log('searchRecipeIdByParams cannot find recipe, redirect to first recipe');
        return <CoffeeRecipeSearchResult> {
            metaInfos: allRecipeMetaInfos[0],
            requiresRedirect: true
        }
    }
}

export const getCoffeeRecipeDefaultConfig = (coffeeRecipId: string) : CoffeeRecipeConfig => {
    switch(coffeeRecipId) {
        case CoffeeRecipeId.hario_switch_tetsukasuyanewhybrid : {
            return <CoffeeRecipeConfig>{
                isTimerRecipe: true,
                isImmersionDripperRecipe: true,
                coffeeParameters: {
                    beanInGrams: 20,
                    coffeeToWaterRatio: -1,
                    waterInGrams: 300
                },
                steps: [
                    {
                        switchState: SwitchState.CLOSED,
                        stage: PourOverStage.BLOOMING,
                        pouringTechnique: PouringTechnique.CIRCLE,
                        showWaterTemperature: true,

                        durationInSeconds: 45,
                        pourParameters: { waterPercentage: 16.6667, waterTemp: 93}
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.FIRST_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,
                        showWaterTemperature: true,

                        durationInSeconds: 45,
                        pourParameters: { waterPercentage: 23.3333, waterTemp: 93}
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.SECOND_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,
                        showWaterTemperature: true,

                        durationInSeconds: 40,
                        pourParameters: { waterPercentage: 26.6667, waterTemp: 93}
                    },
                    {
                        switchState: SwitchState.CLOSED,
                        stage: PourOverStage.THIRD_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,
                        showWaterTemperature: true,

                        durationInSeconds: 35,
                        pourParameters: { waterPercentage: 33.3333, waterTemp: 70}
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.FINAL,

                        durationInSeconds: 45,
                        pourParameters: { waterPercentage: 0, waterTemp: 70}
                    }
                ],
                references: [
                    { 
                        description : 'The Ultimate Recipe for Brewing Any Coffee Bean Deliciously Has Evolved Even Further! - Tetsu Kasuya', 
                        url: 'https://www.youtube.com/watch?v=4FeUp_zNiiY' 
                    }
                ]
            }
        };
        case CoffeeRecipeId.hario_switch_tetsukasuya : {
            return <CoffeeRecipeConfig>{
                isTimerRecipe: true,
                isImmersionDripperRecipe: true,
                coffeeParameters: {
                    beanInGrams: 20,
                    coffeeToWaterRatio: -1,
                    waterInGrams: 280
                },
                steps: [
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.BLOOMING,
                        showWaterTemperature: true,

                        durationInSeconds: 30,
                        pourParameters: { waterPercentage: 21.4285, waterTemp: 93}
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.FIRST_POUR,
                        showWaterTemperature: true,

                        durationInSeconds: 45,
                        pourParameters: { waterPercentage: 21.4285, waterTemp: 93}
                    },
                    {
                        switchState: SwitchState.CLOSED,
                        stage: PourOverStage.SECOND_POUR,
                        showWaterTemperature: true,

                        durationInSeconds: 30,
                        pourParameters: { waterPercentage: 57.1430, waterTemp: 70}
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.FINAL,

                        durationInSeconds: 75,
                        pourParameters: { waterPercentage: 0, waterTemp: 70}
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
        case CoffeeRecipeId.hario_switch_emifukahori : {
            return  <CoffeeRecipeConfig>{
                isTimerRecipe: true,
                isImmersionDripperRecipe: true,
                coffeeParameters: {
                    beanInGrams: 14,
                    coffeeToWaterRatio: -1,
                    waterInGrams: 200
                },
                steps: [
                    {
                        switchState: SwitchState.CLOSED,
                        stage: PourOverStage.BLOOMING,

                        durationInSeconds: 30,
                        pourParameters: { waterPercentage: 25, waterTemp: 93}
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.POURING,
                        pouringTechnique: PouringTechnique.CENTER,

                        durationInSeconds: 40,
                        pourParameters: { waterPercentage: 75, waterTemp: 93}
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.FINAL,

                        durationInSeconds: 70,
                        pourParameters: { waterPercentage: 0, waterTemp: 93}
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
        case CoffeeRecipeId.hario_switch_olekristianboen : {
            return  <CoffeeRecipeConfig>{
                isTimerRecipe: true,
                isImmersionDripperRecipe: true,
                coffeeParameters: {
                    beanInGrams: 16.5,
                    coffeeToWaterRatio: -1,
                    waterInGrams: 240
                },
                steps: [
                    {
                        switchState: SwitchState.CLOSED,
                        stage: PourOverStage.BLOOMING,
                        showWaterTemperature: true,

                        durationInSeconds: 40,
                        pourParameters: { waterPercentage: 20.8333, waterTemp: 96}
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.FIRST_POUR,
                        pouringTechnique: PouringTechnique.CENTER,

                        durationInSeconds: 50,
                        pourParameters: { waterPercentage: 41.6667, waterTemp: 96}
                    },
                    {
                        switchState: SwitchState.CLOSED,
                        stage: PourOverStage.SECOND_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,

                        durationInSeconds: 40,
                        pourParameters: { waterPercentage: 37.5, waterTemp: 96}
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.FINAL,

                        durationInSeconds: 65,
                        pourParameters: { waterPercentage: 0, waterTemp: 96}
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
        case CoffeeRecipeId.hario_switch_coffeechronicler : {
            return <CoffeeRecipeConfig>{
                isTimerRecipe: true,
                isImmersionDripperRecipe: true,
                coffeeParameters: {
                    beanInGrams: 20,
                    coffeeToWaterRatio: 16,
                    waterInGrams: -1
                },
                steps: [
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.FIRST_POUR,

                        durationInSeconds: 25,
                        pourParameters: { waterPercentage: 50, waterTemp: 93}
                    },
                    {
                        switchState: SwitchState.CLOSED,
                        stage: PourOverStage.SECOND_POUR,

                        durationInSeconds: 95,
                        pourParameters: { waterPercentage: 50, waterTemp: 93}
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.FINAL,

                        durationInSeconds: 75,
                        pourParameters: { waterPercentage: 0, waterTemp: 93}
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
        };
        case CoffeeRecipeId.hario_v60_jameshoffmann : {
            return <CoffeeRecipeConfig>{
                isTimerRecipe: true,
                isImmersionDripperRecipe: false,
                showTimeframeEndTime: true,
                coffeeParameters: {
                    beanInGrams: 15,
                    coffeeToWaterRatio: -1,
                    waterInGrams: 250
                },
                steps: [
                    {
                        stage: PourOverStage.BLOOMING,
                        swirl: true,

                        durationInSeconds: 45,
                        pourParameters: { waterPercentage: 20, waterTemp: 93}
                    },
                    {                        
                        stage: PourOverStage.FIRST_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,

                        durationInSeconds: 15,
                        pourParameters: { waterPercentage: 20, waterTemp: 93}
                    },
                    {                        
                        stage: PourOverStage.PAUSE,

                        durationInSeconds: 10,
                        pourParameters: { waterPercentage: 0, waterTemp: 93}
                    },
                    {                        
                        stage: PourOverStage.SECOND_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,

                        durationInSeconds: 10,
                        pourParameters: { waterPercentage: 20, waterTemp: 93}
                    },
                    {                        
                        stage: PourOverStage.PAUSE,

                        durationInSeconds: 10,
                        pourParameters: { waterPercentage: 0, waterTemp: 93}
                    },
                    {                        
                        stage: PourOverStage.THIRD_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,

                        durationInSeconds: 10,
                        pourParameters: { waterPercentage: 20, waterTemp: 93}
                    },
                    {                        
                        stage: PourOverStage.PAUSE,

                        durationInSeconds: 10,
                        pourParameters: { waterPercentage: 0, waterTemp: 93}
                    },
                    {                        
                        stage: PourOverStage.FOURTH_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,

                        durationInSeconds: 10,
                        pourParameters: { waterPercentage: 20, waterTemp: 93}
                    },
                    {                        
                        stage: PourOverStage.PAUSE,
                        swirl: true,

                        durationInSeconds: 5,
                        pourParameters: { waterPercentage: 0, waterTemp: 93}
                    },
                    {                        
                        stage: PourOverStage.FINAL,

                        durationInSeconds: 55,
                        pourParameters: { waterPercentage: 0, waterTemp: 93}
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
        case CoffeeRecipeId.hario_v60_mattwinton : {
            return <CoffeeRecipeConfig>{
                isTimerRecipe: true,
                isImmersionDripperRecipe: false,
                showTimeframeEndTime: true,
                coffeeParameters: {
                    beanInGrams: 20,
                    coffeeToWaterRatio: -1,
                    waterInGrams: 300
                },
                steps: [
                    {
                        stage: PourOverStage.BLOOMING,

                        durationInSeconds: 30,
                        pourParameters: { waterPercentage: 20, waterTemp: 93}
                    },
                    {                        
                        stage: PourOverStage.FIRST_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,

                        durationInSeconds: 30,
                        pourParameters: { waterPercentage: 20, waterTemp: 93}
                    },
                    {                        
                        stage: PourOverStage.SECOND_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,

                        durationInSeconds: 30,
                        pourParameters: { waterPercentage: 20, waterTemp: 93}
                    },
                    {                        
                        stage: PourOverStage.THIRD_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,

                        durationInSeconds: 30,
                        pourParameters: { waterPercentage: 20, waterTemp: 93}
                    },
                    {                        
                        stage: PourOverStage.FOURTH_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,

                        durationInSeconds: 30,
                        pourParameters: { waterPercentage: 20, waterTemp: 93}
                    },
                    {                        
                        stage: PourOverStage.FINAL,

                        durationInSeconds: 60,
                        pourParameters: { waterPercentage: 0, waterTemp: 93}
                    }
                ],
                references: [
                    { 
                        description : '[HARIO] V60 Five-Pour Recipe - Matt Winton (World Brewers Cup Champion)', 
                        url: 'https://www.youtube.com/watch?v=YIC-2nFQ7vM' 
                    },
                    {
                        description : '[HARIO] V60 Five-Pour Recipe (Advanced Tips) - Matt Winton (World Brewers Cup Champion)',
                        url: 'https://www.youtube.com/watch?v=Xm2aAuhuLks0'
                    },
                    {
                        description : 'Detailed Hario V60 Five Pour Coffee – Matt Winton’s Award-Winning Recipe',
                        url: 'https://bigcupofcoffee.com/v60-five-pour-recipe-matt-winton/'
                    }
                ]
            }
        };
        case CoffeeRecipeId.hario_v60_46method : {
            return <CoffeeRecipeConfig>{
                isTimerRecipe: true,
                isImmersionDripperRecipe: false,
                showTimeframeEndTime: true,
                is46Method: true,
                coffeeParameters: {
                    beanInGrams: 20,
                    coffeeToWaterRatio: -1,
                    waterInGrams: 300
                },
                enableStepsAdjustments: true,
                stepAdjustmentSelectedOptions: [
                    { stepAdjustment: 'twoStepsRatios', selectedOption: 'standard' },
                    { stepAdjustment: 'pourDivisions', selectedOption: 'evenStronger' }
                ],
                stepAdjustments: {
                    titleMessageKey: 'stepsAdjustments',
                    order: ['twoStepsRatios', 'pourDivisions'],
                    twoStepsRatios: {
                        titleMessageKey: 'stepsAdjustments_twoStepsRatios',
                        minPercentage: 16.6667,
                        maxPercentage: 23.3333,
                        defaultSteps : [
                            {
                                stage: PourOverStage.FIRST_POUR,
                                pouringTechnique: PouringTechnique.CIRCLE,
        
                                durationInSeconds: 45,
                                pourParameters: { waterPercentage: 20, waterTemp: 93},
                                stepAdjustment: 'twoStepsRatios'
                            },
                            {                        
                                stage: PourOverStage.SECOND_POUR,
                                pouringTechnique: PouringTechnique.CIRCLE,
        
                                durationInSeconds: 45,
                                pourParameters: { waterPercentage: 20, waterTemp: 93},
                                stepAdjustment: 'twoStepsRatios'
                            }
                        ],
                        selectMode: 'OPTIONS',
                        options: [
                            { name: 'sweeter', default: false, waterPercentageRatios: [16.6667, 23.3333]}, 
                            { name: 'standard', default: true, useDefault: true}, 
                            { name: 'brighter', default: false, waterPercentageRatios: [23.3333, 16.6667]},
                        ]
                    },
                    pourDivisions: {
                        maxSteps: 3,
                        totalPercentages: 60,
                        stepsStages: [PourOverStage.THIRD_POUR, PourOverStage.FOURTH_POUR, PourOverStage.FIFTH_POUR],
                        selectMode: 'OPTIONS',
                        defaultSteps: [
                            {   
                                stage: PourOverStage.THIRD_POUR,
                                pouringTechnique: PouringTechnique.CIRCLE,
        
                                durationInSeconds: 45,
                                pourParameters: { waterPercentage: 20, waterTemp: 93},
                                stepAdjustment: 'pourDivisions'
                            },
                            {   
                                stage: PourOverStage.FOURTH_POUR,
                                pouringTechnique: PouringTechnique.CIRCLE,
        
                                durationInSeconds: 30,
                                pourParameters: { waterPercentage: 20, waterTemp: 93},
                                stepAdjustment: 'pourDivisions'
                            },
                            {   
                                stage: PourOverStage.FIFTH_POUR,
                                pouringTechnique: PouringTechnique.CIRCLE,
        
                                durationInSeconds: 45,
                                pourParameters: { waterPercentage: 20, waterTemp: 93},
                                stepAdjustment: 'pourDivisions'
                            }
                        ],
                        options: [
                            { name: 'lighter', default: false, steps: [
                                {   
                                    stage: PourOverStage.THIRD_POUR,
                                    pouringTechnique: PouringTechnique.CIRCLE,
            
                                    durationInSeconds: 120,
                                    pourParameters: { waterPercentage: 60, waterTemp: 93},
                                    stepAdjustment: 'pourDivisions'
                                }
                            ]},
                            { name: 'stronger', default: false, steps: [
                                {   
                                    stage: PourOverStage.THIRD_POUR,
                                    pouringTechnique: PouringTechnique.CIRCLE,
            
                                    durationInSeconds: 60,
                                    pourParameters: { waterPercentage: 30, waterTemp: 93},
                                    stepAdjustment: 'pourDivisions'
                                },
                                {   
                                    stage: PourOverStage.FOURTH_POUR,
                                    pouringTechnique: PouringTechnique.CIRCLE,
            
                                    durationInSeconds: 60,
                                    pourParameters: { waterPercentage: 30, waterTemp: 93},
                                    stepAdjustment: 'pourDivisions'
                                },
                            ]},
                            { name: 'evenStronger', default: true, useDefault: true},
                        ] 
                    },
                },
                steps: [
                    // {
                    //     stage: PourOverStage.FIRST_POUR,
                    //     pouringTechnique: PouringTechnique.CIRCLE,

                    //     durationInSeconds: 45,
                    //     pourParameters: { waterPercentage: 20, waterTemp: 93}
                    // },
                    // {                        
                    //     stage: PourOverStage.SECOND_POUR,
                    //     pouringTechnique: PouringTechnique.CIRCLE,

                    //     durationInSeconds: 45,
                    //     pourParameters: { waterPercentage: 20, waterTemp: 93}
                    // },
                    // {   
                    //     stage: PourOverStage.THIRD_POUR,
                    //     pouringTechnique: PouringTechnique.CIRCLE,

                    //     durationInSeconds: 45,
                    //     pourParameters: { waterPercentage: 20, waterTemp: 93}
                    // },
                    // {   
                    //     stage: PourOverStage.FOURTH_POUR,
                    //     pouringTechnique: PouringTechnique.CIRCLE,

                    //     durationInSeconds: 30,
                    //     pourParameters: { waterPercentage: 20, waterTemp: 93}
                    // },
                    // {   
                    //     stage: PourOverStage.FIFTH_POUR,
                    //     pouringTechnique: PouringTechnique.CIRCLE,

                    //     durationInSeconds: 45,
                    //     pourParameters: { waterPercentage: 20, waterTemp: 93}
                    // }
                ],
                references: [
                    { 
                        description : 'How to Make Coffee Using the 4:6 Brewing Method', 
                        url: 'https://en.philocoffea.com/blogs/blog/coffee-brewing-method' 
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
                steps: [],
                references: []
            }
        }

    }
}