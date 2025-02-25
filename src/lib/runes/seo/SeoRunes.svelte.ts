import { getContext, setContext } from 'svelte';
import type { CoffeeRecipe } from '$lib/coffee-recipes';
import type { RecipeSEOData } from '$lib/coffee-recipes/CoffeeRecipeTypes';
import { stopImmediatePropagation } from 'svelte/legacy';
import { getFullUrl } from '$lib/utils/url';

export interface SeoState {
	title: string;
	description: string;
	canonicalUrl: string;
	recipe?: CoffeeRecipe;
	seoData?: RecipeSEOData;
	keywords: string;
}

export function createSeoRunes() {
	const state = $state<SeoState>({
		title: 'Coffee Calculator Recipes',
		description:
			'Coffee Calculator Recipes helps you brew the perfect cup of pour-over coffee with various of recipes.',
		canonicalUrl: '',
		recipe: undefined,
		keywords: ''
	});

	function updateSeo(recipeSeoData: RecipeSEOData) {
		const path = window.location.pathname;
		console.log('updateSeo path', path);
		let seoState = <SeoState>{
			title:
				'Coffee Calculator Recipes - ' + recipeSeoData.recipeName + ' by ' + recipeSeoData.author,
			description:
				'A timer app helps you brew pour-over coffee with recipe create by ' +
				recipeSeoData.author +
				' using ' +
				recipeSeoData.dripperBrand +
				' ' +
				recipeSeoData.dripperType,
			canonicalUrl: getFullUrl(path),
			seoData: recipeSeoData,
			keywords: [
				recipeSeoData.author,
				recipeSeoData.recipeName,
				recipeSeoData.dripperBrand,
				recipeSeoData.dripperType
			].join(', ')
		};
		Object.assign(state, seoState);
	}

	function getStructuredData() {
		if (state.recipe) {
			return {
				'@context': 'https://schema.org',
				'@type': 'Recipe',
				name: state.recipe.name,
				description: state.description,
				recipeCategory: 'Pour-over Coffee',
				recipeCuisine: 'Beverage',
				// "recipeIngredient": [
				//     `${state.recipe.coffeeWeight}g coffee beans`,
				//     `${state.recipe.waterWeight}ml water`
				// ],
				// "recipeInstructions": state.recipe.steps.map((step, index) => ({
				//     "@type": "HowToStep",
				//     "position": index + 1,
				//     "text": step.description,
				//     "timingInSeconds": step.duration
				// })),
				tools: [
					// state.recipe.equipment,
					// "Coffee Grinder",
					// "Scale"
					state.seoData?.dripperBrand + ' ' + state.seoData?.dripperType
				]
			};
		}

		return {
			'@context': 'https://schema.org',
			'@type': 'WebApplication',
			name: state.title,
			applicationCategory: 'LifestyleApplication',
			description: state.description,
			url: state.canonicalUrl
		};
	}

	return {
		get state() {
			return state;
		},
		updateSeo,
		getStructuredData
	};
}

const SEO_RUNES_CONTEXT_KEY = Symbol('SEO_RUNES_CONTEXT_KEY');

export const setSeoRunes = () => {
	return setContext(SEO_RUNES_CONTEXT_KEY, createSeoRunes());
};

export const getSeoRunes = () => {
	return getContext<ReturnType<typeof createSeoRunes>>(SEO_RUNES_CONTEXT_KEY);
};
