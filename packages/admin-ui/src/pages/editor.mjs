import { createCustomElement, html } from '../util/component.mjs'
import { getAppState, withStore } from '../util/state.mjs'
import { storeNames } from '../stores/store-names.mjs'

import '../components/editor.mjs'
import '../components/preview.mjs'

createCustomElement(
  'fcms-editor-page',
  withStore({
    config: getAppState(storeNames.CONFIG),
    collections: getAppState(storeNames.COLLECTIONS)
  }, {
    props: {
      name: {
        type: String
      },
      slug: {
        type: String
      }
    },
    computed: {
      configCollection () {
        return this.store.config.state.config.collections.find(x => x.name === this.props.name)
      },
      collection () {
        return this.store.collections.state.collections ? this.store.collections.state.collections[this.props.name] : undefined
      },
      content () {
        const coll = this.collection
        if (coll) {
          return coll[this.props.slug]
        }
      }
    },
    mounted () {
      if (!this.content) {
        const baseUrl = `${this.store.config.getState('config.apiBaseUrl')}${this.configCollection.path}`
        this.store.collections.loadContentIfNotLoaded(baseUrl, this.props.name, this.props.slug)
      }
    },
    render () {
      if (!this.content) {
        return html`<div class="fcms-editor-page"><div class="fcms-editor-page-loading">Loading...</div></div>`
      }
      return html`
        <div class="fcms-editor-page">
          <fcms-editor></fcms-editor>
          <fcms-preview></fcms-preview>
        </div>
      `
    }
  })
)
