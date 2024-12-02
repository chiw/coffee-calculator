<script lang="ts">
    import { CoffeeRecipeMenu } from '$lib/coffee-recipes';

    import { StopWatchState, StopWatchStore, getStopWatchStore } from '$lib/runes/stopwatch/';
    import { getCoffeeRecipeStore } from '$lib/runes/coffee-recipe';
	import { brandMessageKey, coffeeRecipeIdSelectMessageKey, dripperMessageKey } from './CoffeeReceipeMessageKeys';

    const stopwatch: StopWatchStore = getStopWatchStore();
    const coffeeRecipeStore = getCoffeeRecipeStore();
</script>

<div class="flex flex-row ">
    {#if StopWatchState.RUNNING === stopwatch.stopwatchState}
        <div>{ coffeeRecipeIdSelectMessageKey(coffeeRecipeStore.recipeId)() }</div>
    {:else}
        <select class="border border-slate-200 w-full h-[2rem]" bind:value={coffeeRecipeStore.recipeId}>
            {#each CoffeeRecipeMenu as menuGroup, i}
                <optgroup label={brandMessageKey(menuGroup.brandName)() + ' ' + dripperMessageKey(menuGroup.dripperName)()}>
                    {#each menuGroup.items as item, j}
                        <option value={item.id}>{coffeeRecipeIdSelectMessageKey(item.id)()}</option>
                    {/each}
                </optgroup>
            {/each}
        </select>
    {/if}
</div>