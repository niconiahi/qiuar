import type { Matrix } from "@qiuar/qr"
import { QUIET_ZONE_WIDTH, getMatrix } from "@qiuar/qr"

const BITE_WIDTH = 10

function renderQr(): void {
  const canvas = document.getElementById("myCanvas")
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
    for (let j = 0; j < matrix[i].length; j++) {
      const SEPARATION = QUIET_ZONE_WIDTH / 2
      context.fillStyle = matrix[i + SEPARATION][j + SEPARATION] === 0 ? "white" : "black"
      context.fillRect(
        j * BITE_WIDTH,
        i * BITE_WIDTH,
        BITE_WIDTH,
        BITE_WIDTH,
      )
    }
  }
}

renderQr()
