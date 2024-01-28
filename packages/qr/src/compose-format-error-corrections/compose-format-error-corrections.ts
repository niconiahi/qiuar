/* eslint-disable no-console */
import { ERROR_CORRECTION_LEVEL_LENGTH } from "../compose-errors-correction-levels/compose-errors-correction-levels"
import { FINDER_PATTERN } from "../compose-finders/compose-finders"
import { MASK_LENGTH } from "../compose-masks/compose-masks"
import { SEPARATOR_WIDTH } from "../compose-separators/compose-separators"
import type { Matrix } from "../get-matrix/get-matrix"

export function composeFormatErrorCorrection(matrix: Matrix): Matrix {
  const format = getFormat(matrix)
  console.log("composeFormatErrorCorrection => format =>", format)

  return matrix
}

function getFormat(matrix: Matrix): number[] {
  const offset = FINDER_PATTERN.length + SEPARATOR_WIDTH
  const length = ERROR_CORRECTION_LEVEL_LENGTH + MASK_LENGTH

  // top-left error correction
  // eslint-disable-next-line prefer-const
  let format = []
  for (let i = 0; i < length; i++) {
    format[i] = matrix[offset][i]
  }

  return format
}
