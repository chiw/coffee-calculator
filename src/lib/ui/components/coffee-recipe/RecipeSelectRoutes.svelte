<script lang="ts">
    import { i18n } from '$lib/i18n.js';
    import { base } from '$app/paths';
    import { Menu } from '$lib/coffee-recipes';
    
    import { StopWatchState, StopWatchRunes, getStopWatchRunes } from '$lib/runes/stopwatch/';
    import { getCoffeeRecipeRunes } from '$lib/runes/coffee-recipe';
	import { brandMessageKey, coffeeRecipeIdSelectMessageKey, dripperMessageKey } from './CoffeeReceipeMessageKeys';
    import { goto } from '$app/navigation';
	

    const stopwatch: StopWatchRunes = getStopWatchRunes();
    const coffeeRecipeRunes = getCoffeeRecipeRunes();

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
    {#if stopwatch.isRunning() }
        <div>{ coffeeRecipeIdSelectMessageKey(coffeeRecipeRunes.recipeId)() }</div>
    {:else}
        <select class="border border-slate-200 w-full h-[2rem]" bind:value={selectedOption} onchange={onChangeRecipe}>
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