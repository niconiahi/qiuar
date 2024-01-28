/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
import { composeAlignments } from "../compose-alignments/compose-alignments"
import { LEVEL, composeErrorCorrectionLevels } from "../compose-errors-correction-levels/compose-errors-correction-levels"
import { composeFinders } from "../compose-finders/compose-finders"
import { composeFormatErrorCorrection } from "../compose-format-error-corrections/compose-format-error-corrections"
import { PATTERN, composeMasks } from "../compose-masks/compose-masks"
import { composeQuietZone } from "../compose-quiet-zone/compose-quiet-zone"
import { composeSeparators } from "../compose-separators/compose-separators"
import { composeTimings } from "../compose-timings/compose-timings"
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
  const level = LEVEL.L
  const version = VERSION.ONE
  const pattern = PATTERN.EIGHT
  const matrix = pipe(
    createMatrix(version),
    (matrix) => composeFinders(matrix),
    (matrix) => composeSeparators(matrix),
    (matrix) => composeAlignments(matrix, version),
    (matrix) => composeTimings(matrix, version),
    (matrix) => composeErrorCorrectionLevels(matrix, level),
    (matrix) => composeMasks(matrix, pattern),
    (matrix) => composeFormatErrorCorrection(matrix),
    // TODO: version 7 and higher, requires a version information area
    // (matrix) => composeVersions(matrix, pattern),
    // (matrix) => composeBitStream(matrix),
    // (matrix) => runMaskPattern(matrix, maskPattern)
    (matrix) => composeQuietZone(matrix),
  )

  return matrix
}

export function pipe<T>(initialState: T, ...fns: ((_arg: T) => T)[]): T {
  return fns.reduce((result, fn) => fn(result), initialState)
}

export function createMatrix(version: Version): Matrix {
  return Array.from(
    { length: version },
    () => Array.from({ length: version }, () => 0),
  )
}
