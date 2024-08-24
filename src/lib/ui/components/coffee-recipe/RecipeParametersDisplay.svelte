<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';

    import { getCoffeeRecipeStore } from '$lib/runes/coffee-recipe';
    const coffeeRecipeStore = getCoffeeRecipeStore();

    import { StopWatchState, StopWatchStore, getStopWatchStore } from '$lib/runes/stopwatch';
    const stopwatch: StopWatchStore = getStopWatchStore();
</script>

<div class="text-xl font-bold italic mt-3">{m.label_receipe_parameters()}</div>

<div class="flex flex-row mt-1">
    <div class="w-52 font-normal">{m.label_coffee_bean()}</div>
    {#if StopWatchState.RUNNING != stopwatch.stopwatchState}
        <button class="w-7 h-7 rounded-full border border-slate-400 text-black hover:bg-black hover:text-white font-bold" onclick={() => coffeeRecipeStore.beanInGrams-=1}>&minus;</button>
        <input class="ml-2 mr-1 border border-slate-200 max-w-10" bind:value={coffeeRecipeStore.beanInGrams} /> 
        <div class="mr-2">(g)</div>
        <button class="w-7 h-7 rounded-full border border-slate-400 text-black hover:bg-black hover:text-white font-bold" onclick={() => coffeeRecipeStore.beanInGrams+=1}>&plus;</button>
    {:else}
        <div class="ml-2 mr-1 border-none border-slate-200 max-w-10">{coffeeRecipeStore.beanInGrams}(g)</div>
    {/if}
    
</div>
<div class="flex flex-row mt-1">
    <div class="w-52 font-normal">{m.label_coffee_to_water_ratio()}</div>
    <div class="mx-2 border-none border-slate-200 w-1">1:</div>
        <div>{coffeeRecipeStore.coffeeParams.coffeeToWaterRatio}</div>
</div>

<div class="flex flex-row mt-1">
    <div class="w-52 font-normal">{m.label_water()}</div>
        <div class="ml-2 mr-1 border-none border-slate-200 max-w-10">{coffeeRecipeStore.coffeeParams.waterInGrams}</div>
    <div class="ml-1">(g)</div>
</div>