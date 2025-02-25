import type { Timeframe } from '$lib/coffee-recipes/CoffeeRecipeTypes';

const toHHMMSS = (secNum: number) => {
	const hours: number = Math.floor(secNum / 3600);
	let hh: string = '';
	if (hours > 0) {
		hh = hours.toString().padStart(2, '0').concat(':');
	}

	const minutes: number = Math.floor((secNum - hours * 3600) / 60);
	const mm = minutes.toString().padStart(2, '0');

	const ss = (secNum - hours * 3600 - minutes * 60).toString().padStart(2, '0');
	return `${hh}${mm}:${ss}`;
};

const calculateTimeframe = (from: number, duration: number): Timeframe => {
	const fromVal = from;
	const toVal = from + duration;

	return <Timeframe>{
		from: fromVal,
		to: toVal,
		fromDisplay: toHHMMSS(fromVal),
		toDisplay: toHHMMSS(toVal)
	};
};

export const calculateStepsTimeframe = (stepsDurationInSeconds: number[]): Timeframe[] => {
	let from: number = 0;
	const stepsTimeframe: Timeframe[] = [];
	if (stepsDurationInSeconds) {
		stepsDurationInSeconds.map((duration) => {
			const timeframe = calculateTimeframe(from, duration);
			stepsTimeframe.push(timeframe);
			from = timeframe.to;
		});
	}
	return stepsTimeframe;
};
