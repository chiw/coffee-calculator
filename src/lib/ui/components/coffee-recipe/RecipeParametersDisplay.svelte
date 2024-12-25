<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';

    import { getCoffeeRecipeRunes } from '$lib/runes/coffee-recipe';
    const coffeeRecipeRunes = getCoffeeRecipeRunes();

    import { StopWatchState, StopWatchRunes, getStopWatchRunes } from '$lib/runes/stopwatch';
    const stopwatch: StopWatchRunes = getStopWatchRunes();
</script>

<div class="text-xl font-bold italic mt-3">{m.label_receipe_parameters()}</div>

<div class="flex flex-row mt-1">
    <div class="w-52 font-normal">{m.label_coffee_bean()}</div>
    {#if StopWatchState.RUNNING != stopwatch.stopwatchState}
        <button class="w-7 h-7 rounded-full border border-slate-400 text-black hover:bg-black hover:text-white font-bold" onclick={() => coffeeRecipeRunes.beanInGrams-=1}>&minus;</button>
        <input class="ml-2 mr-1 border border-slate-200 max-w-10" bind:value={coffeeRecipeRunes.beanInGrams} /> 
        <div class="mr-2">(g)</div>
        <button class="w-7 h-7 rounded-full border border-slate-400 text-black hover:bg-black hover:text-white font-bold" onclick={() => coffeeRecipeRunes.beanInGrams+=1}>&plus;</button>
    {:else}
        <div class="ml-2 mr-1 border-none border-slate-200 max-w-10">{coffeeRecipeRunes.beanInGrams}(g)</div>
    {/if}
    
</div>
<div class="flex flex-row mt-1">
    <div class="w-52 font-normal">{m.label_coffee_to_water_ratio()}</div>
    <div class="mx-2 border-none border-slate-200 w-1">1:</div>
        <div>{coffeeRecipeRunes.coffeeParams.coffeeToWaterRatio}</div>
</div>

<div class="flex flex-row mt-1">
    <div class="w-52 font-normal">{m.label_water()}</div>
        <div class="ml-2 mr-1 border-none border-slate-200 max-w-10">{coffeeRecipeRunes.coffeeParams.waterInGrams}</div>
    <div class="ml-1">(g)</div>
</div>