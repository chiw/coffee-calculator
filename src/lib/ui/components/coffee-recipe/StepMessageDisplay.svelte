<script lang="ts">
	import { pouringTechniqueMessageKey, pourOverStageMessageKey, waterTemperatureMessageKey } from "$lib/coffee-recipes/CoffeeReceipeMessageKeys";

    let { step } = $props();
</script>

<div class="grow ml-2">
    {#if step.stage}
        <span>{@html pourOverStageMessageKey(step.stage)() }</span>
    {/if}
    {#if step.pouringTechnique}
        <span>{@html " (" + pouringTechniqueMessageKey(step.pouringTechnique)() + ")"}</span>
    {/if}
    <span>{@html "<br/>"}</span>
    <span class="mr-0">{@html  step.msgKey(step.params)}</span>
    {#if step.waterTemperature}
        <span class="ml-0">{@html waterTemperatureMessageKey(step.waterTemperature)}</span>
    {/if}
</div>

