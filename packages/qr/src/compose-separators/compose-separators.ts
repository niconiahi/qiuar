import { FINDER_PATTERN } from "../compose-finders/compose-finders"
import type { Matrix } from "../get-matrix/get-matrix"

const SIZE = 8
const VALUE = 0

export function composeSeparators(matrix: Matrix): Matrix {
  const offset = FINDER_PATTERN.length
  const end = matrix.length

  // top-left separator
  for (let i = 0; i < SIZE; i++) {
    matrix[i][offset] = VALUE
    matrix[offset][i] = VALUE
  }

  // top-right separator
  for (let i = 0; i < SIZE; i++) {
    matrix[i][end - offset - 1] = VALUE
    matrix[offset][end - i - 1] = VALUE
  }

  // bottom-left separator
  for (let i = 0; i < SIZE; i++) {
    matrix[end - i - 1][offset] = VALUE
    matrix[end - offset - 1][i] = VALUE
  }

  return matrix
}
