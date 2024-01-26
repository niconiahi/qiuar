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

export function composeFinders(matrix: Matrix): Matrix {
  const pattern = FINDER_PATTERN
  const size = FINDER_PATTERN.length

  // pattern in the top-left corner
  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[i].length; j++) {
      matrix[i][j] = pattern[i][j]
    }
  }

  // pattern in the top-right corner
  const end = matrix.length
  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[i].length; j++) {
      matrix[i][end - size + j] = pattern[i][j]
    }
  }

  // pattern in the bottom-left corner
  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[i].length; j++) {
      matrix[end - size + i][j] = pattern[i][j]
    }
  }

  return matrix
}
