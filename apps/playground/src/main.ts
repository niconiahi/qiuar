import "./global.css";
import type { Matrix } from "@qiuar/qr"
import { QUIET_ZONE_WIDTH, getMatrix } from "@qiuar/qr"

import { registerShadowDom } from "./components/shadow-dom"

function setupCanvas() {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <shadow-dom>
    <main
      style="
        background: black;
        display: flex;
        flex-direction: column;
        height: 100%;
        align-items: center;
        justify-content: center;
      "
    >
      <canvas width="250" height="250"></canvas>
    </main>
  </shadow-dom>
`
}

const BITE_WIDTH = 10

function renderQr(): void {
  const canvas = document.querySelector("canvas")
  if (!canvas) {
    return
  }
  const context = (canvas as HTMLCanvasElement).getContext("2d")
  if (!context) {
    return
  }
  const input = "Hello World"
  const matrix = getMatrix(input)
  drawMatrix(matrix, context)
}

function drawMatrix(matrix: Matrix, context: CanvasRenderingContext2D): void {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      const SEPARATION = QUIET_ZONE_WIDTH / 2
      context.fillStyle = matrix[i][j] === 0 ? "white" : "black"
      context.fillRect(
        j * BITE_WIDTH - SEPARATION * BITE_WIDTH,
        i * BITE_WIDTH - SEPARATION * BITE_WIDTH,
        BITE_WIDTH,
        BITE_WIDTH,
      )
    }
  }
}

export function downloadQr(canvas: HTMLCanvasElement): void {
  const dataURL = canvas.toDataURL("image/png")
  const a = document.createElement("a")
  a.href = dataURL
  a.download = "qr.png"
  a.click()
}

setupCanvas()
registerShadowDom()
renderQr()
