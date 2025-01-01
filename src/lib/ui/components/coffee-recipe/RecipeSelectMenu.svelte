<script lang="ts">
    import { i18n } from '$lib/i18n.js';
    import { base } from '$app/paths';
    import { getPathFromMetaInfo, Menu } from '$lib/coffee-recipes';
    
    import { StopWatchRunes, getStopWatchRunes } from '$lib/runes/stopwatch/';
    import { getCoffeeRecipeRunes } from '$lib/runes/coffee-recipe';
	import { brandMessageKey, coffeeRecipeIdSelectMessageKey, coffeeRecipeIdSelectNavItemMessageKey, dripperMessageKey } from './CoffeeReceipeMessageKeys';
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

    let container;
    let showDropdown: boolean = $state(false);

    const toggleDropdown = () => {
        console.log('RecipeSelectMenu toggleDropdown, will become', !showDropdown);
        showDropdown = !showDropdown;
    }

    const closeDropdown = () => {
        showDropdown = false;
    }

    function onWindowClick(e) {
		if (container.contains(e.target) == false) {
            showDropdown = false;
        }
	}
</script>

<svelte:window on:click={onWindowClick} />

<div bind:this={container}>
    <div class="flex flex-row ">
        <div class="grow relative inline-block text-left" >

            {#if stopwatch.isRunning() }
                <div class="inline-flex w-full justify-center gap-x-1.5 border-b-1 border-slate-900 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">{ coffeeRecipeIdSelectMessageKey(coffeeRecipeRunes.recipeId)() }</div>
            {:else}
                <button type="button" onclick="{toggleDropdown}" class="inline-flex w-full justify-center gap-x-1.5 border-b-1 border-slate-900 bg-white px-3 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50" >
                <!-- id="menu-button" aria-expanded="true" aria-haspopup="true"> -->
                    { coffeeRecipeIdSelectMessageKey(coffeeRecipeRunes.recipeId)() }
                    <svg class="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                    </svg>
                </button>
            {/if}
        
            <!--
            Dropdown menu, show/hide based on menu state.
        
            Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
            {#if showDropdown}
                <div class="absolute overflow-auto right-0 z-50 mt-2 w-full origin-top-right rounded bg-white shadow-lg ring-1 ring-black/5 focus:outline-none" >
                    <!-- role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1"> -->
                    <ul class="px-6 pt-4 pb-6 text-gray-700 space-y-2 md:px-12">
                        {#each Menu.brandMenus as brandMenu, i}
                            {#each brandMenu.dripperMenus as dripperMenu, j}
                                <li><span class="font-bold">{brandMessageKey(dripperMenu.brandName)() + ' ' + dripperMessageKey(dripperMenu.dripperName)()}</span></li>
                                {#each dripperMenu.recipeMenus as item, j}
                                    <li class="pl-2 pt-2 pb-2 w-full">
                                        <a href="{base + "/recipe/" + getPathFromMetaInfo(item.metaInfos)}" onclick="{closeDropdown}" 
                                            class="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 h-8 block">
                                            <span class="relative ">{coffeeRecipeIdSelectNavItemMessageKey(item.id)()}</span>
                                        </a>
                                    </li>
                                {/each}
                            {/each}                
                        {/each}
                    </ul>
                </div>
            {/if}

        </div>
    </div>
</div>
    
    


