import { FINDER_PATTERN } from "../compose-finders/compose-finders"
import type { Matrix } from "../get-matrix/get-matrix"

const VALUE = 0
const SEPARATOR_LENGTH = 8
export const SEPARATOR_WIDTH = 1

export function composeSeparators(matrix: Matrix): Matrix {
  const offset = FINDER_PATTERN.length
  const end = matrix.length

  // top-left separator
  for (let i = 0; i < SEPARATOR_LENGTH; i++) {
    matrix[i][offset] = VALUE
    matrix[offset][i] = VALUE
  }

  // top-right separator
  for (let i = 0; i < SEPARATOR_LENGTH; i++) {
    matrix[i][end - offset - 1] = VALUE
    matrix[offset][end - i - 1] = VALUE
  }

  // bottom-left separator
  for (let i = 0; i < SEPARATOR_LENGTH; i++) {
    matrix[end - i - 1][offset] = VALUE
    matrix[end - offset - 1][i] = VALUE
  }

  return matrix
}
