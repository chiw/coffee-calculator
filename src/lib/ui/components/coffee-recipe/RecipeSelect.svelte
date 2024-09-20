<script lang="ts">
    import { CoffeeRecipesChoices } from '$lib/coffee-recipes';

    import { StopWatchState, StopWatchStore, getStopWatchStore } from '$lib/runes/stopwatch/';
    import { getCoffeeRecipeStore } from '$lib/runes/coffee-recipe';
	import { coffeeRecipeIdSelectMessageKey } from './CoffeeReceipeMessageKeys';

    const stopwatch: StopWatchStore = getStopWatchStore();
    const coffeeRecipeStore = getCoffeeRecipeStore();
</script>

<div class="flex flex-row ">
    {#if StopWatchState.RUNNING === stopwatch.stopwatchState}
        <div>{ coffeeRecipeIdSelectMessageKey(coffeeRecipeStore.recipeId)() }</div>
    {:else}
        <select class="border border-slate-200 w-full h-[2rem]" bind:value={coffeeRecipeStore.recipeId}>
            {#each CoffeeRecipesChoices as option}
                <option value={option.id}>{coffeeRecipeIdSelectMessageKey(option.id)()}</option>
            {/each}
        </select>
    {/if}
</div>