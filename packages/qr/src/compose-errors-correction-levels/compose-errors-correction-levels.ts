import { FINDER_PATTERN_LENGTH } from "../compose-finders/compose-finders"
import { SEPARATOR_WIDTH } from "../compose-separators/compose-separators"
import type { Matrix } from "../get-matrix/get-matrix"

export const LEVEL = {
  L: [1, 1],
  M: [1, 0],
  Q: [0, 1],
  H: [0, 0],
} as const
type ObjectValues<T> = T[keyof T]
export type Level = ObjectValues<typeof LEVEL>
export const ERROR_CORRECTION_LEVEL_LENGTH = LEVEL.L.length

export function composeErrorCorrectionLevels(matrix: Matrix, level: Level): Matrix {
  const offset = FINDER_PATTERN_LENGTH + SEPARATOR_WIDTH
  const end = matrix.length

  // top-left error correction
  for (let i = 0; i < ERROR_CORRECTION_LEVEL_LENGTH; i++) {
    matrix[offset][i] = level[i]
  }

  // bottom-left error correction
  for (let i = 0; i < ERROR_CORRECTION_LEVEL_LENGTH; i++) {
    matrix[end - i - 1][offset] = level[i]
  }

  return matrix
}
