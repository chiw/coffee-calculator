import type { CoffeeRecipeConfig, DripperBrand, DripperRecipe, DripperType, MetaInfo } from "./CoffeeRecipeTypes.d"; 
import {  PouringTechnique, PourOverStage, SwitchState } from "./CoffeeRecipeTypes.d";

export const CoffeeRecipeId = {
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
                    <DripperRecipe> { name: 'tetsukasuya', recipeId: CoffeeRecipeId.hario_switch_tetsukasuya },
                    <DripperRecipe> { name: 'emifukahori', recipeId: CoffeeRecipeId.hario_switch_emifukahori },
                    <DripperRecipe> { name: 'olekristianboen', recipeId: CoffeeRecipeId.hario_switch_olekristianboen },
                    <DripperRecipe> { name: 'coffeechronicler', recipeId: CoffeeRecipeId.hario_switch_coffeechronicler }
                ]
            },
            <DripperType> {
                name: 'v60',
                recipes: [
                    <DripperRecipe> { name: '46method', recipeId: CoffeeRecipeId.hario_v60_46method },
                    <DripperRecipe> { name: 'jameshoffmann', recipeId: CoffeeRecipeId.hario_v60_jameshoffmann },
                    <DripperRecipe> { name: 'mattwinton', recipeId: CoffeeRecipeId.hario_v60_mattwinton }
                ]
            }
        ]
    }
]

export const getPathFromMetaInfo = (metaInfo: MetaInfo[]) => {
    return getValueFromMetaInfo(metaInfo, 'path');
}

export const getAllDripperRecipePaths = () => {
    const paths: string[] = DripperBrandMetaInfos.map(metaInfo => getPathFromMetaInfo(metaInfo));
    console.log('getAllDripperRecipePaths', paths);
    return paths;
}

export type CoffeeRecipeChoice = {
    id: CoffeeRecipeId,
    defaultRecipe ?: true,
    metaInfos: MetaInfo[]
}



const getValueFromMetaInfo = (metaInfo: MetaInfo[], name: string): string => {
    let value = null;
    metaInfo.forEach(entry => {
        if(entry.name === name) {
            value = entry.value;
        }
    });
    return value;
}

const metaInfoHasValue = (metaInfo: MetaInfo[], name: string, value: string): boolean => {
    let hasValue = false;
    metaInfo.forEach(entry => {
        if(entry.name == name && entry.value == value) {
            hasValue = true;
        }
    });
    // console.log('metaInfo', metaInfo, 'name', name, 'value', value, 'hasValue', hasValue);
    return hasValue;
}



const generateDripperLevelMetaInfo = (brandName: string, drippers: DripperType[]): MetaInfo[][] => {
    let metaInfoArr: MetaInfo[][] = [];
    
    drippers.forEach(dripper => {
        metaInfoArr.push(createDripperMetaInfo(brandName, dripper.name));
        metaInfoArr = metaInfoArr.concat(generateRecipeMetaInfo(brandName, dripper.name, dripper.recipes));
    });
    return metaInfoArr;
}

const generateRecipeMetaInfo = (brandName: string, dripperName: string, dripperRecipes?: DripperRecipe[]): MetaInfo[][] => {
    let metaInfoArr: MetaInfo[][] = [];
    if(dripperRecipes) {
        dripperRecipes.forEach(dripperRecipe => {
            metaInfoArr.push(createRecipeMetaInfo(brandName, dripperName, dripperRecipe.name, dripperRecipe.recipeId));
        });
    }
    return metaInfoArr;
}

const createBrandMetaInfo = (brandName: string): MetaInfo[] => {
    const metaInfoArr: MetaInfo[] = [];
    metaInfoArr.push(<MetaInfo> { name: 'brand', value: brandName});
    metaInfoArr.push(<MetaInfo> { name: 'path', value: brandName});
    metaInfoArr.push(<MetaInfo> { name: 'level', value: 'brand'});
    // console.log('brandName', brandName, 'metaInforArr', metaInfoArr);
    return metaInfoArr;
}

const createDripperMetaInfo = (brandName: string, dripperName: string): MetaInfo[] => {
    const metaInfoArr: MetaInfo[] = [];
    metaInfoArr.push(<MetaInfo> { name: 'brand', value: brandName});
    metaInfoArr.push(<MetaInfo> { name: 'dripper', value: dripperName});
    metaInfoArr.push(<MetaInfo> { name: 'path', value: brandName + '/' + dripperName});
    metaInfoArr.push(<MetaInfo> { name: 'level', value: 'dripper'});
    // console.log('brandName', brandName, 'dripperName', dripperName, 'metaInforArr', metaInfoArr);
    return metaInfoArr;
}

const createRecipeMetaInfo = (brandName: string, dripperName: string, recipeName: string, recipeId: string): MetaInfo[] => {
    const metaInfoArr: MetaInfo[] = [];
    metaInfoArr.push(<MetaInfo> { name: 'brand', value: brandName});
    metaInfoArr.push(<MetaInfo> { name: 'dripper', value: dripperName});
    metaInfoArr.push(<MetaInfo> { name: 'name', value: recipeName});
    metaInfoArr.push(<MetaInfo> { name: 'recipeId', value: recipeId});
    metaInfoArr.push(<MetaInfo> { name: 'path', value: brandName + '/' + dripperName + '/' + recipeName});
    metaInfoArr.push(<MetaInfo> { name: 'level', value: 'recipe'});
    // console.log('brandName', brandName, 'dripperName', dripperName, 'recipeName', recipeName, 'recipeId', recipeId, 'metaInforArr', metaInfoArr);
    return metaInfoArr;
}

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

    // console.log('filterChoicesByRecipeMetaInfo inSearchStr=', inSearchStr, 'metaInfoNameArr=', metaInfoNameArr, 'mustBeExactWording=', mustBeExactWording, 'filteredChoices=', filteredChoices);

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

const dripperBrandMetaInfos = (dripperBrands: DripperBrand[]): MetaInfo[][] => {
    let metaInfoArr: MetaInfo[][] = [];

    dripperBrands.forEach(brand => {
        // console.log('brand', brand);
        metaInfoArr.push(createBrandMetaInfo(brand.name));
        metaInfoArr = metaInfoArr.concat(generateDripperLevelMetaInfo(brand.name, brand.drippers))
    });

    console.log('dripperBrandMetaInfos metaInfoArr', metaInfoArr);
    return metaInfoArr;
}
export const DripperBrandMetaInfos = dripperBrandMetaInfos(dripperBrands);

const generateCoffeeRecipesChoices = (): CoffeeRecipeChoice[] => {
    // console.log('recipes', recipes);
    // console.log('getAllDripperRecipePaths()', getAllDripperRecipePaths());

    let coffeeRecipesChoices: CoffeeRecipeChoice[] = [];
    let metaInfoArr : MetaInfo[][] = DripperBrandMetaInfos
        .filter(metaInfo => metaInfoHasValue(metaInfo, 'level',  'recipe'));

    // console.log('metaInfoArr', metaInfoArr);

    metaInfoArr.forEach(metaInfo => {
        let id = getValueFromMetaInfo(metaInfo, 'recipeId');
        if(id) {
            let coffeeRecipeChoice = <CoffeeRecipeChoice> {
                id: id,
                metaInfos: <MetaInfo[]> metaInfo
            };
            coffeeRecipesChoices.push(coffeeRecipeChoice);
        }
    });

    // console.log('generateCoffeeRecipesChoices coffeeRecipesChoices', coffeeRecipesChoices);
    return coffeeRecipesChoices;
}
export const CoffeeRecipesChoices = generateCoffeeRecipesChoices();

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
        case CoffeeRecipeId.hario_v60_46method : {
            return <CoffeeRecipeConfig>{
                isTimerRecipe: true,
                isImmersionDripperRecipe: false,
                coffeeParameters: {
                    beanInGrams: 20,
                    coffeeToWaterRatio: -1,
                    waterInGrams: 300
                },
                stepsDurationInSeconds: [45, 45, 45, 30, 45],
                pourParameters: [
                    { waterPercentage: 20, waterTemp: 93},
                    { waterPercentage: 20, waterTemp: 93},
                    { waterPercentage: 20, waterTemp: 93},
                    { waterPercentage: 20, waterTemp: 93},
                    { waterPercentage: 20, waterTemp: 93}
                ],
                steps: [
                    {
                        stage: PourOverStage.FIRST_POUR
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
                        
                        stage: PourOverStage.FIFTH_POUR,
                        pouringTechnique: PouringTechnique.CIRCLE
                    }
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
                stepsDurationInSeconds: [],
                pourParameters: [],
                steps: [],
                references: []
            }
        }

    }
}