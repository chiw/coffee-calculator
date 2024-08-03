<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';

    import CoffeeRecipeStepsDisplay from './CoffeeRecipeStepsDisplay.svelte';
    import CoffeeRecipeStepsWithTimerDisplay from './CoffeeRecipeStepsWithTimerDisplay.svelte';

    import { getCoffeeRecipeStore } from '$lib/runes/coffee-recipe';
    const coffeeRecipeStore = getCoffeeRecipeStore();
</script>

{#if coffeeRecipeStore.coffeeRecipe}
    
    <div class="text-xl font-bold italic mt-3">{m.label_receipe_parameters()}</div>

    <div class="flex flex-row mt-1">
        <div class="w-52 font-semibold">{m.label_coffee_bean()}</div>        
        <button class="w-7 h-7 rounded-full border bg-slate-200 hover:bg-slate-300 font-bold" onclick={() => coffeeRecipeStore.beanInGrams-=1}>-</button>
        <input class="ml-2 mr-1 border border-slate-200 max-w-10" bind:value={coffeeRecipeStore.beanInGrams} />         
        <div class="mr-2">(g)</div>
        <button class="w-7 h-7 rounded-full border bg-slate-200 hover:bg-slate-300 font-bold" onclick={() => coffeeRecipeStore.beanInGrams+=1}>+</button>
    </div>
    <div class="flex flex-row mt-1">
        <div class="w-52 font-semibold">{m.label_coffee_to_water_ratio()}</div>        
        <div class="mx-2 border-none border-slate-200 w-1">1:</div>
         <div>{coffeeRecipeStore.coffeeParams.coffeeToWaterRatio}</div>
    </div>

    <div class="flex flex-row mt-1">
        <div class="w-52 font-semibold">{m.label_water()}</div>        
         <div>{coffeeRecipeStore.coffeeParams.waterInGrams}</div>
        <div class="ml-1">(g)</div>
    </div>

    <div class="mt-5">
        {#if coffeeRecipeStore.coffeeRecipeSteps.isTimerRecipe}
            <CoffeeRecipeStepsWithTimerDisplay steps={coffeeRecipeStore.coffeeRecipeSteps.steps} 
                stepsTimeframe={coffeeRecipeStore.coffeeRecipeSteps.stepsTimeframe} timerInSeconds={coffeeRecipeStore.coffeeRecipeSteps.timerInSeconds} />
        {:else}
            <div class="text-xl font-bold italic">{m.label_steps()}</div>
            <CoffeeRecipeStepsDisplay steps={coffeeRecipeStore.coffeeRecipeSteps.steps} />
        {/if}
    </div>
    

    <div class="text-xl font-bold italic mt-5">{m.label_references()}</div>
    <div class="flex flex-col">
        {#if coffeeRecipeStore.coffeeRecipe}
            {#each coffeeRecipeStore.coffeeRecipe.references as reference, i}
                <div> <a href={reference.url}>{reference.description}</a></div>
            {/each}
        {/if}
    </div>
    
{:else}
    <div>No Recipe</div>
{/if}