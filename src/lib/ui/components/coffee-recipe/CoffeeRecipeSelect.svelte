<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';

    import { CoffeeRecipesChoices } from '$lib/coffee-recipes';

    import { StopWatchState, StopWatchStore, getStopWatchStore } from '$lib/runes/stopwatch/';
    import { getCoffeeRecipeStore } from '$lib/runes/coffee-recipe';

    const stopwatch: StopWatchStore = getStopWatchStore();
    const coffeeRecipeStore = getCoffeeRecipeStore();
</script>

<div class="flex flex-row ">
    <div class="text-xl font-bold italic mr-3">{m.label_recipe()}</div>
    {#if StopWatchState.RUNNING === stopwatch.stopwatchState}
        <div>{ CoffeeRecipesChoices.find((c) => c.id == coffeeRecipeStore.recipeId)?.displayLabelId }</div>
    {:else}
        <select class="border border-slate-200" bind:value={coffeeRecipeStore.recipeId}>
            {#each CoffeeRecipesChoices as option}
                <option value={option.id}>{option.displayLabelId}</option>
            {/each}
        </select>
    {/if}
</div>