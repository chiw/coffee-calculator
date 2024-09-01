<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';

    import 'iconify-icon';

    import { StopWatchState, StopWatchStore, getStopWatchStore } from '$lib/runes/stopwatch';

    import RecipeParametersCardDisplay from './RecipeParametersCardDisplay.svelte';

    import StepTimeFrameDisplay from './StepTimeFrameDisplay.svelte';
	import SwitchStateDisplay from './SwitchStateDisplay.svelte';

    let { steps, stepsTimeframe, stepsTimeframeDisplay, timerInSeconds } = $props();

    console.log('steps: ', steps);
    console.log('stepsTimeframe: ', stepsTimeframe);
    console.log('stepsTimeframeDisplay: ', stepsTimeframeDisplay);
    console.log('timerInSeconds: ', timerInSeconds);

    let startBtnClicked = $state(false);

    const stopwatch: StopWatchStore = getStopWatchStore();

    function startTimer() {
        console.log('clicked start button');
        startBtnClicked = true;
        stopwatch.start(timerInSeconds);
    }

    function resetTimer() {
        console.log('reset button clicked');
        startBtnClicked = false;
        stopwatch.reset();
    }

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
</script>

<div class="flex flex-row">
    <div class="m-1 p-2 w-[6rem]">
        {#if StopWatchState.NEW === stopwatch.stopwatchState}
            <div class="flex flex-col items-center">
                <div class="font-semibold text-3xl italic">{stopwatch.formattedElaspedTime}</div>
                <iconify-icon icon="material-symbols-light:play-circle-outline-rounded"
                    class="text-[40px] hover:text-slate-600"
                    onclick={startTimer}>
                </iconify-icon>
            </div>
       {:else}
            <div class="flex flex-col items-center">
                <div class="font-semibold text-3xl italic">{stopwatch.formattedElaspedTime}</div>
                <iconify-icon icon="material-symbols-light:stop-circle-outline-rounded"
                    class="text-[40px] hover:text-slate-600" 
                    onclick={resetTimer}>
                </iconify-icon>
            </div>
        {/if}
    </div>
    <div>    
        <RecipeParametersCardDisplay />
    </div>
</div>

{#snippet stepRowDisplay(step, stepsTimeframeDisplay, highlightStep)}
    <div class="border border-solid border-slate-600">
        {#if step.switchState}
            <SwitchStateDisplay switchState={step.switchState} highlightState={highlightStep}/>
        {/if}
        <StepTimeFrameDisplay stepsTimeframeDisplay={stepsTimeframeDisplay} highlightStep={highlightStep}/>
    </div>                        
    <div class="ml-2">{@html step.msgKey(step.params)}</div>
{/snippet}

<div class="flex flex-col mt-2 mb-1">
    {#if steps}
        <div class="flex flex-col divide-y divide-slate-300 py-1 ">
        {#each steps as step, index }
            {#if (isRunningActiveStep(stopwatch.elaspedTimeInSeconds, stepsTimeframe[index]) )}
                {#if (!isStepCloseToFinish(stopwatch.elaspedTimeInSeconds, stepsTimeframe[index], 7)) }
                    <div class="pl-2 py-2 flex items-center bg-gray-900 text-white">
                        {@render stepRowDisplay(step, stepsTimeframeDisplay[index], true)}
                    </div>
                    
                {:else}
                    <div class="pl-2 py-2 flex items-center bg-gray-900 text-white animate-pulse ">
                        {@render stepRowDisplay(step, stepsTimeframeDisplay[index], true)}
                    </div>
                {/if}
            {:else if (isRunningNonActiveStep(stopwatch.elaspedTimeInSeconds, stepsTimeframe[index]))}
                <div class=" pl-2 py-2 flex items-center text-slate-300">
                    {@render stepRowDisplay(step, stepsTimeframeDisplay[index], false)}
                </div>
            {:else}
                <div class=" pl-2 py-2 flex items-center">
                    {@render stepRowDisplay(step, stepsTimeframeDisplay[index], true)}
                </div>
            {/if}
        {/each}
        </div>
    {/if}
</div>