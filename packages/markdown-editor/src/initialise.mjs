/* eslint-disable no-new */
import { TextareaEditor } from './editor.mjs'
import { marked } from '../node_modules/marked/src/marked.js'
import { emit } from './emit.mjs'
import { templateContent } from './template-content.mjs'

export function initialise (container, options, editorOptions) {
  container.classList.add('mc-markdown-editor')

  const element = templateContent(document.getElementById('mosaic-markdown-editor-template')).firstChild
  container.textContent = ''
  container.appendChild(element)

  const textarea = element.querySelector('textarea')
  const toolbar = element.querySelector('.mc-markdown-editor__toolbar')
  const wrapper = container.querySelector('.mc-markdown-editor__wrapper')
  const preview = container.querySelector('.mc-markdown-editor__preview')

  container.hasAttribute('preview') ? wrapper.classList.add('mc-markdown-editor__wrapper--preview') : preview.classList.add('mc-markdown-editor__preview--hide')

  if (editorOptions && editorOptions.value) {
    textarea.value = editorOptions.value
    setPreview(container, editorOptions.value)
  }

  const editor = new TextareaEditor(textarea)

  toolbar.addEventListener('mousedown', e => {
    e.preventDefault()
    e.stopPropagation()
  })

  toolbar.addEventListener('click', e => {
    e.preventDefault()
    e.stopPropagation()

    const command = e.target.getAttribute('data-command')
    if (!command) return

    let url

    if (/image|link/.test(command) && !editor.hasFormat(command)) {
      url = window.prompt('URL:')
    }

    editor.toggle(command, url)
  })

  textarea.addEventListener('keydown', (e) => {
    const key = e.which
    const cmd = e.metaKey || e.ctrlKey

    if (!cmd) return

    switch (key) {
      case 66:
        editor.toggle('bold')
        break
      case 73:
        editor.toggle('italic')
        break
      default: return
    }

    e.preventDefault()
  })

  const events = ['input', 'change']
  events.forEach(et => {
    textarea.addEventListener(et, e => {
      e.preventDefault()
      e.stopPropagation()
      emit(container, et, {
        detail: {
          instance: container,
          value: textarea.value
        }
      })
      if (container.hasAttribute('preview')) {
        setPreview(container, textarea.value)
      }
    })
  })

  return editor
}

function setPreview (inComponent, text) {
  const markdown = marked(text)
  const preview = inComponent.querySelector('.mc-markdown-editor__preview')
  preview.innerHTML = markdown
}

export function getValue (inComponent) {
  const textarea = inComponent.querySelector('textarea')
  if (textarea) return textarea.value
}

export function setValue (inComponent, value) {
  const textarea = inComponent.querySelector('textarea')
  if (textarea) {
    textarea.value = value
    setPreview(inComponent, value)
  }
}
