import type { MetaInfo, MetaInfos } from "./CoffeeRecipeTypes";

/**
 * How to use MetaInfo
 * - MetaInfo is a key value structure which has following fields:
 *      - name
 *      - value
 * - MetaInfos contains an array of MetaInfo
 * 
 * For Brand / Dripper / Recipe, they have their MetaInfo values
 * 
 * - Brand's meta info array (MetaInfos):
 *      - brand
 *      - path
 *      - level = 'brand'
 * - Dripper's meta info array (MetaInfos):
 *      - brand
 *      - dripper
 *      - path
 *      - level = 'dripper'
 * - Recipe's meta info array (MetaInfos):
 *      - brand
 *      - dripper
 *      - name
 *      - recipeId
 *      - path
 *      - isDefaultRecipe
 *      - level = 'recipe'
 * 
 */

export const MetaInfoKey = {
    brand: 'brand',
    path: 'path',
    level: 'level',
    dripper: 'dripper',
    name: 'name',
    recipeId: 'recipeId',
    isDefaultRecipe: 'isDefaultRecipe'   
} as const;
export type MetaInfoKey = keyof typeof MetaInfoKey;

export const MetaInfoLevel = {
    brand: 'brand',
    dripper: 'dripper',
    recipe: 'recipe'
} as const;
export type MetaInfoLevel = keyof typeof MetaInfoLevel;

export type MetaInfosSearchParam = {
    metaInfoKey: MetaInfoKey,
    searchStr: string,
    exactWording: boolean
}

const convertToMetaInfos = (metaInfoArr: MetaInfo[]): MetaInfos => {
    return <MetaInfos> {
        values: metaInfoArr
    }
}

export const createBrandMetaInfo = (brandName: string): MetaInfos => {
    const metaInfoArr: MetaInfo[] = [];
    metaInfoArr.push(<MetaInfo> { name: MetaInfoKey.brand, value: brandName});
    metaInfoArr.push(<MetaInfo> { name: MetaInfoKey.path, value: brandName});
    metaInfoArr.push(<MetaInfo> { name: MetaInfoKey.level, value: MetaInfoLevel.brand});
    // console.log('brandName', brandName, 'metaInforArr', metaInfoArr);
    // return metaInfoArr;
    return convertToMetaInfos(metaInfoArr);
}

export const createDripperMetaInfo = (brandName: string, dripperName: string): MetaInfos => {
    const metaInfoArr: MetaInfo[] = [];
    metaInfoArr.push(<MetaInfo> { name: MetaInfoKey.brand, value: brandName});
    metaInfoArr.push(<MetaInfo> { name: MetaInfoKey.dripper, value: dripperName});
    metaInfoArr.push(<MetaInfo> { name: MetaInfoKey.path, value: brandName + '/' + dripperName});
    metaInfoArr.push(<MetaInfo> { name: MetaInfoKey.level, value: MetaInfoLevel.dripper});
    // console.log('brandName', brandName, 'dripperName', dripperName, 'metaInforArr', metaInfoArr);
    // return metaInfoArr;
    return convertToMetaInfos(metaInfoArr);
}

export const createRecipeMetaInfo = (brandName: string, dripperName: string, recipeName: string, recipeId: string, isDefaultRecipe: boolean = false): MetaInfos => {
    const metaInfoArr: MetaInfo[] = [];
    metaInfoArr.push(<MetaInfo> { name: MetaInfoKey.brand, value: brandName});
    metaInfoArr.push(<MetaInfo> { name: MetaInfoKey.dripper, value: dripperName});
    metaInfoArr.push(<MetaInfo> { name: MetaInfoKey.name, value: recipeName});
    metaInfoArr.push(<MetaInfo> { name: MetaInfoKey.recipeId, value: recipeId});
    metaInfoArr.push(<MetaInfo> { name: MetaInfoKey.path, value: brandName + '/' + dripperName + '/' + recipeName});
    metaInfoArr.push(<MetaInfo> { name: MetaInfoKey.level, value: MetaInfoLevel.recipe});
    if(isDefaultRecipe) {
        metaInfoArr.push(<MetaInfo> { name: MetaInfoKey.isDefaultRecipe, value: 'true'});
    }
    // console.log('brandName', brandName, 'dripperName', dripperName, 'recipeName', recipeName, 'recipeId', recipeId, 'metaInforArr', metaInfoArr);
    // return metaInfoArr;
    return convertToMetaInfos(metaInfoArr);
}

export const getPathFromMetaInfo = (metaInfos: MetaInfos): string => {
    return getValueFromMetaInfo(metaInfos, MetaInfoKey.path);
}

export const getValueFromMetaInfo = (metaInfos: MetaInfos, name: string): string => {
    let value = null;
    metaInfos.values.forEach(entry => {
        if(entry.name === name) {
            value = entry.value;
        }
    });
    return value;
}

export const metaInfoHasValue = (metaInfos: MetaInfos, name: string, value: string): boolean => {
    let hasValue = false;
    if(metaInfos && metaInfos.values) {
        metaInfos.values.forEach(entry => {
            if(entry.name == name && entry.value == value) {
                hasValue = true;
            }
        });
    }
    // console.log('metaInfo', metaInfo, 'name', name, 'value', value, 'hasValue', hasValue);
    return hasValue;
}

export const isBrandMetaInfo = (metaInfos: MetaInfos): boolean => {
    return metaInfoHasValue(metaInfos, MetaInfoKey.level, MetaInfoLevel.brand);
}

export const isDripperMetaInfo = (metaInfos: MetaInfos): boolean => {
    return metaInfoHasValue(metaInfos, MetaInfoKey.level, MetaInfoLevel.dripper);
}

export const isRecipeMetaInfo = (metaInfos: MetaInfos): boolean => {
    return metaInfoHasValue(metaInfos, MetaInfoKey.level, MetaInfoLevel.recipe);
}

export const isDefaultRecipe = (metaInfos: MetaInfos): boolean => {
    return metaInfoHasValue(metaInfos, MetaInfoKey.isDefaultRecipe, 'true');
}

export const metaInfoIsMatched = (metaInfos: MetaInfos, metaInfoSearchParam: MetaInfosSearchParam) => {
    let inSearchStr = metaInfoSearchParam.searchStr;
    let metaInfoNameArr = [metaInfoSearchParam.metaInfoKey];
    let exactWording = metaInfoSearchParam.exactWording;

    if(metaInfos && inSearchStr) {
        let match = metaInfos.values
            .filter((metaInfo) => metaInfoNameArr.includes(metaInfo.name))
            .filter((metaInfo) => (exactWording) ? metaInfo.value == inSearchStr : metaInfo.value.includes(inSearchStr) )
            .length > 0;

        // console.log('match=', match, 'choice.metaInfos=', choice.metaInfos, 'inSearchStr=', inSearchStr, 'metaInfoNameArr=', metaInfoNameArr, 'mustBeExactWording=', mustBeExactWording);
        return match;
    }
    return false;
}

export const createSearchParams = (inParams: string[]): MetaInfosSearchParam[] => {
    let searchParams: MetaInfosSearchParam[] = [];

    let metaInfoSearchKeys = [MetaInfoKey.brand, MetaInfoKey.dripper, MetaInfoKey.name];

    inParams.forEach((searchStr, index) => {
        searchParams.push(<MetaInfosSearchParam> {
            metaInfoKey: metaInfoSearchKeys[index],
            searchStr: searchStr,
            exactWording: true
        });
    });

    // console.log('createSearchParams', searchParams);
    return searchParams;
}

const filterMetaInfosBySearchParam = (inMetaInfosArr: MetaInfos[], searchParam: MetaInfosSearchParam) : MetaInfos[] => {
    let filteredMetaInfosArr = inMetaInfosArr.filter((metaInfos) => metaInfoIsMatched(metaInfos, searchParam));
    
    // console.log('filterMetaInfosBySearchStr', searchParam, filteredMetaInfosArr);

    return filteredMetaInfosArr;
}

export const filterMetaInfosBySearchParams = (inMetaInfoArr: MetaInfos[], searchParams: MetaInfosSearchParam[]): MetaInfos[] => {
    let filteredMetaInfosArr = inMetaInfoArr;
    searchParams.forEach((searchParam) => {
        filteredMetaInfosArr = filterMetaInfosBySearchParam(filteredMetaInfosArr, searchParam);
    });

    // console.log('filterMetaInfosBySearchParams', filteredMetaInfosArr);
    return filteredMetaInfosArr;
}