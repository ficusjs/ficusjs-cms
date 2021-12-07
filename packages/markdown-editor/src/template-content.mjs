/**
 * Fetches template content
 * @example
 * const template = document.querySelector("template#my-template")
 * const content = templateContent(template)
 * someElm.appendChild(content)
 * @param template The template element
 * @returns {DocumentFragment|Node} The template content node
 */
export function templateContent (template) {
  if ('content' in document.createElement('template')) {
    return document.importNode(template.content, true)
  } else {
    const fragment = document.createDocumentFragment()
    const children = template.childNodes
    for (let i = 0; i < children.length; i++) {
      fragment.appendChild(children[i].cloneNode(true))
    }
    return fragment
  }
}
