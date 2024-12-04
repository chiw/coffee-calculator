export const prerender = true;
export const ssr = true;
export const trailingSlash = 'never';

import { i18n } from '$lib/i18n.js';
import { base } from '$app/paths';
import { error, redirect } from '@sveltejs/kit';

import { AllRecipePaths, searchRecipeIdByParams, type CoffeeRecipeSearchResult } from '$lib/coffee-recipes/CoffeeRecipeConstants';
import type { EntryGenerator } from './$types.js';
import { getPathFromMetaInfo, getValueFromMetaInfo, MetaInfoKey } from '$lib/coffee-recipes/MetaInfoUtils.js';

export const load = ({ params }) => {
    console.log('page load', params);

    let pathParamsArr = params.slug.split('/').filter(val => val);
    console.log('pathParamsArr', pathParamsArr);

    let searchResult : CoffeeRecipeSearchResult = searchRecipeIdByParams(pathParamsArr);

    if(searchResult.requiresRedirect) {
        let path = base + "/recipe/" + getPathFromMetaInfo(searchResult.metaInfos);
        
        let i18nResolveRoute = i18n.resolveRoute(path);
        console.log('requires to redirect', path, i18nResolveRoute);

        redirect(302, i18nResolveRoute);
    } else {
        let recipeId = getValueFromMetaInfo(searchResult.metaInfos, MetaInfoKey.recipeId);
        console.log('does not require to redirect', recipeId);
        return {
            recipeId: recipeId
        }
    }
}

export const entries: EntryGenerator = () => {
    let paths: string[] = [];
    
    AllRecipePaths.forEach(path => paths.push({ slug: path}));

    return paths;
};