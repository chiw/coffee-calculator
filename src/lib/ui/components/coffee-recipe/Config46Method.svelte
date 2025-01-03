<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';

    let { pourRatios40 = $bindable(), pourRatios60 = $bindable() } = $props();

</script>

<div class="mt-4"></div>
<div class="text-sm"><b>{m.label_46_method_40()}</b></div>    
<div>
    <label class="text-sm">
        <input type="radio" name="pourRatios40Radio" bind:group={pourRatios40} value={"standard"}>{m.label_46_method_40_choices_standard()}
    </label>
    <label class="text-sm">
        <input type="radio" name="pourRatios40Radio" bind:group={pourRatios40} value={"sweeter"}>{m.label_46_method_40_choices_sweeter()}
    </label>
    <label class="text-sm">
        <input type="radio" name="pourRatios40Radio" bind:group={pourRatios40} value={"brighter"}>{m.label_46_method_40_choices_brighter()}
    </label>
</div>

<div class="mt-4"></div>
<div class="text-sm"><b>{m.label_46_method_60()}</b></div>
<div>
    <label class="text-sm">
        <input type="radio" name="pourRatios60Radio" bind:group={pourRatios60} value={"lighter"}>{m.label_46_method_60_choices_lighter()}
    </label>
    <label class="text-sm">
        <input type="radio" name="pourRatios60Radio" bind:group={pourRatios60} value={"stronger"}>{m.label_46_method_60_choices_stronger()}
    </label>
    <label class="text-sm">
        <input type="radio" name="pourRatios60Radio" bind:group={pourRatios60} value={"evenstronger"}>{m.label_46_method_60_choices_evenstronger()}
    </label>
</div>