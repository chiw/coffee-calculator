<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';

    import { RecipeSelect ,StepsDisplay, StepsWithTimerDisplay, RecipeReferencesDisplay } from '$lib/ui/components/coffee-recipe';

    import { getCoffeeRecipeStore } from '$lib/runes/coffee-recipe';	
    const coffeeRecipeStore = getCoffeeRecipeStore();

    import LanguageSwitcher from '$lib/ui/components/lang/LanguageSwitcher.svelte';

</script>

<div class="m-3">
    <div class="flex flex-row items-stretch">
        <div class="grow"><RecipeSelect /></div>
        <div class="grow-0"><LanguageSwitcher/></div>
    </div>
    
    {#if coffeeRecipeStore.coffeeRecipe}    
        <div class="mt-5">
            {#if coffeeRecipeStore.coffeeRecipeSteps.isTimerRecipe}
                <StepsWithTimerDisplay
                    steps={coffeeRecipeStore.coffeeRecipeSteps.steps}
                    stepsTimeframe={coffeeRecipeStore.coffeeRecipeSteps.stepsTimeframe}
                    stepsTimeframeDisplay={coffeeRecipeStore.coffeeRecipeSteps.stepsTimeframeDisplay} 
                    timerInSeconds={coffeeRecipeStore.coffeeRecipeSteps.timerInSeconds} />
            {:else}
                <!-- <div class="text-xl font-bold italic">{m.label_steps()}</div> -->
                <StepsDisplay steps={coffeeRecipeStore.coffeeRecipeSteps.steps} />
            {/if}
        </div>
        
        <RecipeReferencesDisplay />
        
    {:else}
        <div>No Recipe</div>
    {/if}

</div>