class ShadowDom extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "open" })
    const slot = document.createElement("slot")
    shadow.appendChild(slot)
  }
}

export function registerShadowDom(): void {
  window.customElements.define("shadow-dom", ShadowDom)
}
