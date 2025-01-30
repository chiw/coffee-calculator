import type { CoffeeRecipeConfig, DripperBrand, DripperRecipe, DripperType, MetaInfos } from "./CoffeeRecipeTypes.d"; 
import {  PouringTechnique, PourOverStage, StepAdjustment, SwitchState } from "./CoffeeRecipeTypes.d";
import { getCoffeeRecipeMenu, getMenuMetaInfos, type CoffeeRecipeMenu } from "./menu/CoffeeRecipeMenuUtils";

import { createSearchParams, filterMetaInfosBySearchParams, getPathFromMetaInfo, isRecipeMetaInfo} from "./MetaInfoUtils";

export const CoffeeRecipeId = {
    hario_switch_tetsukasuyanewhybrid: 'hario_switch_tetsukasuyanewhybrid',
    hario_switch_tetsukasuya: 'hario_switch_tetsukasuya',
    hario_switch_emifukahori: 'hario_switch_emifukahori',
    hario_switch_olekristianboen: 'hario_switch_olekristianboen',
    hario_switch_coffeechronicler: 'hario_switch_coffeechronicler',
    hario_switch_cafetaster : 'hario_switch_cafetaster',
    hario_v60_46method: 'hario_v60_46method',
    hario_v60_jameshoffmann: 'hario_v60_jameshoffmann',
    hario_v60_mattwinton: 'hario_v60_mattwinton',
    kalita_wave155_itoatsuomi: 'kalita_wave155_itoatsuomi'
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
                    <DripperRecipe> { recipeId: CoffeeRecipeId.hario_switch_coffeechronicler, name: 'coffeechronicler', createdBy: 'coffeechronicler' },
                    <DripperRecipe> { recipeId: CoffeeRecipeId.hario_switch_cafetaster, name: 'cafetaster', createdBy: 'cafetaster' }
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
    },
    <DripperBrand> {
        name: 'kalita',
        drippers: [
            <DripperType> {
                name: 'wave155',
                recipes: [
                    <DripperRecipe> { recipeId: CoffeeRecipeId.kalita_wave155_itoatsuomi, 'name': 'itoatsuomi', createdBy: 'itoatsuomi' }
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
                enableStepsAdjustments: true,
                stepAdjustmentSelectedOptions: [
                    { stepAdjustmentName: StepAdjustment.TWO_STEPS_RATIOS, option: 'newHybridBalanced' },
                    { stepAdjustmentName: StepAdjustment.POUR_DIVISIONS, option: 'newHybridTwoPours' }
                ],
                stepAdjustments: {
                    order: [StepAdjustment.TWO_STEPS_RATIOS, StepAdjustment.POUR_DIVISIONS],
                    selectedOptions: [
                        { stepAdjustmentName: StepAdjustment.TWO_STEPS_RATIOS, option: 'newHybridBalanced' },
                        { stepAdjustmentName: StepAdjustment.POUR_DIVISIONS, option: 'newHybridTwoPours' }
                    ],
                    twoStepsRatios: {
                        canEdit: true,
                        minPercentage: 16.6667,
                        maxPercentage: 23.3333,
                        defaultSteps : [
                            {
                                switchState: SwitchState.CLOSED,
                                stage: PourOverStage.BLOOMING,
                                pouringTechnique: PouringTechnique.CIRCLE,
                                showWaterTemperature: true,

                                durationInSeconds: 45,
                                pourParameters: { waterPercentage: 15, waterTemp: '93'},
                                stepAdjustment: StepAdjustment.TWO_STEPS_RATIOS
                            },
                            {                        
                                switchState: SwitchState.OPEN,
                                stage: PourOverStage.FIRST_POUR,
                                pouringTechnique: PouringTechnique.CIRCLE,
                                showWaterTemperature: true,

                                durationInSeconds: 45,
                                pourParameters: { waterPercentage: 25, waterTemp: '93'},
                                stepAdjustment: StepAdjustment.TWO_STEPS_RATIOS
                            }
                        ],
                        selectMode: 'OPTIONS',
                        options: [
                            { name: 'newHybridSweeter', default: true, waterPercentageRatios: [13.3333, 26.6667]}, 
                            { name: 'newHybridBalanced', default: true, useDefault: true}, 
                            { name: 'newHybridBrighter', default: false, waterPercentageRatios: [16.6667, 23.3333]},
                        ]
                    },
                    pourDivisions: {
                        canEdit: false,
                        maxSteps: 3,
                        totalPercentages: 60,
                        stepsStages: [PourOverStage.SECOND_POUR, PourOverStage.THIRD_POUR, PourOverStage.FINAL],
                        selectMode: 'OPTIONS',
                        defaultSteps: [
                            {   
                                switchState: SwitchState.OPEN,
                                stage: PourOverStage.SECOND_POUR,
                                pouringTechnique: PouringTechnique.CIRCLE,
                                showWaterTemperature: true,

                                durationInSeconds: 40,
                                pourParameters: { waterPercentage: 26.6667, waterTemp: '93'},
                                stepAdjustment: StepAdjustment.POUR_DIVISIONS
                            },
                            {   
                                switchState: SwitchState.CLOSED,
                                stage: PourOverStage.THIRD_POUR,
                                pouringTechnique: PouringTechnique.CIRCLE,
                                showWaterTemperature: true,

                                durationInSeconds: 35,
                                pourParameters: { waterPercentage: 33.3333, waterTemp: '70-80'},
                                stepAdjustment: StepAdjustment.POUR_DIVISIONS
                            },
                            {   
                                switchState: SwitchState.OPEN,
                                stage: PourOverStage.FINAL,

                                durationInSeconds: 45,
                                pourParameters: { waterPercentage: 0, waterTemp: '70'},
                                stepAdjustment: StepAdjustment.POUR_DIVISIONS
                            }
                        ],
                        options: [
                            { name: 'newHybridTwoPours', default: true, useDefault: true},
                        ] 
                    },
                },
                steps: [
                    {
                        switchState: SwitchState.CLOSED,
                        stage: PourOverStage.BLOOMING,
                        pouringTechnique: PouringTechnique.CIRCLE,
                        showWaterTemperature: true,

                        durationInSeconds: 45,
                        pourParameters: { waterPercentage: 16.6667, waterTemp: '93'}
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.FIRST_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,
                        showWaterTemperature: true,

                        durationInSeconds: 45,
                        pourParameters: { waterPercentage: 23.3333, waterTemp: '93'}
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.SECOND_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,
                        showWaterTemperature: true,

                        durationInSeconds: 40,
                        pourParameters: { waterPercentage: 26.6667, waterTemp: '93'}
                    },
                    {
                        switchState: SwitchState.CLOSED,
                        stage: PourOverStage.THIRD_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,
                        showWaterTemperature: true,

                        durationInSeconds: 35,
                        pourParameters: { waterPercentage: 33.3333, waterTemp: '70'}
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.FINAL,

                        durationInSeconds: 45,
                        pourParameters: { waterPercentage: 0, waterTemp: '70'}
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
                        pourParameters: { waterPercentage: 21.4285, waterTemp: '93'}
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.FIRST_POUR,
                        showWaterTemperature: true,

                        durationInSeconds: 45,
                        pourParameters: { waterPercentage: 21.4285, waterTemp: '93'}
                    },
                    {
                        switchState: SwitchState.CLOSED,
                        stage: PourOverStage.SECOND_POUR,
                        showWaterTemperature: true,

                        durationInSeconds: 30,
                        pourParameters: { waterPercentage: 57.1430, waterTemp: '70'}
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.FINAL,

                        durationInSeconds: 75,
                        pourParameters: { waterPercentage: 0, waterTemp: '70'}
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
                        pourParameters: { waterPercentage: 25, waterTemp: '93'}
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.POURING,
                        pouringTechnique: PouringTechnique.CENTER,

                        durationInSeconds: 40,
                        pourParameters: { waterPercentage: 75, waterTemp: '93'}
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.FINAL,

                        durationInSeconds: 70,
                        pourParameters: { waterPercentage: 0, waterTemp: '93'}
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
                        pourParameters: { waterPercentage: 20.8333, waterTemp: '96'}
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.FIRST_POUR,
                        pouringTechnique: PouringTechnique.CENTER,

                        durationInSeconds: 50,
                        pourParameters: { waterPercentage: 41.6667, waterTemp: '96'}
                    },
                    {
                        switchState: SwitchState.CLOSED,
                        stage: PourOverStage.SECOND_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,

                        durationInSeconds: 40,
                        pourParameters: { waterPercentage: 37.5, waterTemp: '96'}
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.FINAL,

                        durationInSeconds: 65,
                        pourParameters: { waterPercentage: 0, waterTemp: '96'}
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
                        pourParameters: { waterPercentage: 50, waterTemp: '93'}
                    },
                    {
                        switchState: SwitchState.CLOSED,
                        stage: PourOverStage.SECOND_POUR,

                        durationInSeconds: 95,
                        pourParameters: { waterPercentage: 50, waterTemp: '93'}
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.FINAL,

                        durationInSeconds: 75,
                        pourParameters: { waterPercentage: 0, waterTemp: '93'}
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
        case CoffeeRecipeId.hario_switch_cafetaster : {
            return <CoffeeRecipeConfig>{
                isTimerRecipe: true,
                isImmersionDripperRecipe: true,
                coffeeParameters: {
                    beanInGrams: 15,
                    coffeeToWaterRatio: -1,
                    waterInGrams: 225
                },
                steps: [
                    {
                        switchState: SwitchState.CLOSED,
                        stage: PourOverStage.FIRST_POUR,

                        durationInSeconds: 45,
                        pourParameters: { waterPercentage: 50.2222, waterTemp: '93'}
                    },
                    {
                        switchState: SwitchState.CLOSED,
                        stage: PourOverStage.PAUSE,
                        stir: true,

                        timeFrameDisplay: {
                            showStartTimeOnly: false,
                            showTimeframe: true
                        },

                        durationInSeconds: 15,
                        pourParameters: { waterPercentage: 0, waterTemp: '93'}
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.WATER_FLOW,

                        timeFrameDisplay: {
                            showStartTimeOnly: false,
                            showTimeframe: true
                        },

                        durationInSeconds: 30,
                        pourParameters: { waterPercentage: 0, waterTemp: '93'}
                    },
                    {
                        switchState: SwitchState.CLOSED,
                        stage: PourOverStage.SECOND_POUR,

                        durationInSeconds: 60,
                        pourParameters: { waterPercentage: 49.7777, waterTemp: '93'}
                    },
                    {
                        switchState: SwitchState.OPEN,
                        stage: PourOverStage.FINAL,

                        durationInSeconds: 30,
                        pourParameters: { waterPercentage: 0, waterTemp: '93'}
                    }
                ],
                references: [
                    { 
                        description : 'https://www.facebook.com/reel/645724447883746', 
                        url: 'https://www.facebook.com/reel/645724447883746' 
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
                        pourParameters: { waterPercentage: 20, waterTemp: '93'}
                    },
                    {                        
                        stage: PourOverStage.FIRST_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,

                        durationInSeconds: 15,
                        pourParameters: { waterPercentage: 20, waterTemp: '93'}
                    },
                    {                        
                        stage: PourOverStage.PAUSE,

                        durationInSeconds: 10,
                        pourParameters: { waterPercentage: 0, waterTemp: '93'}
                    },
                    {                        
                        stage: PourOverStage.SECOND_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,

                        durationInSeconds: 10,
                        pourParameters: { waterPercentage: 20, waterTemp: '93'}
                    },
                    {                        
                        stage: PourOverStage.PAUSE,

                        durationInSeconds: 10,
                        pourParameters: { waterPercentage: 0, waterTemp: '93'}
                    },
                    {                        
                        stage: PourOverStage.THIRD_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,

                        durationInSeconds: 10,
                        pourParameters: { waterPercentage: 20, waterTemp: '93'}
                    },
                    {                        
                        stage: PourOverStage.PAUSE,

                        durationInSeconds: 10,
                        pourParameters: { waterPercentage: 0, waterTemp: '93'}
                    },
                    {                        
                        stage: PourOverStage.FOURTH_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,

                        durationInSeconds: 10,
                        pourParameters: { waterPercentage: 20, waterTemp: '93'}
                    },
                    {                        
                        stage: PourOverStage.PAUSE,
                        swirl: true,

                        durationInSeconds: 5,
                        pourParameters: { waterPercentage: 0, waterTemp: '93'}
                    },
                    {                        
                        stage: PourOverStage.FINAL,

                        durationInSeconds: 55,
                        pourParameters: { waterPercentage: 0, waterTemp: '93'}
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
                        pourParameters: { waterPercentage: 20, waterTemp: '93'}
                    },
                    {                        
                        stage: PourOverStage.FIRST_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,

                        durationInSeconds: 30,
                        pourParameters: { waterPercentage: 20, waterTemp: '93'}
                    },
                    {                        
                        stage: PourOverStage.SECOND_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,

                        durationInSeconds: 30,
                        pourParameters: { waterPercentage: 20, waterTemp: '93'}
                    },
                    {                        
                        stage: PourOverStage.THIRD_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,

                        durationInSeconds: 30,
                        pourParameters: { waterPercentage: 20, waterTemp: '93'}
                    },
                    {                        
                        stage: PourOverStage.FOURTH_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,

                        durationInSeconds: 30,
                        pourParameters: { waterPercentage: 20, waterTemp: '93'}
                    },
                    {                        
                        stage: PourOverStage.FINAL,

                        durationInSeconds: 60,
                        pourParameters: { waterPercentage: 0, waterTemp: '93'}
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
                    { stepAdjustmentName: StepAdjustment.TWO_STEPS_RATIOS, option: 'method46Standard' },
                    { stepAdjustmentName: StepAdjustment.POUR_DIVISIONS, option: 'method46EvenStronger' }
                ],
                stepAdjustments: {
                    order: [StepAdjustment.TWO_STEPS_RATIOS, StepAdjustment.POUR_DIVISIONS],
                    selectedOptions: [
                        { stepAdjustmentName: StepAdjustment.TWO_STEPS_RATIOS, option: 'method46Standard' },
                        { stepAdjustmentName: StepAdjustment.POUR_DIVISIONS, option: 'method46EvenStronger' }
                    ],
                    twoStepsRatios: {
                        canEdit: true,
                        minPercentage: 16.6667,
                        maxPercentage: 23.3333,
                        defaultSteps : [
                            {
                                stage: PourOverStage.FIRST_POUR,
                                pouringTechnique: PouringTechnique.CIRCLE,
        
                                durationInSeconds: 45,
                                pourParameters: { waterPercentage: 20, waterTemp: '93'},
                                stepAdjustment: StepAdjustment.TWO_STEPS_RATIOS
                            },
                            {                        
                                stage: PourOverStage.SECOND_POUR,
                                pouringTechnique: PouringTechnique.CIRCLE,
        
                                durationInSeconds: 45,
                                pourParameters: { waterPercentage: 20, waterTemp: '93'},
                                stepAdjustment: StepAdjustment.TWO_STEPS_RATIOS
                            }
                        ],
                        selectMode: 'OPTIONS',
                        options: [
                            { name: 'method46Sweeter', default: false, waterPercentageRatios: [16.6667, 23.3333]}, 
                            { name: 'method46Standard', default: true, useDefault: true}, 
                            { name: 'method46Brighter', default: false, waterPercentageRatios: [23.3333, 16.6667]},
                        ]
                    },
                    pourDivisions: {
                        canEdit: true,
                        maxSteps: 3,
                        totalPercentages: 60,
                        stepsStages: [PourOverStage.THIRD_POUR, PourOverStage.FOURTH_POUR, PourOverStage.FIFTH_POUR],
                        selectMode: 'OPTIONS',
                        defaultSteps: [
                            {   
                                stage: PourOverStage.THIRD_POUR,
                                pouringTechnique: PouringTechnique.CIRCLE,
        
                                durationInSeconds: 45,
                                pourParameters: { waterPercentage: 20, waterTemp: '93'},
                                stepAdjustment: StepAdjustment.POUR_DIVISIONS
                            },
                            {   
                                stage: PourOverStage.FOURTH_POUR,
                                pouringTechnique: PouringTechnique.CIRCLE,
        
                                durationInSeconds: 30,
                                pourParameters: { waterPercentage: 20, waterTemp: '93'},
                                stepAdjustment: StepAdjustment.POUR_DIVISIONS
                            },
                            {   
                                stage: PourOverStage.FIFTH_POUR,
                                pouringTechnique: PouringTechnique.CIRCLE,
        
                                durationInSeconds: 45,
                                pourParameters: { waterPercentage: 20, waterTemp: '93'},
                                stepAdjustment: StepAdjustment.POUR_DIVISIONS
                            }
                        ],
                        options: [
                            { name: 'method46Lighter', default: false, steps: [
                                {   
                                    stage: PourOverStage.THIRD_POUR,
                                    pouringTechnique: PouringTechnique.CIRCLE,
            
                                    durationInSeconds: 120,
                                    pourParameters: { waterPercentage: 60, waterTemp: '93'},
                                    stepAdjustment: StepAdjustment.POUR_DIVISIONS
                                }
                            ]},
                            { name: 'method46Stronger', default: false, steps: [
                                {   
                                    stage: PourOverStage.THIRD_POUR,
                                    pouringTechnique: PouringTechnique.CIRCLE,
            
                                    durationInSeconds: 60,
                                    pourParameters: { waterPercentage: 30, waterTemp: '93'},
                                    stepAdjustment: StepAdjustment.POUR_DIVISIONS
                                },
                                {   
                                    stage: PourOverStage.FOURTH_POUR,
                                    pouringTechnique: PouringTechnique.CIRCLE,
            
                                    durationInSeconds: 60,
                                    pourParameters: { waterPercentage: 30, waterTemp: '93'},
                                    stepAdjustment: StepAdjustment.POUR_DIVISIONS
                                },
                            ]},
                            { name: 'method46EvenStronger', default: true, useDefault: true},
                        ] 
                    },
                },
                steps: [],
                references: [
                    { 
                        description : 'How to Make Coffee Using the 4:6 Brewing Method', 
                        url: 'https://en.philocoffea.com/blogs/blog/coffee-brewing-method' 
                    }
                ]
            }
        };
        case CoffeeRecipeId.kalita_wave155_itoatsuomi : {
            return <CoffeeRecipeConfig>{
                isTimerRecipe: true,
                isImmersionDripperRecipe: false,
                showTimeframeEndTime: true,
                coffeeParameters: {
                    beanInGrams: 14,
                    coffeeToWaterRatio: -1,
                    waterInGrams: 250
                },
                steps: [
                    {
                        stage: PourOverStage.BLOOMING,
                        stir: true,

                        durationInSeconds: 25,
                        pourParameters: { waterPercentage: 20, waterTemp: '93'}
                    },
                    {                        
                        stage: PourOverStage.FIRST_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,

                        durationInSeconds: 43,
                        pourParameters: { waterPercentage: 20, waterTemp: '90-95'}
                    },
                    {                        
                        stage: PourOverStage.SECOND_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,

                        durationInSeconds: 43,
                        pourParameters: { waterPercentage: 20, waterTemp: '90-95'}
                    },
                    {                        
                        stage: PourOverStage.THIRD_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,

                        durationInSeconds: 43,
                        pourParameters: { waterPercentage: 20, waterTemp: '90-95'}
                    },
                    {                        
                        stage: PourOverStage.FOURTH_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE,

                        durationInSeconds: 43,
                        pourParameters: { waterPercentage: 20, waterTemp: '90-95'}
                    }
                ],
                references: [
                    { 
                        description : '【日本咖啡職人】手沖一杯好咖啡教學分享用kalita wave dripper', 
                        url: 'https://www.youtube.com/watch?v=IymOKUmp2vQ' 
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