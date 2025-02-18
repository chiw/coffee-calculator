<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';
    import 'iconify-icon';

    import { getCoffeeRecipeRunes } from '$lib/runes/coffee-recipe';
    const coffeeRecipeRunes = getCoffeeRecipeRunes();

    const referenceLinkTypes: Map<string, string> = new Map([
        ["youtube", 'iconoir:youtube'],
        ["facebook", 'gg:facebook'],
        ["instagram", 'iconoir:instagram'],
        ["twitter", 'iconoir:twitter'],
        ["x-twitter", 'fa6-brands:x-twitter'],
        ["x", 'fa6-brands:x-twitter'],
        ["website", 'bi:globe']
    ]);

    const getIcon = (type: string): string => {
        return referenceLinkTypes.get(type) || 'bi:globe';
    };

</script>

    <div class="text-xl font-bold italic mt-5">{m.label_references()}</div>
    <div class="flex flex-col">
        {#if coffeeRecipeRunes.coffeeRecipe}
            {#each coffeeRecipeRunes.coffeeRecipe.references as reference, i}
                <div>
                    <a href={reference.url}>
                    
                    {#if reference.type }
                        <iconify-icon icon={getIcon(reference.type)} class="text-[15px] hover:text-slate-600"></iconify-icon>
                    {:else}
                        <iconify-icon icon="bi:globe" class="text-[15px] hover:text-slate-600"></iconify-icon>
                    {/if}

                    {reference.description}
                    </a>
                </div>
            {/each}
        {/if}
    </div>