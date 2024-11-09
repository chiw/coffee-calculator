export const prerender = true;
export const ssr = true;
export const trailingSlash = 'always';

import { base } from '$app/paths';
import { error, redirect } from '@sveltejs/kit';

import { getAllDripperRecipePaths, getPathFromMetaInfo, searchRecipeIdByParams, type CoffeeRecipeSearchResult } from '$lib/coffee-recipes/CoffeeRecipeConstants';
import type { EntryGenerator } from './$types.js';

export const load = ({ params }) => {
    console.log('page load', params);

    let pathParamsArr = params.slug.split('/').filter(val => val);
    console.log('pathParamsArr', pathParamsArr);

    let searchResult : CoffeeRecipeSearchResult = searchRecipeIdByParams(pathParamsArr);

    if(searchResult.requiresRedirect) {
        // let path = base + "/recipe/" + searchResult.result.id.replaceAll("_", "/");
        let path = base + "/recipe/" + getPathFromMetaInfo(searchResult.result.metaInfos);

        redirect(302, path);
    } else {
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