/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
import { composeAlignmentPatterns } from "../compose-alignment-patterns/compose-alignment-patterns"
import { SIZE, composeFinderPatterns } from "../compose-finder-patterns/compose-finder-patterns"
import { getBitStream } from "../get-bit-stream/get-bit-stream"
import { numberToBinary } from "../number-to-binary/number-to-binary"
import { padBitStream } from "../pad-bit-stream/pad-bit-stream"

export const MODE = {
  BYTE: "0100",
  // NUMERIC: "0001",
  // ALPHANUMERIC: "0010",
  // KANJI: "1000",
} as const
type ObjectValues<T> = T[keyof T]
export type Mode = ObjectValues<typeof MODE>

export const VERSION = {
  ONE: 21,
  // TWO: 25,
  // THREE: 29,
  // FOUR: 33,
  // TEN: 57,
  // TWENTY_FIVE: 117,
  // FORTY: 177,
} as const
export type Version = ObjectValues<typeof VERSION>

export const MODE_SIZE = {
  BYTE: 8,
  // NUMERIC: 8,
  // ALPHANUMERIC: 8,
  // KANJI: 8,
} as const
export type CharacterSize = ObjectValues<typeof MODE_SIZE>

// 0 === white
// 1 === black
export type Matrix = number[][]
export function getMatrix(text: string): Matrix {
  const bitStream = padBitStream(
    MODE.BYTE + numberToBinary(text.length) + getBitStream(text),
    MODE_SIZE.BYTE,
  )
  const version = VERSION.ONE
  const matrix = pipe(
    createMatrix(version),
    (matrix) => composeFinderPatterns(matrix, SIZE.SEVEN),
    (matrix) => composeAlignmentPatterns(matrix, version),
    // (matrix) => composeTimingPatterns(matrix, SIZE.SEVEN),
    // (matrix) => composeBitStream(matrix, SIZE.SEVEN),
    // (matrix) => [matrix, getMaskPattern(matrix)],
    // ([matrix, maskPattern]) => composeMask(matrix, maskPattern)
  )

  return matrix
}
export function pipe<T>(initialState: T, ...fns: ((arg: T) => T)[]): T {
  return fns.reduce((result, fn) => fn(result), initialState)
}

export function createMatrix(version: Version): Matrix {
  return Array.from(
    { length: version },
    () => Array.from({ length: version }, () => 0),
  )
}
