<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';

    import { Method46Flavor, Method46Concentration } from '$lib/coffee-recipes/CoffeeRecipeTypes.d';

    let { pourRatios40 = $bindable(), pourRatios60 = $bindable() } = $props();

</script>

<div class="mt-4"></div>
<div class="text-sm"><b>{m.label_46_method_40()}</b></div>    
<div>
    <label class="text-sm">
        <input type="radio" name="pourRatios40Radio" bind:group={pourRatios40} value={Method46Flavor.STANDARD}>{m.label_46_method_40_choices_standard()}
    </label>
    <label class="text-sm">
        <input type="radio" name="pourRatios40Radio" bind:group={pourRatios40} value={Method46Flavor.SWEETER}>{m.label_46_method_40_choices_sweeter()}
    </label>
    <label class="text-sm">
        <input type="radio" name="pourRatios40Radio" bind:group={pourRatios40} value={Method46Flavor.BRIGHTER}>{m.label_46_method_40_choices_brighter()}
    </label>
</div>

<div class="mt-4"></div>
<div class="text-sm"><b>{m.label_46_method_60()}</b></div>
<div>
    <label class="text-sm">
        <input type="radio" name="pourRatios60Radio" bind:group={pourRatios60} value={Method46Concentration.LIGHTER}>{m.label_46_method_60_choices_lighter()}
    </label>
    <label class="text-sm">
        <input type="radio" name="pourRatios60Radio" bind:group={pourRatios60} value={Method46Concentration.STRONGER}>{m.label_46_method_60_choices_stronger()}
    </label>
    <label class="text-sm">
        <input type="radio" name="pourRatios60Radio" bind:group={pourRatios60} value={Method46Concentration.EVEN_STRONGER}>{m.label_46_method_60_choices_evenstronger()}
    </label>
</div>