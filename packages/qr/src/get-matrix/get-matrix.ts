/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
import { composeAlignments } from "../compose-alignments/compose-alignments"
import { LEVEL, composeErrorCorrections } from "../compose-error-corrections/compose-error-corrections"
import { composeFinders } from "../compose-finders/compose-finders"
import { composeQuietZone } from "../compose-quiet-zone/compose-quiet-zone"
import { composeSeparators } from "../compose-separators/compose-separators"
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

// 0 === white
// 1 === black
export type Matrix = number[][]
export function getMatrix(text: string): Matrix {
  const BYTE = 8
  const bitStream = padBitStream(
    MODE.BYTE + numberToBinary(text.length) + getBitStream(text),
    BYTE,
  )
  const errorCorrection = LEVEL.L
  const version = VERSION.ONE
  const matrix = pipe(
    createMatrix(version),
    (matrix) => composeFinders(matrix),
    (matrix) => composeSeparators(matrix),
    (matrix) => composeAlignments(matrix, version),
    // (matrix) => composeTimings(matrix, version),
    // (matrix) => composeVersions(matrix, version),
    (matrix) => composeErrorCorrections(matrix, errorCorrection),
    // (matrix) => composeMasks(matrix),
    // (matrix) => composeFormatFillers(matrix),
    // (matrix) => composeBitStream(matrix),
    // (matrix) => runMaskPattern(matrix, maskPattern)
    (matrix) => composeQuietZone(matrix),
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
