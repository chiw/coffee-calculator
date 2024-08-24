<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';

    import { getCoffeeRecipeStore } from '$lib/runes/coffee-recipe';
    const coffeeRecipeStore = getCoffeeRecipeStore();
</script>

    <div class="text-xl font-bold italic mt-5">{m.label_references()}</div>
    <div class="flex flex-col">
        {#if coffeeRecipeStore.coffeeRecipe}
            {#each coffeeRecipeStore.coffeeRecipe.references as reference, i}
                <div> <a href={reference.url}>{reference.description}</a></div>
            {/each}
        {/if}
    </div>