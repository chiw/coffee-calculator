<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';

    import { getContext } from "svelte";

    import { StopWatchState } from '$lib/runes/StopwatchState.type';
    
    import { CofeeRecipesChoices } from '$lib/recipes/CoffeeRecipeConstants';
    
	import CoffeeRecipeDisplay from '$lib/ui/components/CoffeeRecipeDisplay.svelte';

    import { getStopWatchStore } from '$lib/runes/StopWatchStore.svelte';
    const stopwatch = getStopWatchStore();

    const coffeeRecipeStore = getContext("coffeeRecipeStore");
</script>

<div class="m-3">
    
    <div class="flex flex-row ">
        <div class="text-xl font-bold italic mr-3">{m.label_recipe()}</div>
        {#if StopWatchState.RUNNING === stopwatch.stopwatchState}
            <div>{ CofeeRecipesChoices.find((c) => c.id == coffeeRecipeStore.recipeId)?.displayLabelId }</div>
        {:else}
            <select class="border border-slate-200" bind:value={coffeeRecipeStore.recipeId}>
                {#each CofeeRecipesChoices as option}
                    <option value={option.id}>{option.displayLabelId}</option>
                {/each}
            </select>
        {/if}
    </div>

    <CoffeeRecipeDisplay coffeeRecipe={coffeeRecipeStore.coffeeRecipe}
        beanInGrams={coffeeRecipeStore.beanInGrams} coffeeToWaterRatio={coffeeRecipeStore.coffeeToWaterRatio} waterInGrams={coffeeRecipeStore.waterInGrams} 
        coffeeRecipeSteps={coffeeRecipeStore.coffeeRecipeSteps}
        />

</div>
