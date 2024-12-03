<script lang="ts">
    import { Menu } from '$lib/coffee-recipes';

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
            {#each Menu.brandMenus as brandMenu, i}
                {#each brandMenu.dripperMenus as dripperMenu, j}
                    <optgroup label={brandMessageKey(dripperMenu.brandName)() + ' ' + dripperMessageKey(dripperMenu.dripperName)()}>
                        {#each dripperMenu.recipeMenus as item, j}
                            <option value={item.id}>{coffeeRecipeIdSelectMessageKey(item.id)()}</option>
                        {/each}
                    </optgroup>
                {/each}                
            {/each}
        </select>
    {/if}
</div>