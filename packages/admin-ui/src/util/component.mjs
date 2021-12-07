import { createCustomElement as customElementCreator } from '@ficusjs/core'
import { withStyles } from '@ficusjs/component-extensions/with-styles'
import { html, renderer } from '@ficusjs/renderers/htm'

function createCustomElement (tagName, options) {
  return customElementCreator(tagName, { renderer, ...options })
}

export { createCustomElement, html, withStyles }
