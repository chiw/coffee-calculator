export const prerender = true;
export const ssr = true;
export const trailingSlash = 'never';

import { i18n } from '$lib/i18n.js';
import { base } from '$app/paths';
import { redirect } from '@sveltejs/kit';

import {
	AllRecipePaths,
	searchRecipeIdByParams,
	type CoffeeRecipeSearchResult
} from '$lib/coffee-recipes/CoffeeRecipeConstants';
import type { EntryGenerator } from './$types.js';
import {
	getPathFromMetaInfo,
	getValueFromMetaInfo,
	MetaInfoKey
} from '$lib/coffee-recipes/MetaInfoUtils.js';

export const load = ({ params }) => {
	console.log('page load', params);

	const pathParamsArr = params.slug.split('/').filter((val) => val);
	console.log('pathParamsArr', pathParamsArr);

	const searchResult: CoffeeRecipeSearchResult = searchRecipeIdByParams(pathParamsArr);

	if (searchResult.requiresRedirect) {
		const path = base + '/recipe/' + getPathFromMetaInfo(searchResult.metaInfos);

		const i18nResolveRoute = i18n.resolveRoute(path);
		console.log('requires to redirect', path, i18nResolveRoute);

		redirect(302, i18nResolveRoute);
	} else {
		const recipeId = getValueFromMetaInfo(searchResult.metaInfos, MetaInfoKey.recipeId);
		console.log('does not require to redirect', recipeId);
		return {
			recipeId: recipeId
		};
	}
};

export const entries: EntryGenerator = () => {
	const paths: string[] = [];

	AllRecipePaths.forEach((path) => paths.push({ slug: path }));

	return paths;
};
