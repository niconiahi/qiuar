export function padBitStream(stream: string, length: number): string {
  const remainder = stream.length % length
  const paddingNeeded = remainder ? length - remainder : 0
  return stream.padEnd(stream.length + paddingNeeded, "0")
}
