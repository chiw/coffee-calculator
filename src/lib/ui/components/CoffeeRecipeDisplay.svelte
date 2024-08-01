<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';

    import { getContext } from "svelte";
    
    import CoffeeRecipeStepsDisplay from './CoffeeRecipeStepsDisplay.svelte';
    import CoffeeRecipeStepsWithTimerDisplay from './CoffeeRecipeStepsWithTimerDisplay.svelte';

    let {coffeeRecipe, beanInGrams, coffeeToWaterRatio, waterInGrams, coffeeRecipeSteps } = $props();

    const coffeeRecipeStore = getContext("coffeeRecipeStore");
    
    console.log('coffeeRecipe', coffeeRecipe);
    console.log('coffeeRecipeSteps', coffeeRecipeSteps);

    // function updateBeanInGrams(value: number) {
    //     console.log('updateBeanInGrams', value);
    //     // coffeeRecipe.updateBeanInGrams(value);
    //     // coffeeRecipe = cloneObject(coffeeRecipe);
    //     coffeeRecipeStore.updateRecipeBeanInGrams(value);
    // }

    // function updateCoffeeToWaterRatio(value: number) {
    //     console.log('updateCoffeeToWaterRatio', value);
    //     // coffeeRecipe.updateCoffeeToWaterRatio(value);
    //     // coffeeRecipe = cloneObject(coffeeRecipe);
    //     coffeeRecipeStore.updateRecipeCoffeeToWaterRatio(value);
    // }

    // function updateWaterInGrams(value: number) {
    //     console.log('updateWaterInGrams', value);
    //     // coffeeRecipe.updateWaterInGrams(value);
    //     // coffeeRecipe = cloneObject(coffeeRecipe);
    //     coffeeRecipeStore.updateRecipeWaterInGrams(value);
    // }

    // function cloneObject(object) {
    //     return JSON.parse(JSON.stringify(object));
    // }

</script>

{#if coffeeRecipe}
    
    <div class="text-xl font-bold italic mt-3">{m.label_receipe_parameters()}</div>

    <div class="flex flex-row mt-1">
        <div class="w-52 font-semibold">{m.label_coffee_bean()}</div>
        <!-- <button class="w-7 h-7 rounded-full border bg-slate-200 hover:bg-slate-300 font-bold" onclick={() => coffeeRecipe.beanInGrams-=1}>-</button> -->
        <!-- <button class="w-7 h-7 rounded-full border bg-slate-200 hover:bg-slate-300 font-bold" onclick={() => beanInGrams-=1}>-</button> -->
        <!-- <input class="ml-2 mr-1 border border-slate-200 max-w-10" bind:value={coffeeRecipe.beanInGrams} /> -->
         <!-- <div>{coffeeRecipe.beanInGrams}</div> -->
         <div>{beanInGrams}</div>
        <div class="mr-2">(g)</div>
        <!-- <button class="w-7 h-7 rounded-full border bg-slate-200 hover:bg-slate-300 font-bold" onclick={() => coffeeRecipe.beanInGrams+=1}>+</button> -->
        <!-- <button class="w-7 h-7 rounded-full border bg-slate-200 hover:bg-slate-300 font-bold" onclick={() => beanInGrams+=1}>+</button> -->
    </div>
    <div class="flex flex-row mt-1">
        <div class="w-52 font-semibold">{m.label_coffee_to_water_ratio()}</div>
        <!-- <button class="w-7 h-7 rounded-full border bg-slate-200 hover:bg-slate-300 font-bold" onclick={() => coffeeRecipe.coffeeToWaterRatio--}>-</button> -->
        <!-- <button class="w-7 h-7 rounded-full border bg-slate-200 hover:bg-slate-300 font-bold" onclick={() => coffeeToWaterRatio--}>-</button> -->
        <div class="mx-2 border-none border-slate-200 w-1">1:</div>
        <!-- <input class="mx-2 border border-slate-200 max-w-10" bind:value={coffeeRecipe.coffeeToWaterRatio} /> -->
        <!-- <input class="mx-2 border border-slate-200 max-w-10" bind:value={coffeeToWaterRatio} /> -->
         <div>{coffeeToWaterRatio}</div>
        <!-- <button class="ml-1 w-7 h-7 rounded-full border bg-slate-200 hover:bg-slate-300 font-bold" onclick={() => coffeeRecipe.coffeeToWaterRatio++}>+</button> -->
        <!-- <button class="ml-1 w-7 h-7 rounded-full border bg-slate-200 hover:bg-slate-300 font-bold" onclick={() => coffeeToWaterRatio++}>+</button> -->
    </div>

    <div class="flex flex-row mt-1">
        <div class="w-52 font-semibold">{m.label_water()}</div>
        <!-- <div>{coffeeRecipe.waterInGrams}</div> -->
        <!-- <input class="ml-2 mr-1 border border-slate-200 max-w-10" bind:value={coffeeRecipe.waterInGrams} /> -->
        <!-- <input class="ml-2 mr-1 border border-slate-200 max-w-10" bind:value={waterInGrams} /> -->
        <div>{waterInGrams}</div>
        <div class="ml-1">(g)</div>
    </div>

    <div class="mt-5">
        {#if coffeeRecipeSteps.isTimerRecipe}
            <CoffeeRecipeStepsWithTimerDisplay steps={coffeeRecipeSteps.steps} 
                stepsTimeframe={coffeeRecipeSteps.stepsTimeframe} timerInSeconds={coffeeRecipeSteps.timerInSeconds} />
        {:else}
            <div class="text-xl font-bold italic">{m.label_steps()}</div>
            <CoffeeRecipeStepsDisplay steps={coffeeRecipeSteps.steps} />
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