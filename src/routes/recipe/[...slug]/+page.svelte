<script lang="ts">
    import type { PageData } from './$types';
	
	export let data: PageData;

    console.log('data', data);

    import { StepsWithTimerDisplay, RecipeReferencesDisplay, RecipeSelectMenu, LanguageSwitcher, RecipeSelectRoutes } from '$lib/ui/components/coffee-recipe';

    import { getCoffeeRecipeRunes } from '$lib/runes/coffee-recipe';	
    
	import { getKeyByValue } from '$lib/utils/ObjectUtils';
	import { CoffeeRecipeId } from '$lib/coffee-recipes';
	import { afterNavigate } from '$app/navigation';

    const coffeeRecipeRunes = getCoffeeRecipeRunes();

    afterNavigate(() => {
        console.log('afterNavigate');
        coffeeRecipeRunes.recipeId = getKeyByValue(CoffeeRecipeId, data.recipeId.toString());
    });
</script>

<!-- <h1>Use the {@html data.recipeId}</h1> -->

<div class="m-2">
    <div class="flex flex-row items-stretch">
        <!-- <div class="grow"><RecipeSelect /></div> -->
        <!-- <div class="grow"><RecipeSelectRoutes selectedOption={coffeeRecipeRunes.recipeId}/></div> -->
        <div class="grow"><RecipeSelectMenu selectedOption={coffeeRecipeRunes.recipeId}/></div>
        <div class="grow-0"><LanguageSwitcher/></div>
    </div>
    
    {#if coffeeRecipeRunes.coffeeRecipe}    
        <div class="mt-0">
            <!-- {#if coffeeRecipeRunes.coffeeRecipeSteps.isTimerRecipe} -->
                <StepsWithTimerDisplay coffeeRecipeSteps={coffeeRecipeRunes.coffeeRecipeSteps} />
            <!-- {:else} -->
                <!-- <div class="text-xl font-bold italic">{m.label_steps()}</div> -->
                <!-- <StepsDisplay coffeeRecipeSteps={coffeeRecipeRunes.coffeeRecipeSteps}  /> -->
                <!-- <StepsWithTimerDisplay coffeeRecipeSteps={coffeeRecipeRunes.coffeeRecipeSteps} /> -->
            <!-- {/if} -->
        </div>
        
        <RecipeReferencesDisplay />
        
    {:else}
        <div>No Recipe</div>
    {/if}

</div>