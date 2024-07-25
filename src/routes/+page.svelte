<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';
    
    import { createPourover } from "$lib/runes/pourover.svelte";
    
    import { CofeeRecipesChoices } from '$lib/recipes/CoffeeRecipeConstants';
	import CoffeeRecipeStepsDisplay from '$lib/ui/components/CoffeeRecipeStepsDisplay.svelte';
    import CoffeeRecipeStepsWithTimerDisplay from '$lib/ui/components/CoffeeRecipeStepsWithTimerDisplay.svelte';
	import { CoffeeRecipe } from '$lib/recipes/CoffeeRecipe';
	    
    const pourover = createPourover();
</script>

<div class="m-3">
    <div class="text-xl font-bold italic">{m.label_receipe_parameters()}</div>

    <div class="flex flex-row mt-1">
        <div class="w-52 font-semibold">{m.label_coffee_bean()}</div>
        <button class="w-7 h-7 rounded-full border bg-slate-200 hover:bg-slate-300 font-bold" onclick={() => pourover.beanInGrams--}>-</button>
        <input class="ml-2 mr-1 border border-slate-200 max-w-10" bind:value={pourover.beanInGrams} />
        <div class="mr-2">(g)</div>
        <button class="w-7 h-7 rounded-full border bg-slate-200 hover:bg-slate-300 font-bold" onclick={() => pourover.beanInGrams++}>+</button>
        
    </div>
    <div class="flex flex-row mt-1">
        <div class="w-52 font-semibold">{m.label_coffee_to_water_ratio()}</div>
        <button class="w-7 h-7 rounded-full border bg-slate-200 hover:bg-slate-300 font-bold" onclick={() => pourover.coffeeToWaterRatio--}>-</button>
        <div class="mx-2 border-none border-slate-200 w-1">1:</div>
        <input class="mx-2 border border-slate-200 max-w-10" bind:value={pourover.coffeeToWaterRatio} />
        <button class="ml-1 w-7 h-7 rounded-full border bg-slate-200 hover:bg-slate-300 font-bold" onclick={() => pourover.coffeeToWaterRatio++}>+</button>
    </div>

    <div class="flex flex-row mt-1">
        <div class="w-52 font-semibold">{m.label_water()}</div>
        <div>{pourover.waterInGrams}</div>
        <div class="ml-1">(g)</div>
    </div>

    <div class="flex flex-row mt-3">
        <div class="w-24 font-semibold">{m.label_recipe()}</div>
        <select class="border border-slate-200" bind:value={pourover.recipe}>
            {#each CofeeRecipesChoices as option}
                <option value={option.id}>{option.displayLabelId}</option>
            {/each}
        </select>
    </div>

    <div class="mt-5">
        {#if pourover.coffeeRecipe.isTimerRecipe}
            <CoffeeRecipeStepsWithTimerDisplay steps={pourover.coffeeRecipe.steps} 
                stepsTimeframe={pourover.coffeeRecipe.stepsTimeframe} 
                timerInSeconds={pourover.coffeeRecipe.timerInSeconds} />
        {:else}
            <div class="text-xl font-bold italic">{m.label_steps()}</div>
            <CoffeeRecipeStepsDisplay steps={pourover.coffeeRecipe.steps} />
        {/if}
    </div>
    

    <div class="text-xl font-bold italic mt-5">{m.label_references()}</div>
    <div class="flex flex-col">
        {#if pourover.coffeeRecipe}
            {#each pourover.coffeeRecipe.references as reference, i}
                <div> <a href={reference.url}>{reference.description}</a></div>
            {/each}
        {/if}
    </div>
</div>
