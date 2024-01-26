import { FINDER_PATTERN } from "../compose-finders/compose-finders"
import { WIDTH as SEPARATOR_WIDTH } from "../compose-separators/compose-separators"
import { type Matrix, VERSION, type Version } from "../get-matrix/get-matrix"

function getPattern(version: Version): number[] {
  if (version === VERSION.ONE) {
    return [1, 0, 1, 0, 1]
  }

  return []
}

export function composeTimings(matrix: Matrix, version: Version): Matrix {
  const pattern = getPattern(version)
  const length = pattern.length
  const end = matrix.length

  // top-left error correction
  for (let i = 0; i < length; i++) {
    const row = FINDER_PATTERN.length - 1
    const column = FINDER_PATTERN.length + SEPARATOR_WIDTH + i
    matrix[row][column] = pattern[i]
  }

  // bottom-left error correction
  for (let i = 0; i < length; i++) {
    const row = end - FINDER_PATTERN.length - SEPARATOR_WIDTH - 1 - i
    const column = FINDER_PATTERN.length - 1
    matrix[row][column] = pattern[i]
  }

  return matrix
}
