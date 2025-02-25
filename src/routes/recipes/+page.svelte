<script lang="ts">
	import {
		RecipeSelectMenu,
		CoffeeRecipeWithTimerDisplay,
		RecipeReferencesDisplay
	} from '$lib/ui/components/coffee-recipe';

	import { getCoffeeRecipeRunes } from '$lib/runes/coffee-recipe';
	const coffeeRecipeRunes = getCoffeeRecipeRunes();

	import LanguageSwitcher from '$lib/ui/components/lang/LanguageSwitcher.svelte';
</script>

<div class="m-3">
	<div class="flex flex-row items-stretch">
		<!-- <div class="grow"><RecipeSelect /></div> -->
		<div class="grow"><RecipeSelectMenu selectedOption={coffeeRecipeRunes.recipeId} /></div>
		<div class="grow-0"><LanguageSwitcher /></div>
	</div>

	{#if coffeeRecipeRunes.coffeeRecipe}
		<div class="mt-5">
			<CoffeeRecipeWithTimerDisplay coffeeRecipeSteps={coffeeRecipeRunes.coffeeRecipeSteps} />
		</div>

		<RecipeReferencesDisplay />
	{:else}
		<div>No Recipe</div>
	{/if}
</div>
