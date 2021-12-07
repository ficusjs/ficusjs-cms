import { createCustomElement, html } from '../util/component.mjs'

createCustomElement('fcms-appbar', {
  render () {
    return html`
      <header>
        <button>Content</button>
        <button>Workflow</button>
        <button>Media</button>
      </header>
    `
  }
})
