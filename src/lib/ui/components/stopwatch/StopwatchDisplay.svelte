<script lang="ts">
    import 'iconify-icon';

    import { StopWatchState, StopWatchRunes, getStopWatchRunes } from '$lib/runes/stopwatch';

    let { timerInSeconds } = $props();

    let startBtnClicked = $state(false);

    const stopwatch: StopWatchRunes = getStopWatchRunes();

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

{#if StopWatchState.NEW === stopwatch.stopwatchState}
    <div class="flex flex-col items-center">
        <div class="font-semibold text-3xl italic">{stopwatch.formattedElaspedTime}</div>
        <button onclick={startTimer}>
            <iconify-icon icon="material-symbols-light:play-circle-outline-rounded"
                class="text-[40px] hover:text-slate-600">
            </iconify-icon>
        </button>
    </div>
{:else}
    <div class="flex flex-col items-center">
        <div class="font-semibold text-3xl italic">{stopwatch.formattedElaspedTime}</div>
        <button onclick={resetTimer}>
            <iconify-icon icon="material-symbols-light:stop-circle-outline-rounded"
                class="text-[40px] hover:text-slate-600">
            </iconify-icon>
        </button>
    </div>
{/if}