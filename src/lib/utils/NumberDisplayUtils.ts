export const displayNumber = (number: number, decimalPlaces = 2) => {
    return Number.isInteger(number) ? number : number.toFixed(decimalPlaces);
}