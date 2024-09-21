<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';

    import 'iconify-icon';

    import { StopWatchStore, getStopWatchStore } from '$lib/runes/stopwatch';

    import { getCoffeeRecipeStore } from '$lib/runes/coffee-recipe';
    const coffeeRecipeStore = getCoffeeRecipeStore();

    import RecipeParametersCardDisplay from './RecipeParametersCardDisplay.svelte';

    import StepMessageDisplay from './StepMessageDisplay.svelte';

    import StepTimeFrameDisplay from './StepTimeFrameDisplay.svelte';
	import SwitchStateDisplay from './SwitchStateDisplay.svelte';
	import Modal from '../modal/Modal.svelte';

    import StepsTimeframeEditor from './StepsTimeframeEditor.svelte';
	import StopwatchDisplay from '../stopwatch/StopwatchDisplay.svelte';
	import { shouldDisplayTimeframe } from '$lib/utils/TimeframeDisplayUtils';
	import TimeframeDurationDisplay from './TimeframeDurationDisplay.svelte';
	import type { CoffeeRecipeSteps } from '$lib/coffee-recipes/CoffeeRecipeSteps';
	import type { Timeframe } from '$lib/coffee-recipes/CoffeeRecipeTypes';
	

    interface StepsWithTimerDisplayProps {
        coffeeRecipeSteps: CoffeeRecipeSteps
    }
    let { coffeeRecipeSteps } : StepsWithTimerDisplayProps = $props();

    console.log('steps: ', coffeeRecipeSteps.steps);
    console.log('stepWaterInfos', coffeeRecipeSteps.stepWaterInfos);
    console.log('stepsTimeframe: ', coffeeRecipeSteps.stepsTimeframe);
    console.log('stepsDurationInSeconds: ', coffeeRecipeSteps.stepsDurationInSeconds);
    console.log('timerInSeconds: ', coffeeRecipeSteps.timerInSeconds);

    const stopwatch: StopWatchStore = getStopWatchStore();

    const isRunningActiveStep = (elaspedTimeInSeconds:number, timeframe:Timeframe): boolean => {
        return stopwatch.isRunning() && isActiveStep(elaspedTimeInSeconds, timeframe);
    }

    const isRunningNonActiveStep = (elaspedTimeInSeconds:number, timeframe:Timeframe): boolean => {
        return stopwatch.isRunning() && !isActiveStep(elaspedTimeInSeconds, timeframe);
    }
    
    const isActiveStep = (elaspedTimeInSeconds:number, timeframe:Timeframe) : boolean => {
        return (elaspedTimeInSeconds >= timeframe.from) 
                && (elaspedTimeInSeconds <= timeframe.to);
    }

    const isStepCloseToFinish = (elaspedTimeInSeconds:number, timeframe:Timeframe, offset:number) => {
        return elaspedTimeInSeconds > (timeframe.to - offset);
    }

    let inEditMode = $state(false);

    let showModal = $state(false);
    let dialog = $state();
    
    const showModalDialog = () => {
        if(!stopwatch.isRunning()) {
            console.log('showModealDialog, stopwatch is not running, set showModal to true');
            showModal = true;
        } 
    }

    const closeDialog = () => {
        showModal = false;
        if(dialog) {
            dialog.closeDialog();
        }
    }

    const recalculateStepsDurationAndTimeframe = (e, index) => {
        console.log(
            'e.currentTarget.value:', e.currentTarget.value, 
            'index:', index, 
            'stepsDurationInSeconds:', coffeeRecipeSteps.stepsDurationInSeconds);

        let newVal = parseInt(e.currentTarget.value);
        
        coffeeRecipeSteps.stepsDurationInSeconds[index] = newVal;

        coffeeRecipeStore.stepsDurationInSeconds = coffeeRecipeSteps.stepsDurationInSeconds;
        
        // localStepsTimeframeDisplay = calculateStepsTimeframe(localStepsDurationInSeconds);
        // console.log(
        //     'recalculateStepsDurationAndTimeframe()  localStepsDurationInSeconds:', 
        //     localStepsDurationInSeconds, 'localStepsTimeframeDisplay:', localStepsTimeframeDisplay);
    }

    const resetStepsDurationToDefault = () => {
        coffeeRecipeStore.stepsDurationInSeconds = null;
    }

    
</script>

<div class="flex flex-row">
    <div class="m-1 p-2 w-[6rem]">
        <StopwatchDisplay timerInSeconds={coffeeRecipeSteps.timerInSeconds} />
    </div>
    <div>    
        <RecipeParametersCardDisplay />
    </div>
</div>

<div class="flex flex-row-reverse items-center mt-2">
    {#if !stopwatch.isRunning()}
        {#if inEditMode}
            <button class="flex flex-row border border-solid border-black rounded border-1 items-center bg-black w-18 px-1 ba" onclick={() => { inEditMode = !inEditMode }}>
                <iconify-icon icon="material-symbols-light:check-circle-outline-rounded"
                    class="text-[22px] hover:text-white text-white">
                </iconify-icon>
                <span class="font-bold text-xs text-white">{m.label_finish_edit()}</span>
            </button>

            <button class="flex flex-row border border-solid border-black rounded border-1 items-center w-18 px-1 mr-1" onclick={resetStepsDurationToDefault}>
                <iconify-icon icon="material-symbols-light:refresh-rounded"
                    class="text-[22px] hover:text-slate-600">
                </iconify-icon>
                <span class="font-bold text-xs">{m.label_default()}</span>
            </button>
        {:else}
            <button class="flex flex-row border border-solid border-black rounded border-1 items-center w-18 px-1" onclick={() => { inEditMode = !inEditMode }}>
                
                <iconify-icon icon="material-symbols-light:timer-outline"
                    class="text-[22px] hover:text-slate-600">
                </iconify-icon>
                <span class="font-bold text-xs">{m.label_edit()}</span>
            </button>
        {/if}
    {/if}
</div>

{#snippet stepRowDisplay(index, step, stepWaterInfos, timeframe, highlightStep)}
    <!-- <button class="border border-solid border-slate-600" onclick="{showModalDialog}"> -->
    <div class="border border-solid border-slate-600">
        
        {#if coffeeRecipeSteps.isImmersionDripperRecipe}
            <SwitchStateDisplay 
                switchState={step.switchState} isImmersionDripperRecipe={coffeeRecipeSteps.isImmersionDripperRecipe} 
                highlightState={highlightStep} durationInSeconds={coffeeRecipeSteps.stepsDurationInSeconds[index]}/>
        {:else}
            <TimeframeDurationDisplay durationInSeconds={coffeeRecipeSteps.stepsDurationInSeconds[index]} pouringStage={step.stage} />
        {/if}
        
        {#if timeframe && shouldDisplayTimeframe(step)}
            <StepTimeFrameDisplay timeframe={timeframe} highlightStep={highlightStep}/>
        {/if}
    </div>
    <!-- </button> -->
    <!-- <div class="grow ml-2">{@html step.msgKey(step.params)}</div> -->
    {#if timeframe} 
        <StepMessageDisplay stepWaterInfo={stepWaterInfos[index]} step={step} timeframe={timeframe}/>
    {/if}
{/snippet}

{#snippet stepRowDisplayWithEdit(index, step, stepWaterInfos, timeframe, stepsDurationInSeconds, highlightStep)}
    <!-- <button class="border border-solid border-slate-600" onclick="{showModalDialog}"> -->
    <div class="border border-solid border-slate-600">
        
        {#if coffeeRecipeSteps.isImmersionDripperRecipe}
            <SwitchStateDisplay 
                switchState={step.switchState} isImmersionDripperRecipe={coffeeRecipeSteps.isImmersionDripperRecipe} 
                highlightState={highlightStep} durationInSeconds={stepsDurationInSeconds[index]}/>
        {:else}
            <TimeframeDurationDisplay durationInSeconds={stepsDurationInSeconds[index]} pouringStage={step.stage} />
        {/if}

        {#if timeframe && shouldDisplayTimeframe(step)}
            <StepTimeFrameDisplay timeframe={timeframe} highlightStep={highlightStep}/>
        {/if}
    </div>
    <!-- </button> -->
    <!-- <div class="grow ml-2">{@html step.msgKey(step.params)}</div> -->
    {#if timeframe}
        <StepMessageDisplay stepWaterInfo={stepWaterInfos[index]} step={step} timeframe={timeframe}/>
    {/if}

    {#if inEditMode}
        <button onclick={() => {stepsDurationInSeconds[index] -= 1; coffeeRecipeStore.stepsDurationInSeconds = stepsDurationInSeconds;} }>
            <iconify-icon icon="mdi-light:minus-circle"
                class="text-[30px] hover:text-slate-600">
            </iconify-icon>
        </button>

        <input type="number" class="border border-solid text-center w-10 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" 
            bind:value={stepsDurationInSeconds[index]} 
            oninput={(e) => recalculateStepsDurationAndTimeframe(e, index)} />
        <span class="font-normal text-s">s</span>

        <button onclick={() => {stepsDurationInSeconds[index] += 1; coffeeRecipeStore.stepsDurationInSeconds = stepsDurationInSeconds;} }>
            <iconify-icon icon="mdi-light:plus-circle"
                class="text-[30px] hover:text-slate-600">
            </iconify-icon>
        </button>
    {/if}
{/snippet}


<div class="flex flex-col mb-1">
    {#if coffeeRecipeSteps.steps}
        <div class="flex flex-col divide-y divide-slate-300 py-0 ">
        {#each coffeeRecipeSteps.steps as step, index }
            {#if (isRunningActiveStep(stopwatch.elaspedTimeInSeconds, coffeeRecipeSteps.stepsTimeframe[index]) )}
                {#if (!isStepCloseToFinish(stopwatch.elaspedTimeInSeconds, coffeeRecipeSteps.stepsTimeframe[index], 7)) }
                    <div class="pl-2 py-0.5 flex items-center bg-gray-900 text-white">
                        {@render stepRowDisplay(index, step, coffeeRecipeSteps.stepWaterInfos, coffeeRecipeSteps.stepsTimeframe[index], true)}
                    </div>
                    
                {:else}
                    <div class="pl-2 py-0.5 flex items-center bg-gray-900 text-white animate-pulse ">
                        {@render stepRowDisplay(index, step, coffeeRecipeSteps.stepWaterInfos, coffeeRecipeSteps.stepsTimeframe[index], true)}
                    </div>
                {/if}
            {:else if (isRunningNonActiveStep(stopwatch.elaspedTimeInSeconds, coffeeRecipeSteps.stepsTimeframe[index]))}
                <div class=" pl-2 py-0.5 flex items-center text-slate-300">
                    {@render stepRowDisplay(index, step, coffeeRecipeSteps.stepWaterInfos, coffeeRecipeSteps.stepsTimeframe[index], false)}
                </div>
            {:else}
                <div class=" pl-2 py-0.5 flex items-center">
                    {@render stepRowDisplayWithEdit(index, step, coffeeRecipeSteps.stepWaterInfos, coffeeRecipeSteps.stepsTimeframe[index], coffeeRecipeSteps.stepsDurationInSeconds, true)}
                </div>
            {/if}
        {/each}
        </div>
    {/if}
</div>


<Modal bind:this={dialog} bind:showModal={showModal} dialogTitleId={m.label_edit}>
    <StepsTimeframeEditor 
        steps={coffeeRecipeSteps.steps} 
        stepWaterInfos={coffeeRecipeSteps.stepWaterInfos} 
        stepsDurationInSeconds={coffeeRecipeSteps.stepsDurationInSeconds} 
        highlightStep={false} 
        closeDialog={closeDialog} 
        isImmersionDripperRecipe={coffeeRecipeSteps.isImmersionDripperRecipe} />
</Modal>