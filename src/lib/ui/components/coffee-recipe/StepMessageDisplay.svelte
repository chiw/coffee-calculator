<script lang="ts">
	import { isFinalStage, isPauseStage, isPouringStage, PourOverStage } from "$lib/coffee-recipes/PourOverStage";
	import { finalStepMessageKey, pouringTechniqueMessageKey, pourOverStageMessageKey, stepWaterInfoMessageKey, swirlMessageKey, waterTemperatureMessageKey } from "./CoffeeReceipeMessageKeys";

    let { step, stepWaterInfo, stepsTimeframeDisplay } = $props();
    console.log('StepMessageDisplay step', step, 'stepsWaterInfo', stepWaterInfo, 'stepsTimeframeDisplay', stepsTimeframeDisplay);
</script>

<div class="grow ml-2">
    {#if step.stage}
        {#if isPauseStage(step.stage) }
            <span class="text-sm">{@html pourOverStageMessageKey(step.stage)() }</span>
        {:else}
            <span class="text-base">{@html pourOverStageMessageKey(step.stage)() }</span>
        {/if}
    {/if}
    
    {#if step.pouringTechnique}
        <span class="text-base">{@html " (" + pouringTechniqueMessageKey(step.pouringTechnique)() + ")"}</span>
    {/if}
    <span>{@html "<br/>"}</span>
    
    {#if step.msgKey}
        <span class="mr-0 text-base">{@html  step.msgKey(step.params)}</span>
    {:else if isPouringStage(step.stage)}
        <span class="mr-0 text-base">{@html stepWaterInfoMessageKey(stepWaterInfo)}</span>
    {:else if isFinalStage(step.stage)}
        <span class="mr-0 text-base">{@html finalStepMessageKey(stepsTimeframeDisplay[1])}</span>
    {/if}
    
    {#if step.showWaterTemperature}
        <span class="ml-0 text-base">{@html waterTemperatureMessageKey(stepWaterInfo.waterTemperature)}</span>
    {/if}

    {#if step.swirl === true}
        <!-- <span>{@html "<br/>"}</span> -->
        <span class="mr-0 text-base">{@html swirlMessageKey() }</span>
    {/if}
</div>

