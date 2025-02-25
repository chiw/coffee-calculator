export const displayNumber = (number: number, decimalPlaces = 1): string => {
	return Number.isInteger(number) ? String(number) : number.toFixed(decimalPlaces);
};
