import { describe, expect, it } from "vitest"

import { createMatrix } from "./create-matrix"

describe.skip("createMatrix", () => {
  it("it should create a matrix for hello world", () => {
    const input = "Hello World"
    const result = createMatrix(input)
    // TODO: change the output to correct one
    const output = "0100100001100101011011000110110001101111001000000101011101101111011100100110110001100100"
    expect(result).toEqual(output)
  })
})
