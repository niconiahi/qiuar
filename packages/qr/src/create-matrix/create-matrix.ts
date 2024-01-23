import { getBitStream } from "../get-bit-stream/get-bit-stream"
import { CHARACTER_COUNT_INDICATOR_LENGTH, numberToBinary } from "../number-to-binary/number-to-binary"
import { padBitStream } from "../pad-bit-stream/pad-bit-stream"
import {
  applyMask,
  chooseBestMaskPattern,
  createEmptyQRMatrix,
  placeAlignmentPatterns,
  placeDataBits,
  placeFinderPatterns,
  placeTimingPatterns,
} from "../utils"

export const MODE = {
  BYTE: "0100",
} as const
type ObjectValues<T> = T[keyof T]
export type Mode = ObjectValues<typeof MODE>

export type Matrix = boolean[][]
export function createMatrix(text: string): Matrix {
  const bitStream = padBitStream(
    MODE.BYTE + numberToBinary(text.length) + getBitStream(text),
    CHARACTER_COUNT_INDICATOR_LENGTH,
  )

  // Initialize an empty QR code matrix and place the standard patterns.
  const qrMatrix = createEmptyQRMatrix()
  placeFinderPatterns(qrMatrix)
  placeAlignmentPatterns(qrMatrix)
  placeTimingPatterns(qrMatrix)

  // Place the encoded data bits into the QR code matrix.
  placeDataBits(qrMatrix, bitStream)

  // Choose the best mask pattern and apply it to the matrix.
  const maskPattern = chooseBestMaskPattern(qrMatrix)
  applyMask(qrMatrix, maskPattern)

  // Return the final QR code matrix.
  return qrMatrix
}
