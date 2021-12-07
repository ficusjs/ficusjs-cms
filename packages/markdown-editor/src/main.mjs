import { initialise, getValue, setValue } from './initialise.mjs'

export function createEditor (container, options) {
  initialise(container, options)
}

export function getEditorValue (container) {
  return getValue(container)
}

export function setEditorValue (container, value) {
  setValue(container, value)
}
