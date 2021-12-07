import { createAppState } from '../util/state.mjs'
import { storeNames } from './store-names.mjs'
import { httpGet, jsonHeaders } from '../util/http.mjs'

createAppState(storeNames.CONFIG, {
  initialState: {
    config: null
  },
  async loadConfigIfNotLoaded () {
    if (!this.state.config && window.ficusCmsConfigUrl) {
      const config = await httpGet(window.ficusCmsConfigUrl, jsonHeaders)
      this.state.config = config
    }
  }
})
