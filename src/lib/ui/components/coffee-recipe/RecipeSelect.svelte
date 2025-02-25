<script lang="ts">
	import { Menu } from '$lib/coffee-recipes';

	import { StopWatchRunes, getStopWatchRunes } from '$lib/runes/stopwatch/';
	import { getCoffeeRecipeRunes } from '$lib/runes/coffee-recipe';
	import {
		brandMessageKey,
		coffeeRecipeIdSelectMessageKey,
		dripperMessageKey
	} from './CoffeeReceipeMessageKeys';

	const stopwatch: StopWatchRunes = getStopWatchRunes();
	const coffeeRecipeRunes = getCoffeeRecipeRunes();
</script>

<div class="flex flex-row">
	{#if stopwatch.isRunning()}
		<div>{coffeeRecipeIdSelectMessageKey(coffeeRecipeRunes.recipeId)()}</div>
	{:else}
		<select class="border border-slate-200 w-full h-[2rem]" bind:value={coffeeRecipeRunes.recipeId}>
			{#each Menu.brandMenus as brandMenu}
				{#each brandMenu.dripperMenus as dripperMenu}
					<optgroup
						label={brandMessageKey(dripperMenu.brandName)() +
							' ' +
							dripperMessageKey(dripperMenu.dripperName)()}
					>
						{#each dripperMenu.recipeMenus as item}
							<option value={item.id}>{coffeeRecipeIdSelectMessageKey(item.id)()}</option>
						{/each}
					</optgroup>
				{/each}
			{/each}
		</select>
	{/if}
</div>
