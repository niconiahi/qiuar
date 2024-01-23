import { describe, expect, it } from "vitest"

import { numberToBinary } from "./number-to-binary"

describe("numberToBinary", () => {
  it("it should create the binary for a number", () => {
    const input = 9
    const result = numberToBinary(input)
    const output = "00001001"
    expect(result).toEqual(output)
  })
})
