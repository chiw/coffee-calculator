<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';
    
    import CoffeeRecipeStepsDisplay from './CoffeeRecipeStepsDisplay.svelte';
    import CoffeeRecipeStepsWithTimerDisplay from './CoffeeRecipeStepsWithTimerDisplay.svelte';

    let {coffeeRecipe} = $props();
    
    console.log('CoffeeRecipeDisplay coffeeRecipe', coffeeRecipe);
</script>

{#if coffeeRecipe}
    
    <div class="text-xl font-bold italic mt-3">{m.label_receipe_parameters()}</div>

    <div class="flex flex-row mt-1">
        <div class="w-52 font-semibold">{m.label_coffee_bean()}</div>
        <!-- <button class="w-7 h-7 rounded-full border bg-slate-200 hover:bg-slate-300 font-bold" onclick={() => coffeeRecipe.beanInGrams--}>-</button> -->
        <!-- <input class="ml-2 mr-1 border border-slate-200 max-w-10" bind:value={coffeeRecipe.beanInGrams} /> -->
         <div>{coffeeRecipe.beanInGrams}</div>
        <div class="mr-2">(g)</div>
        <!-- <button class="w-7 h-7 rounded-full border bg-slate-200 hover:bg-slate-300 font-bold" onclick={() => coffeeRecipe.beanInGrams++}>+</button> -->
        
    </div>
    <div class="flex flex-row mt-1">
        <div class="w-52 font-semibold">{m.label_coffee_to_water_ratio()}</div>
        <!-- <button class="w-7 h-7 rounded-full border bg-slate-200 hover:bg-slate-300 font-bold" onclick={() => coffeeRecipe.coffeeToWaterRatio--}>-</button> -->
        <div class="mx-2 border-none border-slate-200 w-1">1:</div>
        <!-- <input class="mx-2 border border-slate-200 max-w-10" bind:value={coffeeRecipe.coffeeToWaterRatio} /> -->
         <div>{coffeeRecipe.coffeeToWaterRatio}</div>
        <!-- <button class="ml-1 w-7 h-7 rounded-full border bg-slate-200 hover:bg-slate-300 font-bold" onclick={() => coffeeRecipe.coffeeToWaterRatio++}>+</button> -->
    </div>

    <div class="flex flex-row mt-1">
        <div class="w-52 font-semibold">{m.label_water()}</div>
        <div>{coffeeRecipe.waterInGrams}</div>
        <!-- <input class="ml-2 mr-1 border border-slate-200 max-w-10" bind:value={coffeeRecipe.waterInGrams} /> -->
        <div class="ml-1">(g)</div>
    </div>

    <div class="mt-5">
        {#if coffeeRecipe.isTimerRecipe}
            <CoffeeRecipeStepsWithTimerDisplay steps={coffeeRecipe.steps} 
                stepsTimeframe={coffeeRecipe.stepsTimeframe} timerInSeconds={coffeeRecipe.timerInSeconds} />
        {:else}
            <div class="text-xl font-bold italic">{m.label_steps()}</div>
            <CoffeeRecipeStepsDisplay steps={coffeeRecipe.steps} />
        {/if}
    </div>
    

    <div class="text-xl font-bold italic mt-5">{m.label_references()}</div>
    <div class="flex flex-col">
        {#if coffeeRecipe}
            {#each coffeeRecipe.references as reference, i}
                <div> <a href={reference.url}>{reference.description}</a></div>
            {/each}
        {/if}
    </div>
    
{:else}
    <div>No Recipe</div>
{/if}