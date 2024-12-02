<script lang="ts">
    import { i18n } from '$lib/i18n.js';
    import { base } from '$app/paths';
    import { CoffeeRecipeMenu } from '$lib/coffee-recipes';
    
    import { StopWatchState, StopWatchStore, getStopWatchStore } from '$lib/runes/stopwatch/';
    import { getCoffeeRecipeStore } from '$lib/runes/coffee-recipe';
	import { brandMessageKey, coffeeRecipeIdSelectMessageKey, dripperMessageKey } from './CoffeeReceipeMessageKeys';
    import { goto } from '$app/navigation';
	

    const stopwatch: StopWatchStore = getStopWatchStore();
    const coffeeRecipeStore = getCoffeeRecipeStore();

    let { selectedOption } = $props();

    const getCoffeeRecipePath = (pathParams) => {
        
        // return '/recipe' + '/' + pathParams[0] + '/' + pathParams[1] + '/' + pathParams[2];
        let path = base +  '/recipe' + '/' + pathParams[0] + '/' + pathParams[1] + '/' + pathParams[2];
        console.log('getCoffeeRecipePath', pathParams, path);

        return path;
    }

    const onChangeRecipe = (e) => {
        const pathParams = selectedOption.split('_');
        const path = getCoffeeRecipePath(pathParams);
        
        console.log('onChangeRecipe', path);
        goto(i18n.resolveRoute(path));
    }

</script>

<div class="flex flex-row ">
    {#if StopWatchState.RUNNING === stopwatch.stopwatchState}
        <div>{ coffeeRecipeIdSelectMessageKey(coffeeRecipeStore.recipeId)() }</div>
    {:else}
        <select class="border border-slate-200 w-full h-[2rem]" bind:value={selectedOption} onchange={onChangeRecipe}>
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