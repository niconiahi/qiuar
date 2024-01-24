import { type Matrix, VERSION, type Version } from "../get-matrix/get-matrix"

const ALIGNMENT_PATTERN = [
  [1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1],
]
type Position = [number, number]

export function composeAlignmentPatterns(matrix: Matrix, version: Version): Matrix {
  const positions = getPositions(matrix, version)
  for (const position of positions) {
    matrix = composeAlignmentPattern(matrix, position)
  }
  return matrix
}

function composeAlignmentPattern(matrix: Matrix, position: Position): Matrix {
  const size = ALIGNMENT_PATTERN.length
  const [x, y] = position
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      matrix[y + row][x + col] = ALIGNMENT_PATTERN[row][col]
    }
  }
  return matrix
}

function getAmount(version: Version): number {
  if (version === VERSION.ONE) {
    return 0
  }
  if (version === VERSION.TWO) {
    return 1
  }
  return 0
}

function getPositions(matrix: Matrix, version: Version): Position[] {
  const amount = getAmount(version)
  if (amount === 0) {
    return []
  }

  const size = matrix.length
  const positions: Position[] = []
  for (let row = 0; row < size; row++) {
    for (let column = 0; column < size; column++) {
      const x = getCoordinate(row)
      const y = getCoordinate(column)
      positions.push([x, y])
      if (positions.length === amount) {
        return positions
      }
    }
  }

  return positions
}

function getCoordinate(position: number): number {
  const START = 10
  const INTERVAL = 4
  return position + 1 * INTERVAL + START
}
