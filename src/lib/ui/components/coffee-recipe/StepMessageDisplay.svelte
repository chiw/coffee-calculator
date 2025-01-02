<script lang="ts">
	import type { StepConfig, StepWaterInfo, Timeframe } from "$lib/coffee-recipes/CoffeeRecipeTypes";
	import { isFinalStage, isPauseStage, isPouringStage } from "$lib/utils/CoffeeRecipeUtils";

	import { finalStepMessageKey, pouringTechniqueMessageKey, pourOverStageMessageKey, stepWaterInfoMessageKey, swirlMessageKey, waterTemperatureMessageKey } from "./CoffeeReceipeMessageKeys";

    interface StepMessageDisplayProps {
        step: StepConfig
    }

    let { step } : StepMessageDisplayProps = $props();

    // console.log('StepMessageDisplay step', step);
</script>

<div class="grow ml-2">
    {#if step.stage}
        {#if isPauseStage(step.stage) }
            <span class="text-sm">{@html pourOverStageMessageKey(step.stage)() + ' ' + (step.swirl ? '<b>(' + swirlMessageKey() + ')</b>' : '') }</span>
        {:else}
            <span class="text-sm">{@html pourOverStageMessageKey(step.stage)() }</span>
        {/if}
    {/if}
    
    {#if step.pouringTechnique}
        <span class="text-sm">{@html " (" + pouringTechniqueMessageKey(step.pouringTechnique)() + ")"}</span>
    {/if}
    <span>{@html "<br/>"}</span>
    
    {#if step.msgKey}
        <span class="mr-0 text-sm">{@html  step.msgKey(step.msgParams)}</span>
    {:else if isPouringStage(step.stage)}
        <span class="mr-0 text-sm">{@html stepWaterInfoMessageKey(step.stepWaterInfo)}</span>
    {:else if isFinalStage(step.stage)}
        <span class="mr-0 text-sm">{@html finalStepMessageKey(step.timeFrame.toDisplay)}</span>
    {/if}
    
    {#if step.showWaterTemperature}
        <span class="ml-0 text-sm">{@html waterTemperatureMessageKey(step.stepWaterInfo.waterTemperature)}</span>
    {/if}

    {#if step.swirl}
        <!-- <span>{@html "<br/>"}</span> -->
         {#if !isPauseStage(step.stage) }
            <span class="mr-0 text-sm">{@html swirlMessageKey() }</span>
        {/if}
    {/if}
</div>

