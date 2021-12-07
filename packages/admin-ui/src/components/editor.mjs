// import Quill from 'quill'
// import QuillMarkdown from 'quilljs-markdown'
import { createCustomElement, html } from '../util/component.mjs'
import { getAppState, withStore } from '../util/state.mjs'
import { storeNames } from '../stores/store-names.mjs'

createCustomElement(
  'fcms-editor',
  withStore(getAppState(storeNames.COLLECTIONS), {
    mounted () {
      const editor = new window.Quill('#editor', { theme: 'snow' })
        // this.markdownEditor = new QuillMarkdown(editor)
    },
    render () {
      return html`
        <main id="editor">
          <p>Hello World!</p>
          <p>Some initial <strong>bold</strong> text</p>
          <p><br /></p>
        </main>
      `
    }
  })
)
