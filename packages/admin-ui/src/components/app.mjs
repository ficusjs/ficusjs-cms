import { createCustomElement, html, withStyles } from '../util/component.mjs'
import { getAppState, withStore } from '../util/state.mjs'
import { storeNames } from '../stores/store-names.mjs'

import './appbar.mjs'
import './nav.mjs'

createCustomElement(
  'fcms-app',
  withStyles(
    withStore(getAppState(storeNames.CONFIG), {
      styles () {
        return `
          body {
            margin: 0;
            font-family: sans-serif;
          }
        `
      },
      mounted () {
        this.store.loadConfigIfNotLoaded()
      },
      render () {
        if (!this.store.state.config) {
          return html`<div>Loading...</div>`
        }
        return html`
          <div class="fcms-app">
            <fcms-appbar></fcms-appbar>
            <fcms-nav></fcms-nav>
            <div id="fcms-router-outlet"></div>
          </div>
        `
      }
    })
  )
)
