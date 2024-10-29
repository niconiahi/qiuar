## Philosophy

All the libraries I've found over the Javascript ecosystem is not implemented with Typescript, so, no types. That's too bad given that it's a delight working with types. Also all codebases I've seen are kind of a mess and difficult to follow. I've tried here to create clear modules that represent all the different stages the QR standard goes through

## Characteristics

- It's written in Typescript
- It's environment agnostic: runs on the browser and the server: anywhere where native Javascript can run

## Files to pay attention

- [get-matrix](packages/qr/get-matrix/get-matrix.ts)
- [compose-alignments](packages/qr/compose-alignments/compose-alignments.ts)
- [compose-errors-correction-levels](packages/qr/compose-errors-correction-levels/compose-errors-correction-levels.ts)
- [compose-finders](packages/qr/compose-finders/compose-finders.ts)
- [compose-format-error-corrections](packages/qr/compose-format-error-corrections/compose-format-error-corrections.ts)
- [compose-masks](packages/qr/compose-masks/compose-masks.ts)
- [compose-quiet-zone](packages/qr/compose-quiet-zone/compose-quiet-zone.ts)
- [compose-separators](packages/qr/compose-separators/compose-separators.ts)
- [compose-timings](packages/qr/compose-timings/compose-timings.ts)
- [get-bit-stream](packages/qr/get-bit-stream/get-bit-stream.ts)
- [number-to-binary](packages/qr/number-to-binary/number-to-binary.ts)
- [pad-bit-stream](packages/qr/pad-bit-stream/pad-bit-stream.ts)

## Links
- [QR Wikipedia](https://es.wikipedia.org/wiki/C%C3%B3digo_QR)
- [QR explanation by ChatGPT](https://chatgpt.com/share/6720fca8-5234-8006-bb21-46b55985e0e4)
