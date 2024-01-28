import type { Matrix } from "../get-matrix/get-matrix"

export const FINDER_PATTERN = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
]
export const FINDER_PATTERN_LENGTH = FINDER_PATTERN.length

export function composeFinders(matrix: Matrix): Matrix {
  // pattern in the top-left corner
  for (let i = 0; i < FINDER_PATTERN_LENGTH; i++) {
    for (let j = 0; j < FINDER_PATTERN_LENGTH; j++) {
      matrix[i][j] = FINDER_PATTERN[i][j]
    }
  }

  // pattern in the top-right corner
  const end = matrix.length
  for (let i = 0; i < FINDER_PATTERN_LENGTH; i++) {
    for (let j = 0; j < FINDER_PATTERN_LENGTH; j++) {
      matrix[i][end - FINDER_PATTERN_LENGTH + j] = FINDER_PATTERN[i][j]
    }
  }

  // pattern in the bottom-left corner
  for (let i = 0; i < FINDER_PATTERN_LENGTH; i++) {
    for (let j = 0; j < FINDER_PATTERN_LENGTH; j++) {
      matrix[end - FINDER_PATTERN_LENGTH + i][j] = FINDER_PATTERN[i][j]
    }
  }

  return matrix
}
