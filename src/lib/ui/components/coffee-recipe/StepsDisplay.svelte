<script lang="ts">
    import RecipeParametersCardDisplay from "./RecipeParametersCardDisplay.svelte";
    import StepMessageDisplay from "./StepMessageDisplay.svelte";

    import SwitchStateDisplay from "./SwitchStateDisplay.svelte";
    import StepTimeFrameDisplay from "./StepTimeFrameDisplay.svelte";
	import { shouldDisplayTimeframe } from "$lib/utils/TimeframeDisplayUtils";
	import TimeframeDurationDisplay from "./TimeframeDurationDisplay.svelte";

    let { steps, stepWaterInfos, stepsTimeframeDisplay, stepsDurationInSeconds, isImmersionDripperRecipe } = $props();
</script>

<RecipeParametersCardDisplay />

<div class="flex flex-col mb-1">
    {#if steps}    
        <div class="flex flex-col divide-y divide-slate-300 py-1 ">
            {#each steps as step, index }           
                <div class=" pl-2 py-2 flex items-center">
                    <div class="border border-solid border-slate-600">
                            {#if isImmersionDripperRecipe}
                                <SwitchStateDisplay 
                                    switchState={step.switchState} isImmersionDripperRecipe={isImmersionDripperRecipe} 
                                    highlightState={false} durationInSeconds={stepsDurationInSeconds[index]}/>
                            {:else}
                                <TimeframeDurationDisplay durationInSeconds={stepsDurationInSeconds[index]} pouringStage={step.stage} />
                            {/if}
                        
                        {#if stepsTimeframeDisplay && stepsTimeframeDisplay[index] && shouldDisplayTimeframe(step)}
                            <StepTimeFrameDisplay stepsTimeframeDisplay={stepsTimeframeDisplay[index]} highlightStep={false}/>
                        {/if}
                    </div>

                    <!-- <div class="my-1 p-1">{@html step.msgKey(step.params)}</div> -->
                    <StepMessageDisplay index={index} step={step} stepWaterInfo={stepWaterInfos[index]} stepsTimeframeDisplay={stepsTimeframeDisplay[index]} />
                </div>
            {/each}
        </div>
    {/if}
</div>

