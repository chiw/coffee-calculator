<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';

    import { StopWatchState, StopWatchStore, getStopWatchStore } from '$lib/runes/stopwatch';

    let { steps, stepsTimeframe, timerInSeconds } = $props();

    console.log('steps: ', steps);
    console.log('stepsTimeframe: ', stepsTimeframe);
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

<div class="flex flex-col mt-2 mb-1">
    {#if steps}
        {#if startBtnClicked}
            {#if StopWatchState.STOP === stopwatch.stopwatchState}
                <div>
                    <button class="w-32 h-9 bg-black hover:bg-slate-600 text-white rounded font-bold" onclick={resetTimer}>{m.label_reset()}</button>
                </div>
            {:else}
                <div class="font-semibold text-3xl">{stopwatch.formattedElaspedTime}</div>
            {/if}
        {:else}
            <div>
                <button class="w-32 h-9 bg-black hover:bg-slate-600 text-white rounded font-bold" onclick={startTimer}>{m.label_start_recipe()}</button>
            </div>
        {/if}

        <ul role="list" class="divide-y divide-slate-300 py-1 ">
        {#each steps as step, index }
            {#if (StopWatchState.RUNNING === stopwatch.stopwatchState && (stopwatch.elaspedTimeInSeconds >= stepsTimeframe[index][0]) && (stopwatch.elaspedTimeInSeconds <= stepsTimeframe[index][1]) ) }
                {#if (stopwatch.elaspedTimeInSeconds <= (stepsTimeframe[index][1] - 7) )}
                    <li class="bg-gray-900 text-white  pl-2 py-2 ">{@html step}</li>
                {:else}
                    <li class="animate-pulse bg-gray-900 text-white  pl-2 py-2 ">{@html step}</li>
                {/if}
            {:else}
                {#if (StopWatchState.RUNNING === stopwatch.stopwatchState) }
                    <li class=" pl-2 py-2  text-slate-300">{@html step}</li>
                {:else}
                    <li class=" pl-2 py-2 ">{@html step}</li>
                {/if}
            {/if}
        {/each}
        </ul>
    {/if}
</div>

