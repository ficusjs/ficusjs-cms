import { createCustomElement, html } from '../util/component.mjs'
import { router } from '../router.mjs'

createCustomElement('fcms-auth-page', {
  handleClick (e) {
    router.push('/collections/posts/editor/test-post')
  },
  render () {
    return html`
      <div>
        <button type="button" onclick="${this.handleClick}">Click to auth</button>
      </div>
    `
  }
})
