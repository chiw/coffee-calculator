export const displayNumber = (number: number, decimalPlaces = 1): String => {
    return Number.isInteger(number) ? String(number) : number.toFixed(decimalPlaces);
}