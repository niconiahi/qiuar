import { numberToBinary } from "../number-to-binary/number-to-binary"

export function getBitStream(text: string): string {
  let bitStream = ""
  for (let i = 0; i < text.length; i++) {
    const binary = numberToBinary(text.charCodeAt(i))
    bitStream += binary
  }
  return bitStream
}
