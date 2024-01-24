import type { Matrix } from "../get-matrix/get-matrix"

export const SIZE = {
  SEVEN: 7,
} as const
type ObjectValues<T> = T[keyof T]
export type Size = ObjectValues<typeof SIZE>

export function composeFinderPatterns(matrix: Matrix, size: Size): Matrix {
  const pattern = createPattern(size)

  // pattern in the top-left corner
  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[i].length; j++) {
      matrix[i][j] = pattern[i][j] === 1
    }
  }

  // pattern in the top-right corner
  const end = matrix.length
  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[i].length; j++) {
      matrix[i][end - size + j] = pattern[i][j] === 1
    }
  }

  // pattern in the bottom-left corner
  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[i].length; j++) {
      matrix[end - size + i][j] = pattern[i][j] === 1
    }
  }

  return matrix
}

function createPattern(size: number): number[][] {
  switch (size) {
    case SIZE.SEVEN: {
      return [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
      ]
    }
    // default to size 7
    default: {
      return [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
      ]
    }
  }
}
