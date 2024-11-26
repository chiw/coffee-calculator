export const prerender = true;
export const ssr = true;
export const trailingSlash = 'never';

import { i18n } from '$lib/i18n.js';
import { base } from '$app/paths';
import { error, redirect } from '@sveltejs/kit';

import { getAllDripperRecipePaths, searchRecipeIdByParams, type CoffeeRecipeSearchResult } from '$lib/coffee-recipes/CoffeeRecipeConstants';
import type { EntryGenerator } from './$types.js';
import { getPathFromMetaInfo } from '$lib/coffee-recipes/MetaInfoUtils.js';

export const load = ({ params }) => {
    console.log('page load', params);

    let pathParamsArr = params.slug.split('/').filter(val => val);
    console.log('pathParamsArr', pathParamsArr);

    let searchResult : CoffeeRecipeSearchResult = searchRecipeIdByParams(pathParamsArr);

    if(searchResult.requiresRedirect) {
        // let path = base + "/recipe/" + searchResult.result.id.replaceAll("_", "/");
        let path = base + "/recipe/" + getPathFromMetaInfo(searchResult.result.metaInfos);
        
        let i18nResolveRoute = i18n.resolveRoute(path);
        console.log('requires to redirect', path, i18nResolveRoute);

        // redirect(i18n.resolveRoute("/base/about", "de"))
        // redirect(302, path);
        redirect(302, i18nResolveRoute);
    } else {
        console.log('does not require to redirect', searchResult.result.id);
        return {
            recipeId: searchResult.result.id
        }
    }
}

export const entries: EntryGenerator = () => {
    let paths: string[] = [];
    
    getAllDripperRecipePaths().forEach(path => paths.push({ slug: path}));

    return paths;
};