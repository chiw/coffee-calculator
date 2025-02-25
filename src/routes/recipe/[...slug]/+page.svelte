<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	console.log('data', data);

	import {
		CoffeeRecipeWithTimerDisplay,
		RecipeReferencesDisplay,
		RecipeSelectMenu,
		LanguageSwitcher
	} from '$lib/ui/components/coffee-recipe';

	// import { getSeoRunes } from '$lib/runes/seo/SeoRunes.svelte';
	import { getCoffeeRecipeRunes } from '$lib/runes/coffee-recipe';

	import { getKeyByValue } from '$lib/utils/ObjectUtils';
	import { CoffeeRecipeId } from '$lib/coffee-recipes';
	import { afterNavigate } from '$app/navigation';

	const coffeeRecipeRunes = getCoffeeRecipeRunes();

	afterNavigate(() => {
		console.log('afterNavigate');
		coffeeRecipeRunes.recipeId = getKeyByValue(CoffeeRecipeId, data.recipeId.toString());
	});
</script>

<!-- <h1>Use the {@html data.recipeId}</h1> -->

<div class="m-2">
	<div class="flex flex-row items-stretch">
		<div class="grow"><RecipeSelectMenu selectedOption={coffeeRecipeRunes.recipeId} /></div>
		<div class="grow-0"><LanguageSwitcher /></div>
	</div>

	{#if coffeeRecipeRunes.coffeeRecipe}
		<div class="mt-0">
			<CoffeeRecipeWithTimerDisplay coffeeRecipeSteps={coffeeRecipeRunes.coffeeRecipeSteps} />
		</div>

		<RecipeReferencesDisplay />
	{:else}
		<div>No Recipe</div>
	{/if}
</div>
