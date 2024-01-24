import { describe, expect, it } from "vitest"

import { getBitStream } from "../get-bit-stream/get-bit-stream"
import { MODE } from "../get-matrix/get-matrix"
import { CHARACTER_COUNT_INDICATOR_LENGTH, numberToBinary } from "../number-to-binary/number-to-binary"

import { padBitStream } from "./pad-bit-stream"

describe("padBitStream", () => {
  it("should correctly add zeros to bit stream until its multiple of given length", () => {
    const text = "Hello World"
    const bitStream = getBitStream(text)
    const result = padBitStream(
      MODE.BYTE + numberToBinary(text.length) + bitStream,
      CHARACTER_COUNT_INDICATOR_LENGTH,
    )
    const output = "01000000101101001000011001010110110001101100011011110010000001010111011011110111001001101100011001000000"
    expect(result).toEqual(output)
  })
})
