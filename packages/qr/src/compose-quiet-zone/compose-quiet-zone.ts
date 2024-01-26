import type { Matrix } from "../get-matrix/get-matrix"

const VALUE = 0

export function composeQuietZone(matrix: Matrix): Matrix {
  const offset = 4
  const size = matrix.length + offset * 2

  // eslint-disable-next-line prefer-const
  let nextMatrix: Matrix = Array(size).fill(0).map(() => Array(size).fill(VALUE))
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      nextMatrix[i + offset][j + offset] = matrix[i][j]
    }
  }
  matrix = nextMatrix

  return matrix
}
