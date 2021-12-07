/* eslint-disable no-new */
import { TextareaEditor } from './editor.mjs'
import { marked } from 'marked'
import { emit } from './emit.mjs'
import { templateContent } from './template-content.mjs'
import { elementFromString } from './element-from-string.mjs'
import { template } from './template.mjs'

export function initialise (container, options = {}) {
  container.classList.add('fcms-md-editor')

  const editorWrapper = options.templateId ? templateContent(document.getElementById(options.templateId)).firstChild : elementFromString(template)
  container.textContent = ''
  container.appendChild(editorWrapper)

  const textarea = editorWrapper.querySelector('textarea')
  const toolbar = editorWrapper.querySelector('.fcms-md-editor__toolbar')
  const wrapper = container.querySelector('.fcms-md-editor__wrapper')
  const preview = container.querySelector('.fcms-md-editor__preview')

  options.preview ? wrapper.classList.add('fcms-md-editor__wrapper--preview') : preview.classList.add('fcms-md-editor__preview--hide')

  if (options.value) {
    textarea.value = options.value
    setPreview(container, options.value)
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
      if (options.preview) {
        setPreview(container, textarea.value)
      }
    })
  })

  return editor
}

function setPreview (container, text) {
  const markdown = marked(text)
  const preview = container.querySelector('.fcms-md-editor__preview')
  preview.innerHTML = markdown
}

export function getValue (container) {
  const textarea = container.querySelector('textarea')
  if (textarea) return textarea.value
}

export function setValue (container, value) {
  const textarea = container.querySelector('textarea')
  if (textarea) {
    textarea.value = value
    setPreview(container, value)
  }
}
