import { LENGTH as ERROR_CORRECTION_LENGTH } from "../compose-error-corrections/compose-error-corrections"
import { FINDER_PATTERN } from "../compose-finders/compose-finders"
import { WIDTH as SEPARATOR_WIDTH } from "../compose-separators/compose-separators"
import type { Matrix } from "../get-matrix/get-matrix"

export const PATTERN = {
  ONE: [0, 0, 0],
  TWO: [0, 0, 1],
  THREE: [0, 1, 0],
  FOUR: [0, 1, 1],
  FIVE: [1, 0, 0],
  SIX: [1, 0, 1],
  SEVEN: [1, 1, 0],
  EIGHT: [1, 1, 1],
} as const
type ObjectValues<T> = T[keyof T]
export type Pattern = ObjectValues<typeof PATTERN>

const SIZE = 3

export function composeMasks(matrix: Matrix, pattern: Pattern): Matrix {
  const offset = FINDER_PATTERN.length + SEPARATOR_WIDTH
  const end = matrix.length

  // top-left error correction
  for (let i = 0; i < SIZE; i++) {
    matrix[offset][i + ERROR_CORRECTION_LENGTH] = pattern[i]
  }

  // bottom-left error correction
  for (let i = 0; i < SIZE; i++) {
    matrix[end - i - 1 - ERROR_CORRECTION_LENGTH][offset] = pattern[i]
  }

  return matrix
}
