<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';

    import { Method46Flavor, Method46Concentration } from '$lib/coffee-recipes/CoffeeRecipeTypes.d';

    let { pourRatios40 = $bindable(), pourRatios60 = $bindable() } = $props();

</script>

<div class="mt-4"></div>
<div class="text-sm mb-2"><b>{m.label_46_method_40()}</b></div>    
<div>
    <fieldset class="flex flex-wrap gap-3">
    <div>
        <label class="flex cursor-pointer items-center justify-center rounded 
            border border-gray-300 bg-white px-3 py-1 text-gray-900 
            hover:border-gray-900 
            has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
        >
          <input type="radio" name="pourRatios40Radio" bind:group={pourRatios40} value={Method46Flavor.STANDARD} 
            class="sr-only"
          />
    
          <p class="text-sm font-bold">{m.label_46_method_40_choices_standard()}</p>
        </label>
    </div>

    <div>
        <label class="flex cursor-pointer items-center justify-center rounded 
            border border-gray-300 bg-white px-3 py-1 text-gray-900 
            hover:border-gray-900 
            has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
        >
          <input type="radio" name="pourRatios40Radio" bind:group={pourRatios40} value={Method46Flavor.SWEETER} 
            class="sr-only"
          />
    
          <p class="text-sm font-bold">{m.label_46_method_40_choices_sweeter()}</p>
        </label>
    </div>

    <div>
        <label class="flex cursor-pointer items-center justify-center rounded 
            border border-gray-300 bg-white px-3 py-1 text-gray-900 
            hover:border-gray-900 
            has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
        >
          <input type="radio" name="pourRatios40Radio" bind:group={pourRatios40} value={Method46Flavor.BRIGHTER} 
            class="sr-only"
          />
    
          <p class="text-sm font-bold">{m.label_46_method_40_choices_brighter()}</p>
        </label>
    </div>
    </fieldset>
</div>

<div class="mt-4"></div>
<div class="text-sm mb-2"><b>{m.label_46_method_60()}</b></div>
<div>
    <fieldset class="flex flex-wrap gap-3">
    <div>
        <label class="flex cursor-pointer items-center justify-center rounded-md 
            border border-gray-300 bg-white px-3 py-1 text-gray-900 
            hover:border-gray-900 
            has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
        >
          <input type="radio" name="ColorOption" bind:group={pourRatios60} value={Method46Concentration.LIGHTER} 
            class="sr-only"
          />
    
          <p class="text-sm font-bold">{m.label_46_method_60_choices_lighter()}</p>
        </label>
    </div>

    <div>
        <label class="flex cursor-pointer items-center justify-center rounded-md 
            border border-gray-300 bg-white px-3 py-1 text-gray-900 
            hover:border-gray-900 
            has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
        >
          <input type="radio" name="ColorOption" bind:group={pourRatios60} value={Method46Concentration.STRONGER} 
            class="sr-only"
          />
    
          <p class="text-sm font-bold">{m.label_46_method_60_choices_stronger()}</p>
        </label>
    </div>

    <div>
        <label class="flex cursor-pointer items-center justify-center rounded-md 
            border border-gray-300 bg-white px-3 py-1 text-gray-900 
            hover:border-gray-900 
            has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
        >
          <input type="radio" name="ColorOption" bind:group={pourRatios60} value={Method46Concentration.EVEN_STRONGER} 
            class="sr-only"
          />
    
          <p class="text-sm font-bold">{m.label_46_method_60_choices_evenstronger()}</p>
        </label>
    </div>
    </fieldset>
</div>