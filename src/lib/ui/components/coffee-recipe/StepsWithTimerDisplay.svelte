<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';

    import 'iconify-icon';

    import { StopWatchState, StopWatchStore, getStopWatchStore } from '$lib/runes/stopwatch';

    import { getCoffeeRecipeStore } from '$lib/runes/coffee-recipe';
    const coffeeRecipeStore = getCoffeeRecipeStore();

    import RecipeParametersCardDisplay from './RecipeParametersCardDisplay.svelte';

    import StepTimeFrameDisplay from './StepTimeFrameDisplay.svelte';
	import SwitchStateDisplay from './SwitchStateDisplay.svelte';
	import Modal from '../modal/Modal.svelte';

    import StepsTimeframeEditor from './StepsTimeframeEditor.svelte';
	import StopwatchDisplay from '../stopwatch/StopwatchDisplay.svelte';

    let { steps, stepsTimeframe, stepsTimeframeDisplay, stepsDurationInSeconds, timerInSeconds } = $props();

    console.log('steps: ', steps);
    console.log('stepsTimeframe: ', stepsTimeframe);
    console.log('stepsTimeframeDisplay: ', stepsTimeframeDisplay);
    console.log('stepsDurationInSeconds: ', stepsDurationInSeconds);
    console.log('timerInSeconds: ', timerInSeconds);

    const stopwatch: StopWatchStore = getStopWatchStore();

    const isRunningActiveStep = (elaspedTimeInSeconds:number, stepsTimeframe:number[]): boolean => {
        return stopwatch.isRunning() && isActiveStep(elaspedTimeInSeconds, stepsTimeframe);
    }

    const isRunningNonActiveStep = (elaspedTimeInSeconds:number, stepsTimeframe:number[]): boolean => {
        return stopwatch.isRunning() && !isActiveStep(elaspedTimeInSeconds, stepsTimeframe);
    }
    
    const isActiveStep = (elaspedTimeInSeconds:number, stepsTimeframe:number[]) : boolean => {
        return (elaspedTimeInSeconds >= stepsTimeframe[0]) 
                && (elaspedTimeInSeconds <= stepsTimeframe[1]);
    }

    const isStepCloseToFinish = (elaspedTimeInSeconds:number, stepsTimeframe:number[], offset:number) => {
        return elaspedTimeInSeconds > (stepsTimeframe[1] - offset);
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
            'stepsDurationInSeconds:', stepsDurationInSeconds);

        let newVal = parseInt(e.currentTarget.value);
        
        stepsDurationInSeconds[index] = newVal;

        coffeeRecipeStore.stepsDurationInSeconds = stepsDurationInSeconds;
        
        // localStepsTimeframeDisplay = calculateStepsTimeframe(localStepsDurationInSeconds);
        // console.log(
        //     'recalculateStepsDurationAndTimeframe()  localStepsDurationInSeconds:', 
        //     localStepsDurationInSeconds, 'localStepsTimeframeDisplay:', localStepsTimeframeDisplay);
    }

    
</script>

<div class="flex flex-row">
    <div class="m-1 p-2 w-[6rem]">
        <StopwatchDisplay timerInSeconds={timerInSeconds} />
    </div>
    <div>    
        <RecipeParametersCardDisplay />
    </div>
</div>

<div class="flex flex-row-reverse">
    {#if inEditMode}
        <button onclick={() => { inEditMode = !inEditMode }}>
            <iconify-icon icon="material-symbols-light:check-circle"
                class="text-[30px] hover:text-slate-600">
            </iconify-icon>
        </button>
    {:else}
        <button onclick={() => { inEditMode = !inEditMode }}>
            <iconify-icon icon="material-symbols-light:ink-pen-outline-rounded"
                class="text-[30px] hover:text-slate-600">
            </iconify-icon>
        </button>
    {/if}
</div>

{#snippet stepRowDisplay(index, step, stepsTimeframeDisplay, highlightStep)}
    <!-- <button class="border border-solid border-slate-600" onclick="{showModalDialog}"> -->
    <div class="border border-solid border-slate-600">
        {#if step.switchState}
            <SwitchStateDisplay switchState={step.switchState} highlightState={highlightStep}/>
        {/if}
        {#if stepsTimeframeDisplay && stepsTimeframeDisplay[index]}
            <StepTimeFrameDisplay stepsTimeframeDisplay={stepsTimeframeDisplay[index]} highlightStep={highlightStep}/>
        {/if}
    </div>
    <!-- </button> -->
    <div class="grow ml-2">{@html step.msgKey(step.params)}</div>
{/snippet}

{#snippet stepRowDisplayWithEdit(index, step, stepsTimeframeDisplay, stepsDurationInSeconds, highlightStep)}
    <!-- <button class="border border-solid border-slate-600" onclick="{showModalDialog}"> -->
    <div class="border border-solid border-slate-600">
        {#if step.switchState}
            <SwitchStateDisplay switchState={step.switchState} highlightState={highlightStep}/>
        {/if}
        {#if stepsTimeframeDisplay && stepsTimeframeDisplay[index]}
            <StepTimeFrameDisplay stepsTimeframeDisplay={stepsTimeframeDisplay[index]} highlightStep={highlightStep}/>
        {/if}
    </div>
    <!-- </button> -->
    <div class="grow ml-2">{@html step.msgKey(step.params)}</div>

    {#if inEditMode}
        <button onclick={() => {stepsDurationInSeconds[index] -= 1; coffeeRecipeStore.stepsDurationInSeconds = stepsDurationInSeconds;} }>
            <iconify-icon icon="mdi-light:minus-circle"
                class="text-[26px] hover:text-slate-600">
            </iconify-icon>
        </button>

        <input type="number" class="border border-solid text-center w-10 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" 
            bind:value={stepsDurationInSeconds[index]} 
            oninput={(e) => recalculateStepsDurationAndTimeframe(e, index)} />
        <span class="font-normal text-s">s</span>

        <button onclick={() => {stepsDurationInSeconds[index] += 1; coffeeRecipeStore.stepsDurationInSeconds = stepsDurationInSeconds;} }>
            <iconify-icon icon="mdi-light:plus-circle"
                class="text-[26px] hover:text-slate-600">
            </iconify-icon>
        </button>
    {/if}
{/snippet}


<div class="flex flex-col mb-1">
    {#if steps}
        <div class="flex flex-col divide-y divide-slate-300 py-1 ">
        {#each steps as step, index }
            {#if (isRunningActiveStep(stopwatch.elaspedTimeInSeconds, stepsTimeframe[index]) )}
                {#if (!isStepCloseToFinish(stopwatch.elaspedTimeInSeconds, stepsTimeframe[index], 7)) }
                    <div class="pl-2 py-2 flex items-center bg-gray-900 text-white">
                        {@render stepRowDisplay(index, step, stepsTimeframeDisplay, true)}
                    </div>
                    
                {:else}
                    <div class="pl-2 py-2 flex items-center bg-gray-900 text-white animate-pulse ">
                        {@render stepRowDisplay(index, step, stepsTimeframeDisplay, true)}
                    </div>
                {/if}
            {:else if (isRunningNonActiveStep(stopwatch.elaspedTimeInSeconds, stepsTimeframe[index]))}
                <div class=" pl-2 py-2 flex items-center text-slate-300">
                    {@render stepRowDisplay(index, step, stepsTimeframeDisplay, false)}
                </div>
            {:else}
                <div class=" pl-2 py-2 flex items-center">
                    {@render stepRowDisplayWithEdit(index, step, stepsTimeframeDisplay, stepsDurationInSeconds, true)}
                </div>
            {/if}
        {/each}
        </div>
    {/if}
</div>


<Modal bind:this={dialog} bind:showModal={showModal} dialogTitleId={m.label_edit}>
    <StepsTimeframeEditor steps={steps} stepsDurationInSeconds={stepsDurationInSeconds} highlightStep={false} closeDialog={closeDialog} />
</Modal>