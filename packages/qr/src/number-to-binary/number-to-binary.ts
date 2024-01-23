export const CHARACTER_COUNT_INDICATOR_LENGTH = 8
export function numberToBinary(number: number): string {
  return number.toString(2).padStart(CHARACTER_COUNT_INDICATOR_LENGTH, "0")
}
