import type { Matrix } from "../get-matrix/get-matrix"

const VALUE = 0
export const QUIET_ZONE_WIDTH = 4

export function composeQuietZone(matrix: Matrix): Matrix {
  const size = matrix.length + QUIET_ZONE_WIDTH * 2

  // eslint-disable-next-line prefer-const
  let nextMatrix: Matrix = Array(size).fill(0).map(() => Array(size).fill(VALUE))
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      nextMatrix[i + QUIET_ZONE_WIDTH][j + QUIET_ZONE_WIDTH] = matrix[i][j]
    }
  }
  matrix = nextMatrix

  return matrix
}
