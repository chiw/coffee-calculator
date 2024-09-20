export const displayNumber = (number: number, decimalPlaces = 2): String => {
    return Number.isInteger(number) ? String(number) : number.toFixed(decimalPlaces);
}