import { createAppState } from '../util/state.mjs'
import { storeNames } from './store-names.mjs'
import { httpGet, jsonHeaders } from '../util/http.mjs'

createAppState(storeNames.COLLECTIONS, {
  initialState: {
    current: null,
    collections: null
  },
  async loadContentIfNotLoaded (baseUrl, name, slug) {
    let collections = this.state.collections
    if (!this.state.collections) {
      collections = {}
    }
    collections[name] = { [slug]: null }
    const content = await httpGet(`${baseUrl}/${slug}`, jsonHeaders)
    collections[name][slug] = content
    this.setState(state => ({
      ...state,
      collections,
      current: content
    }))
  }
})
