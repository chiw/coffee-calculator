<script lang="ts">
    import { onMount } from 'svelte';

    import 'iconify-icon';

    import SwitchStateDisplay from "./SwitchStateDisplay.svelte";
    import StepTimeFrameDisplay from "./StepTimeFrameDisplay.svelte";
	
    import { calculateStepsTimeframe } from "$lib/utils/TimeUtils";

    import { getCoffeeRecipeStore } from '$lib/runes/coffee-recipe';
	import StepMessageDisplay from './StepMessageDisplay.svelte';
	import { shouldDisplayTimeframe } from '$lib/utils/TimeframeDisplayUtils';
	import TimeframeDurationDisplay from './TimeframeDurationDisplay.svelte';
	import type { Timeframe } from '$lib/coffee-recipes/CoffeeRecipeTypes';
	import type { CoffeeRecipeSteps } from '$lib/coffee-recipes/CoffeeRecipeSteps';
    const coffeeRecipeStore = getCoffeeRecipeStore();

    interface StepsWithTimeframeEditorProps {
        coffeeRecipeSteps: CoffeeRecipeSteps,
        highlightStep: boolean,
        closeDialog: any
    }
    let { coffeeRecipeSteps } : StepsWithTimeframeEditorProps = $props();
    // let { steps, stepWaterInfos, stepsDurationInSeconds, highlightStep, closeDialog, isImmersionDripperRecipe } = $props();

    let localStepsDurationInSeconds:number[] = $state.snapshot(coffeeRecipeSteps.stepsDurationInSeconds);
    let localStepsTimeframe: Timeframe[] = $state(calculateStepsTimeframe(localStepsDurationInSeconds));

    onMount(() => {
		console.log('the component has mounted');
        console.log(
            'localStepsDurationInSeconds: ', localStepsDurationInSeconds, 
            'localStepsTimeframe: ', localStepsTimeframe);
	});

    const recalculateStepsDurationAndTimeframe = (e, index) => {
        console.log(
            'e.currentTarget.value:', e.currentTarget.value, 
            'index:', index, 
            'localStepsDurationInSeconds:', localStepsDurationInSeconds);

        let newVal = parseInt(e.currentTarget.value);
        
        localStepsDurationInSeconds[index] = newVal;
        
        localStepsTimeframe = calculateStepsTimeframe(localStepsDurationInSeconds);
        console.log(
            'recalculateStepsDurationAndTimeframe()  localStepsDurationInSeconds:', 
            localStepsDurationInSeconds, 'localStepsTimeframe:', localStepsTimeframe);
    }

    const updateStepsDuration = () => {
        console.log('updateStepsDuration localStepsDurationInSeconds: ', localStepsDurationInSeconds);
        coffeeRecipeStore.stepsDurationInSeconds = localStepsDurationInSeconds;
        closeDialog();
    }
</script>

<div class="flex flex-col mt-2 mb-1">
    {#if coffeeRecipeSteps.steps}
        <div class="flex flex-col divide-y divide-slate-300 py-1 ">
        {#each coffeeRecipeSteps.steps as step, index }
            <div class=" pl-2 py-2 flex items-center">
                <div class="border border-solid border-slate-600">
                    
                   {#if coffeeRecipeSteps.isImmersionDripperRecipe}
                        <SwitchStateDisplay 
                            switchState={step.switchState} isImmersionDripperRecipe={coffeeRecipeSteps.isImmersionDripperRecipe} 
                            highlightState={highlightStep} durationInSeconds={coffeeRecipeSteps.stepsDurationInSeconds[index]}/>
                    {:else}
                        <TimeframeDurationDisplay durationInSeconds={coffeeRecipeSteps.stepsDurationInSeconds[index]} pouringStage={step.stage} />
                    {/if}
                    
                    
                    {#if localStepsTimeframe && localStepsTimeframe[index] && shouldDisplayTimeframe(step)}
                        <StepTimeFrameDisplay timeframe={localStepsTimeframe[index]} highlightStep={highlightStep}/>
                    {/if}
                </div>                        
                <!-- <div class="grow ml-2">{@html step.msgKey(step.params)}</div> -->
                 <StepMessageDisplay step={step} stepWaterInfo={coffeeRecipeSteps.stepWaterInfos[index]} timeframe={localStepsTimeframe[index]} />

                <input type="number" class="ml-2 border border-solid w-14 mr-2" 
                    bind:value={localStepsDurationInSeconds[index]} 
                    oninput={(e) => recalculateStepsDurationAndTimeframe(e, index)} />

                <!-- <div class="flex items-center gap-x-1.5 w-15">
                    <button type="button" tabindex="-1" aria-label="Decrease" data-hs-input-number-increment="" >
                        <iconify-icon icon="mdi-light:minus-circle"
                            class="text-[30px] hover:text-slate-600">
                        </iconify-icon>
                    </button>
                    <input class="p-0 w-6 bg-transparent border-0 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none " 
                            style="-moz-appearance: textfield;" type="number" 
                            aria-roledescription="Number field" 
                            data-hs-input-number-input=""
                            bind:value={localStepsDurationInSeconds[index]} 
                            oninput={(e) => recalculateStepsDurationAndTimeframe(e, index)} >
                    <button type="button" tabindex="-1" aria-label="Increase" data-hs-input-number-increment="" >
                        <iconify-icon icon="mdi-light:add-circle"
                            class="text-[30px] hover:text-slate-600">
                        </iconify-icon>
                    </button>
                </div> -->
                
            </div>
        {/each}
        </div>
        <button onclick="{updateStepsDuration}">
            <iconify-icon icon="material-symbols-light:check-circle"
                class="text-[40px] hover:text-slate-600 m-0 p-0">
            </iconify-icon>
        </button>
    {/if}
</div>