/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
import { composeAlignmentPatterns } from "../compose-alignment-patterns/compose-alignment-patterns"
import { SIZE, composeFinderPatterns } from "../compose-finder-patterns/compose-finder-patterns"
import { getBitStream } from "../get-bit-stream/get-bit-stream"
import { numberToBinary } from "../number-to-binary/number-to-binary"
import { padBitStream } from "../pad-bit-stream/pad-bit-stream"

export const MODE = {
  BYTE: "0100",
  NUMERIC: "0001",
  ALPHANUMERIC: "0010",
  KANJI: "1000",
  ECI: "0111",
} as const
type ObjectValues<T> = T[keyof T]
export type Mode = ObjectValues<typeof MODE>

export const VERSION = {
  ONE: 21,
  TWO: 25,
  THREE: 32,
} as const
export type Version = ObjectValues<typeof VERSION>

export const CHARACTER_SIZE = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9,
} as const
export type CharacterSize = ObjectValues<typeof CHARACTER_SIZE>

export type Matrix = number[][]
export function getMatrix(text: string): Matrix {
  const bitStream = padBitStream(
    MODE.BYTE + numberToBinary(text.length) + getBitStream(text),
    CHARACTER_SIZE.EIGHT,
  )
  const version = VERSION.TWO
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
