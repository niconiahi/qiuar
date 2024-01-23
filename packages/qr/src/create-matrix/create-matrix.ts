import { getBitStream } from "../get-bit-stream"
import { applyMask, chooseBestMaskPattern, createEmptyQRMatrix, getCharacterCountIndicator, padBitStream, placeAlignmentPatterns, placeDataBits, placeFinderPatterns, placeTimingPatterns } from "../utils"

const MODE = {
  BYTE: "0100",
} as const
type ObjectValues<T> = T[keyof T]
export type Mode = ObjectValues<typeof MODE>

export type Matrix = boolean[][]
export function createMatrix(text: string): Matrix {
  const bitStream = getBitStream(text)
  const paddedBitStream = padBitStream(MODE.BYTE + getCharacterCountIndicator(text.length) + bitStream)

  // Initialize an empty QR code matrix and place the standard patterns.
  const qrMatrix = createEmptyQRMatrix()
  placeFinderPatterns(qrMatrix)
  placeAlignmentPatterns(qrMatrix)
  placeTimingPatterns(qrMatrix)

  // Place the encoded data bits into the QR code matrix.
  placeDataBits(qrMatrix, paddedBitStream)

  // Choose the best mask pattern and apply it to the matrix.
  const maskPattern = chooseBestMaskPattern(qrMatrix)
  applyMask(qrMatrix, maskPattern)

  // Return the final QR code matrix.
  return qrMatrix
}
