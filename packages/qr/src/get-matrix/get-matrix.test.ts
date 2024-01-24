import { describe, expect, it } from "vitest"

import { getMatrix } from "./get-matrix"

describe.skip("getMatrix", () => {
  it("should get a matrix for hello world", () => {
    const input = "Hello World"
    const result = getMatrix(input)
    // TODO: change the output to correct one
    const output = "0100100001100101011011000110110001101111001000000101011101101111011100100110110001100100"
    expect(result).toEqual(output)
  })
})
