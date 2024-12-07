<script lang="ts">
    import type { PageData } from './$types';
	
	export let data: PageData;

    console.log('data', data);

    import { StepsWithTimerDisplay, RecipeReferencesDisplay, RecipeSelectMenu, LanguageSwitcher, RecipeSelectRoutes } from '$lib/ui/components/coffee-recipe';

    import { getCoffeeRecipeStore } from '$lib/runes/coffee-recipe';	
    
	import { getKeyByValue } from '$lib/utils/ObjectUtils';
	import { CoffeeRecipeId } from '$lib/coffee-recipes';
	import { afterNavigate } from '$app/navigation';

    const coffeeRecipeStore = getCoffeeRecipeStore();

    afterNavigate(() => {
        console.log('afterNavigate');
        coffeeRecipeStore.recipeId = getKeyByValue(CoffeeRecipeId, data.recipeId.toString());
    });
</script>

<!-- <h1>Use the {@html data.recipeId}</h1> -->

<div class="m-3">
    <div class="flex flex-row items-stretch">
        <!-- <div class="grow"><RecipeSelect /></div> -->
        <!-- <div class="grow"><RecipeSelectRoutes selectedOption={coffeeRecipeStore.recipeId}/></div> -->
        <div class="grow"><RecipeSelectMenu selectedOption={coffeeRecipeStore.recipeId}/></div>
        <div class="grow-0"><LanguageSwitcher/></div>
    </div>
    
    {#if coffeeRecipeStore.coffeeRecipe}    
        <div class="mt-5">
            <!-- {#if coffeeRecipeStore.coffeeRecipeSteps.isTimerRecipe} -->
                <StepsWithTimerDisplay coffeeRecipeSteps={coffeeRecipeStore.coffeeRecipeSteps} />
            <!-- {:else} -->
                <!-- <div class="text-xl font-bold italic">{m.label_steps()}</div> -->
                <!-- <StepsDisplay coffeeRecipeSteps={coffeeRecipeStore.coffeeRecipeSteps}  /> -->
                <!-- <StepsWithTimerDisplay coffeeRecipeSteps={coffeeRecipeStore.coffeeRecipeSteps} /> -->
            <!-- {/if} -->
        </div>
        
        <RecipeReferencesDisplay />
        
    {:else}
        <div>No Recipe</div>
    {/if}

</div>