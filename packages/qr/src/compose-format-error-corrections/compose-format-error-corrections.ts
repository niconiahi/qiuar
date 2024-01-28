/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
import { FINDER_PATTERN } from "../compose-finders/compose-finders"
import { SEPARATOR_WIDTH } from "../compose-separators/compose-separators"
import type { Matrix } from "../get-matrix/get-matrix"

export function composeFormatErrorCorrection(matrix: Matrix): Matrix {
  const format = getFormat(matrix)

  return matrix
}

function getFormat(matrix: Matrix): number[] {
  const offset = FINDER_PATTERN.length + SEPARATOR_WIDTH
  const length = 5

  // top-left error correction
  // eslint-disable-next-line prefer-const
  let format = []
  for (let i = 0; i < length; i++) {
    format[i] = matrix[offset][i]
  }

  return format
}
