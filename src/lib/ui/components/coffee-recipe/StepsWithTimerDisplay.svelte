<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';

    import { StopWatchState, StopWatchStore, getStopWatchStore } from '$lib/runes/stopwatch';

    import RecipeParametersCardDisplay from './RecipeParametersCardDisplay.svelte';

    import StepTimeFrameDisplay from './StepTimeFrameDisplay.svelte';

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
    

</script>

<div class="flex flex-row">
    <div class="m-1 p-2 w-[6rem]">
        {#if startBtnClicked}
            {#if StopWatchState.STOP === stopwatch.stopwatchState}
                <div>
                    <button class="w-20 h-9 bg-black hover:bg-slate-600 text-white rounded font-bold" onclick={resetTimer}>{m.label_reset()}</button>
                </div>
            {:else}
                <div class="font-semibold text-3xl italic">{stopwatch.formattedElaspedTime}</div>
            {/if}
        {:else}
            <div>
                <div class="font-semibold text-3xl italic">{stopwatch.formattedElaspedTime}</div>
                <button class="w-20 h-9 mt-3 bg-black hover:bg-slate-600 text-white rounded font-bold" onclick={startTimer}>{m.label_start_recipe()}</button>
            </div>
        {/if}
    </div>
    <div>    
        <RecipeParametersCardDisplay />
    </div>
</div>

<div class="flex flex-col mt-2 mb-1">
    {#if steps}
        <div class="flex flex-col divide-y divide-slate-300 py-1 ">
        {#each steps as step, index }
            {#if (StopWatchState.RUNNING === stopwatch.stopwatchState && (stopwatch.elaspedTimeInSeconds >= stepsTimeframe[index][0]) && (stopwatch.elaspedTimeInSeconds <= stepsTimeframe[index][1]) ) }
                {#if (stopwatch.elaspedTimeInSeconds <= (stepsTimeframe[index][1] - 7) )}
                    <div class="bg-gray-900 text-white  pl-2 py-2 flex">
                        <div><StepTimeFrameDisplay stepsTimeframeDisplay={stepsTimeframeDisplay[index]} /></div>
                        <div>{@html step}</div>
                    </div>
                {:else}
                    <div class="animate-pulse bg-gray-900 text-white  pl-2 py-2 flex">
                        <div><StepTimeFrameDisplay stepsTimeframeDisplay={stepsTimeframeDisplay[index]} /></div>
                        <div>{@html step}</div>
                    </div>
                {/if}
            {:else}
                {#if (StopWatchState.RUNNING === stopwatch.stopwatchState) }
                    <div class=" pl-2 py-2  text-slate-300 flex">
                        <div><StepTimeFrameDisplay stepsTimeframeDisplay={stepsTimeframeDisplay[index]} /></div>
                        <div>{@html step}</div>
                    </div>
                {:else}
                    <div class=" pl-2 py-2 flex">
                        <div><StepTimeFrameDisplay stepsTimeframeDisplay={stepsTimeframeDisplay[index]} /></div>
                        <div>{@html step}</div>
                    </div>
                {/if}
            {/if}
        {/each}
        </div>
    {/if}
</div>

