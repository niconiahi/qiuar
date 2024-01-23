import { describe, expect, it } from "vitest"

import { getBitStream } from "./index.ts"

describe("getBitStream", () => {
  it("should convert a string to a bit stream", () => {
    const input = "Hello World"
    const output = "0100100001100101011011000110110001101111001000000101011101101111011100100110110001100100"
    const result = getBitStream(input)
    expect(result).toEqual(output)
  })
})
