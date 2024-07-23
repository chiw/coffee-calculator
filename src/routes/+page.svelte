<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';
    import { createPourover } from "$lib/runes/pourover.svelte";
    import { CofeeRecipesChoices } from '$lib/recipes/CoffeeRecipeConstants';
    
    const pourover = createPourover();

</script>

<h3>{m.label_receipe_parameters()}</h3>

<div>
    <span>{m.label_coffee_bean()}</span>
    <button onclick={() => pourover.beanInGrams--}>-</button>
    <input bind:value={pourover.beanInGrams} />
    <button onclick={() => pourover.beanInGrams++}>+</button>
    <span>(g)</span>    
</div>
<div>
    <span>{m.label_coffee_to_water_ratio()}</span>
    <button onclick={() => pourover.coffeeToWaterRatio--}>-</button>
    <span>1:</span>
    <input bind:value={pourover.coffeeToWaterRatio} />
    <button onclick={() => pourover.coffeeToWaterRatio++}>+</button>
</div>
<div>
    <span>{m.label_water()}</span>
    <span>{pourover.waterInGrams}</span>
    <span>(g)</span>
</div>

<div>
    <select bind:value={pourover.recipe}>
        {#each CofeeRecipesChoices as option}
            <option value={option.id}>{option.displayLabelId}</option>
        {/each}
    </select>
</div>

<br/>

<h3>{m.label_steps()}</h3>
<div>
    {#if pourover.coffeeRecipe}
        {#each pourover.coffeeRecipe.steps as step, i }
            <li>{@html step}</li>
        {/each}
    {/if}
</div>

<h3>{m.label_references()}</h3>
<div>
    {#if pourover.coffeeRecipe}
        {#each pourover.coffeeRecipe.references as reference, i}
            <li> <a href={reference.url}>{reference.description}</a></li>
        {/each}
    {/if}
</div>
