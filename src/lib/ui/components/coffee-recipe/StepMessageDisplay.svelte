<script lang="ts">
	import type { StepConfig } from "$lib/coffee-recipes/CoffeeRecipeTypes";
	import { isFinalStage, isPauseStage, isPouringStage, isWaterFlowStage } from "$lib/utils/CoffeeRecipeUtils";

	import { finalStepMessageKey, pouringTechniqueMessageKey, pourOverStageMessageKey, stepWaterInfoMessageKey, stirMessageKey, swirlMessageKey, waterFlowMessageKey, waterTemperatureMessageKey } from "./CoffeeReceipeMessageKeys";

    interface StepMessageDisplayProps {
        step: StepConfig
    }

    let { step } : StepMessageDisplayProps = $props();

    // console.log('StepMessageDisplay step', step);
</script>

<div class="grow ml-2">
    {#if step.stage}
        {#if isPauseStage(step.stage) }
            {#if step.swirl }
                <span class="text-sm">{@html pourOverStageMessageKey(step.stage)() + ' ' + (step.swirl ? '<b>(' + swirlMessageKey() + ')</b>' : '') }</span>
            {:else if step.stir }
                <span class="text-sm">{@html pourOverStageMessageKey(step.stage)() + ' ' + (step.stir ? '<b>(' + stirMessageKey() + ')</b>' : '') }</span>
            {:else}
                <span class="text-sm">{@html pourOverStageMessageKey(step.stage)() }</span>
            {/if}
        {:else}
            <span class="text-sm">{@html pourOverStageMessageKey(step.stage)() }</span>
        {/if}
    {/if}
    
    {#if step.pouringTechnique}
        <span class="text-sm">{@html " (" + pouringTechniqueMessageKey(step.pouringTechnique)() + ")"}</span>
    {/if}
    <!-- <span>{@html "<br/>"}</span> -->
    
    {#if step.msgKey}
        <span>{@html "<br/>"}</span>
        <span class="mr-0 text-sm">{@html  step.msgKey(step.msgParams)}</span>
    {:else if isPouringStage(step.stage)}
        <span>{@html "<br/>"}</span>
        <span class="mr-0 text-sm">{@html stepWaterInfoMessageKey(step.stepWaterInfo)}</span>
    {:else if isFinalStage(step.stage)}
        <span class="mr-0 text-sm">{@html finalStepMessageKey(step.timeFrame.toDisplay)}</span>
    {:else if isWaterFlowStage(step.stage)}
        <span class="mr-0 text-sm">{@html waterFlowMessageKey(step.timeFrame.toDisplay)}</span>
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

    {#if step.stir}
        <!-- <span>{@html "<br/>"}</span> -->
         {#if !isPauseStage(step.stage) }
            <span class="mr-0 text-sm">{@html stirMessageKey() }</span>
        {/if}
    {/if}
</div>

