import { getContext, setContext } from "svelte";
import { StopWatchState } from "./StopwatchState.type";

export class StopWatchRunes {
    
    pad2 = (number: number) => `00${number}`.slice(-2);
    pad3 = (number: number) => `000${number}`.slice(-3);

    interval: any;
    
    startTime = $state<number>(0);
    elaspedTime = $state<number>(0);
    stopUntil = $state<number>(180);    
    stopwatchState = $state<StopWatchState>(StopWatchState.NEW);

    hours = $derived(this.pad2(Math.floor(this.elaspedTime / 1000 / 60 / 60) % 60));
    minutes = $derived(this.pad2(Math.floor(this.elaspedTime / 1000 / 60) % 60));
    seconds = $derived(this.pad2(Math.floor(this.elaspedTime / 1000) % 60));
    millis = $derived(this.pad3(this.elaspedTime % 1000));

    elaspedTimeInSeconds = $derived(this.elaspedTime / 1000);

    // formattedElaspedTime = $derived(this.hours + ":" + this.minutes + ":" + this.seconds + ":" + this.millis);
    formattedElaspedTime = $derived(this.minutes + ":" + this.seconds);

    start(stopUntil: number) {
        // console.log('started stopwatch, set stopUntil to ', stopUntil);
        this.stopUntil = stopUntil;
        this.startTime = Date.now();
        this.stopwatchState = StopWatchState.RUNNING;
        this.interval = setInterval(() => {
            if(this.stopwatchState === StopWatchState.RUNNING) {
                const currTime = Date.now();
                this.elaspedTime = currTime - this.startTime;                    

                if(this.elaspedTime >= (this.stopUntil * 1000)) {
                    // console.log('count finished, clear interval');
                    this.reset();
                }
            }
        }, 10);
    }

    reset() {
        // console.log('reset stopwatch');
        this.elaspedTime = 0;
        this.stopwatchState = StopWatchState.NEW;
        clearInterval(this.interval);
    }

    isRunning() {
        return StopWatchState.RUNNING === this.stopwatchState;
    }
}

const STOPWATCH_RUNES_CONTEXT_KEY = Symbol('STOPWATCH_RUNES_CONTEXT_KEY');

export const setStopWatchRunes = () => {
    return setContext(STOPWATCH_RUNES_CONTEXT_KEY, new StopWatchRunes());
}

export const getStopWatchRunes = (): StopWatchRunes => {
    return getContext<ReturnType<typeof setStopWatchRunes>>(STOPWATCH_RUNES_CONTEXT_KEY);
}
