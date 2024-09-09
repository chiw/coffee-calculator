export const toHHMMSS = (secNum: number) => {
    let hours: number = Math.floor(secNum / 3600);
    let hh: string = '';
    if(hours > 0) {
      hh = hours.toString().padStart(2, "0").concat(':');
    }

    let minutes: number = Math.floor((secNum - hours * 3600) / 60);
    let mm = minutes.toString().padStart(2, "0");

    let ss = (secNum - hours * 3600 - (minutes * 60)).toString().padStart(2, "0");
    return `${hh}${mm}:${ss}`;
}

export const calculateStepsTimeframe = (stepsDurationInSeconds: number[])  => {
  let from: number = 0;
  let stepsTimeframeDisplay: string[][] = [];
  stepsDurationInSeconds.map(duration => {
      let timeframe = calculateTimeframes(from, duration);
      from = timeframe[1];

      let stepTimeDisplay = [toHHMMSS(timeframe[0]), toHHMMSS(timeframe[1])];
      stepsTimeframeDisplay.push(stepTimeDisplay);
  });
  return stepsTimeframeDisplay;
}

const calculateTimeframes = (from: number, duration: number) : number[] => {
  return [from, from + duration];
}