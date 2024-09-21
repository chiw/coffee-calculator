<script lang="ts">
    import RecipeParametersCardDisplay from "./RecipeParametersCardDisplay.svelte";
    import StepMessageDisplay from "./StepMessageDisplay.svelte";

    import SwitchStateDisplay from "./SwitchStateDisplay.svelte";
    import StepTimeFrameDisplay from "./StepTimeFrameDisplay.svelte";
	import { shouldDisplayTimeframe } from "$lib/utils/TimeframeDisplayUtils";
	import TimeframeDurationDisplay from "./TimeframeDurationDisplay.svelte";
	import type { CoffeeRecipeSteps } from "$lib/coffee-recipes/CoffeeRecipeSteps";

    interface StepDisplayProps {
        coffeeRecipeSteps: CoffeeRecipeSteps
    }
    let { coffeeRecipeSteps } : StepDisplayProps = $props();

</script>

<RecipeParametersCardDisplay />

<div class="flex flex-col mb-1">
    {#if coffeeRecipeSteps.steps}    
        <div class="flex flex-col divide-y divide-slate-300 py-1 ">
            {#each coffeeRecipeSteps.steps as step, index }           
                <div class=" pl-2 py-2 flex items-center">
                    <div class="border border-solid border-slate-600">
                            {#if coffeeRecipeSteps.isImmersionDripperRecipe}
                                <SwitchStateDisplay 
                                    switchState={step.switchState} isImmersionDripperRecipe={coffeeRecipeSteps.isImmersionDripperRecipe} 
                                    highlightState={false} durationInSeconds={coffeeRecipeSteps.stepsDurationInSeconds[index]}/>
                            {:else}
                                <TimeframeDurationDisplay durationInSeconds={coffeeRecipeSteps.stepsDurationInSeconds[index]} pouringStage={step.stage} />
                            {/if}
                        
                        {#if coffeeRecipeSteps.stepsTimeframe[index] && shouldDisplayTimeframe(step)}
                            <StepTimeFrameDisplay timeframe={coffeeRecipeSteps.stepsTimeframe[index]} highlightStep={false}/>
                        {/if}
                    </div>

                    <!-- <div class="my-1 p-1">{@html step.msgKey(step.params)}</div> -->
                    <StepMessageDisplay index={index} step={step} 
                        stepWaterInfo={coffeeRecipeSteps.stepWaterInfos[index]} 
                        timeframe={coffeeRecipeSteps.stepsTimeframe[index]} />
                </div>
            {/each}
        </div>
    {/if}
</div>

