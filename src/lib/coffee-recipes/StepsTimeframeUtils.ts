import type { Timeframe } from '$lib/coffee-recipes/CoffeeRecipeTypes';

const toHHMMSS = (secNum: number) => {
	let hours: number = Math.floor(secNum / 3600);
	let hh: string = '';
	if (hours > 0) {
		hh = hours.toString().padStart(2, '0').concat(':');
	}

	let minutes: number = Math.floor((secNum - hours * 3600) / 60);
	let mm = minutes.toString().padStart(2, '0');

	let ss = (secNum - hours * 3600 - minutes * 60).toString().padStart(2, '0');
	return `${hh}${mm}:${ss}`;
};

const calculateTimeframe = (from: number, duration: number): Timeframe => {
	let fromVal = from;
	let toVal = from + duration;

	return <Timeframe>{
		from: fromVal,
		to: toVal,
		fromDisplay: toHHMMSS(fromVal),
		toDisplay: toHHMMSS(toVal)
	};
};

export const calculateStepsTimeframe = (stepsDurationInSeconds: number[]): Timeframe[] => {
	let from: number = 0;
	let stepsTimeframe: Timeframe[] = [];
	if (stepsDurationInSeconds) {
		stepsDurationInSeconds.map((duration) => {
			let timeframe = calculateTimeframe(from, duration);
			stepsTimeframe.push(timeframe);
			from = timeframe.to;
		});
	}
	return stepsTimeframe;
};
