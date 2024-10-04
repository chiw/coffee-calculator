import type { CoffeeRecipeConfig, CoffeeRecipeInfo, MetaInfo } from "./CoffeeRecipeTypes.d"; 
import { DripperBrand, DripperType, PouringTechnique, PourOverStage, SwitchState } from "./CoffeeRecipeTypes.d";

export const CoffeeRecipeId = {
    hario_switch_tetsukasuya: 'hario_switch_tetsukasuya',
    hario_switch_emifukahori: 'hario_switch_emifukahori',
    hario_switch_olekristianboen: 'hario_switch_olekristianboen',
    hario_switch_coffeechronicler: 'hario_switch_coffeechronicler',
    hario_v60_jameshoffmann: 'hario_v60_jameshoffmann',
    hario_v60_mattwinton: 'hario_v60_mattwinton'
} as const;
export type CoffeeRecipeId = keyof typeof CoffeeRecipeId;

export const coffeeRecipePaths = () => {
    let paths: string[] = [];
    Object.keys(CoffeeRecipeId).forEach( key => {
        let params = key.split('_');
        let brand = params[0];
        let dripper = params[1];
        let recipe_name = params[2];
        paths.push(brand + '/' + dripper + '/' + recipe_name);
    });
    return paths;
}

export type CoffeeRecipeChoice = {
    id: CoffeeRecipeId,
    info: CoffeeRecipeInfo,
    defaultRecipe ?: true,
    metaInfos: MetaInfo[]
}

const generateCoffeeRecipesChoices = (): CoffeeRecipeChoice[] => {
    let coffeeRecipesChoices: CoffeeRecipeChoice[] = [];
    Object.keys(CoffeeRecipeId).forEach(key => {
        let params = key.split('_');
        let brand = params[0];
        let dripper = params[1];
        let recipe_name = params[2];

        let coffeeRecipeChoice = <CoffeeRecipeChoice> {
            id: CoffeeRecipeId[key],
            metaInfos: <MetaInfo[]> [
                { name: 'brand', value: DripperBrand[brand]},
                { name: 'dripper', value: DripperType[dripper]},
                { name: 'name', value: recipe_name}
            ]
        }
        // console.log('generateCoffeeRecipesChoices ', brand, dripper, recipe_name, coffeeRecipeChoice);

        coffeeRecipesChoices.push(coffeeRecipeChoice);
    });
    return coffeeRecipesChoices;
}
export const CoffeeRecipesChoices = generateCoffeeRecipesChoices();

export type CoffeeRecipeSearchResult = {
    result: CoffeeRecipeChoice,
    requiresRedirect: boolean
}

export const searchRecipeIdByParams = (inParams: string[]) :CoffeeRecipeSearchResult  => {
    let filteredChoices = CoffeeRecipesChoices;
    let result: CoffeeRecipeChoice;

    let metaInfoSearchKeys = ['brand', 'dripper', 'name'];

    inParams.forEach((inSearchStr, index) => {
        if(!result) {
            let tmpFilteredChoices = filterChoicesByRecipeMetaInfo(filteredChoices, inSearchStr, [metaInfoSearchKeys[index]], true);
            if(tmpFilteredChoices && tmpFilteredChoices.length == 1) {
                result = tmpFilteredChoices[0];
            } else {
                filteredChoices = tmpFilteredChoices;
            }
        }
    });

    if(!result) {
        return <CoffeeRecipeSearchResult> {
            result: (filteredChoices.length > 0) ?  filteredChoices[0] : CoffeeRecipesChoices[0],
            requiresRedirect: true
        }
    }

    return <CoffeeRecipeSearchResult> {
        result: result,
        requiresRedirect: false
    }
}

export const filterChoicesByRecipeMetaInfo = (
    inChoices: CoffeeRecipeChoice[], inSearchStr: string, 
    metaInfoNameArr: string[], mustBeExactWording: boolean) : CoffeeRecipeChoice[] => {

    let filteredChoices = inChoices.filter((choice) => matchChoice(choice, inSearchStr, metaInfoNameArr, mustBeExactWording));

    console.log('filterChoicesByRecipeMetaInfo inSearchStr=', inSearchStr, 'metaInfoNameArr=', metaInfoNameArr, 'mustBeExactWording=', mustBeExactWording, 'filteredChoices=', filteredChoices);

    return filteredChoices;
}

const matchChoice = (choice: CoffeeRecipeChoice, inSearchStr: string, metaInfoNameArr: string[], mustBeExactWording: boolean) => {
    if(choice && inSearchStr) {
        let match = choice.metaInfos
            .filter((metaInfo) => metaInfoNameArr.includes(metaInfo.name))
            .filter((metaInfo) => (mustBeExactWording) ? metaInfo.value == inSearchStr : metaInfo.value.includes(inSearchStr) )
            .length > 0;

        // console.log('match=', match, 'choice.metaInfos=', choice.metaInfos, 'inSearchStr=', inSearchStr, 'metaInfoNameArr=', metaInfoNameArr, 'mustBeExactWording=', mustBeExactWording);
        return match;
    }
    return false;
}

export const firstChoice = (inChoices: CoffeeRecipeChoice[], defaultRecipeId: CoffeeRecipeId): CoffeeRecipeId => {
    return (inChoices && inChoices.length >= 1) ? inChoices[0].id : defaultRecipeId;
}

export const getCoffeeRecipeDefaultConfig = (coffeeRecipId: CoffeeRecipeId) : CoffeeRecipeConfig => {
    switch(coffeeRecipId) {
        case CoffeeRecipeId.hario_switch_tetsukasuya : {
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
        case CoffeeRecipeId.hario_switch_emifukahori : {
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
        case CoffeeRecipeId.hario_switch_olekristianboen : {
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
        case CoffeeRecipeId.hario_switch_coffeechronicler : {
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
        case CoffeeRecipeId.hario_v60_jameshoffmann : {
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
        case CoffeeRecipeId.hario_v60_mattwinton : {
            return <CoffeeRecipeConfig>{
                isTimerRecipe: true,
                isImmersionDripperRecipe: false,
                coffeeParameters: {
                    beanInGrams: 20,
                    coffeeToWaterRatio: -1,
                    waterInGrams: 300
                },
                stepsDurationInSeconds: [30, 30, 30, 30, 30, 60],
                pourParameters: [
                    { waterPercentage: 20, waterTemp: 93},
                    { waterPercentage: 20, waterTemp: 93},
                    { waterPercentage: 20, waterTemp: 93},
                    { waterPercentage: 20, waterTemp: 93},
                    { waterPercentage: 20, waterTemp: 93}
                ],
                steps: [
                    {
                        stage: PourOverStage.BLOOMING
                    },
                    {
                        
                        stage: PourOverStage.FIRST_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE
                    },
                    {
                        
                        stage: PourOverStage.SECOND_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE
                    },
                    {
                        
                        stage: PourOverStage.THIRD_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE
                    },
                    {
                        
                        stage: PourOverStage.FOURTH_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE
                    },
                    {                        
                        stage: PourOverStage.FINAL
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