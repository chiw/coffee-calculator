import { StopWatchState } from "./StopwatchState.type";

export function createStopwatch() {

    const pad2 = (number: number) => `00${number}`.slice(-2);
    const pad3 = (number: number) => `000${number}`.slice(-3);

    let interval: any;
    
    let _startTime = $state<number>(0);
    let _elaspedTime = $state<number>(0);
    let _stopUntil = $state<number>(180);    
    let _stopwatchState = $state<StopWatchState>(StopWatchState.NEW);

    let _hours = $derived(pad2(Math.floor(_elaspedTime / 1000 / 60 / 60) % 60));
    let _minutes = $derived(pad2(Math.floor(_elaspedTime / 1000 / 60) % 60));
    let _seconds = $derived(pad2(Math.floor(_elaspedTime / 1000) % 60));
    let _millis = $derived(pad3(_elaspedTime % 1000));

    let _elaspedTimeInSeconds = $derived(_elaspedTime / 1000);

    // let formattedElaspedTime = $derived(hours + ":" + minutes + ":" + seconds + ":" + millis);
    let formattedElaspedTime = $derived(_minutes + ":" + _seconds);

    function start(stopUntil) {
        console.log('started stopwatch, set stopUntil to ', stopUntil);
        _stopUntil = stopUntil;
        _startTime = Date.now();
        _stopwatchState = StopWatchState.RUNNING;
        interval = setInterval(() => {
            if(_stopwatchState === StopWatchState.RUNNING) {
                const currTime = Date.now();
                _elaspedTime = currTime - _startTime;                    

                if(_elaspedTime >= (_stopUntil * 1000)) {
                    console.log('count finished, clear interval');
                    _stopwatchState = StopWatchState.STOP;
                    clearInterval(interval);
                }
            }
        }, 10);
    }

    function reset() {
        console.log('reset stopwatch');
        _elaspedTime = 0;
        _stopwatchState = StopWatchState.NEW;
        clearInterval(interval);
    }

    return {
        start,
        reset,

        get stopwatchState() {
            return _stopwatchState;
        },

        get elaspedTimeInSeconds() { return _elaspedTimeInSeconds; },

        get formattedElaspedTime() { return formattedElaspedTime; }
    }

}