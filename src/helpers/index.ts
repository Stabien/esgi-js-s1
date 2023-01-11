import { ListenerFunction, Template } from '../types'

const hasChildren = (templateElement: Template): boolean => {
  return Object.prototype.hasOwnProperty.call(templateElement, 'children')
}

const hasText = (templateElement: Template): boolean => {
  return Object.prototype.hasOwnProperty.call(templateElement, 'text')
}

/**
 * Add properties to an HTML element provided by its template
 */
const addProperties = (htmlElement: HTMLElement, properties: Template): void => {
  for (const key in properties) {
    if (typeof properties[key] === 'function') {
      htmlElement.addEventListener(
        key as keyof HTMLElementEventMap,
        properties[key] as ListenerFunction,
      )
    } else if (key !== 'tagName' && key !== 'children' && key !== 'text') {
      htmlElement.setAttribute(key, properties[key] as string)
    }
  }
}

/**
 * Render HTML from from js array using recursion.
 * If top level array has more than one element returns DocumentFragment.
 * Otherwise, returns HTMLElement.
 */
const callRender = (
  template: Template[],
  parent: HTMLElement | null = null,
  index = 0,
): HTMLElement | DocumentFragment => {
  const templateLength = template.length
  const templateElement: Template = template[index]
  let fragment: DocumentFragment | null = null

  const htmlElement: HTMLElement = document.createElement(templateElement.tagName as string)

  addProperties(htmlElement, templateElement)

  if (parent !== null) {
    parent.appendChild(htmlElement)
  }

  // Initialize fragment if top level array has more than one element
  if (parent === null && templateLength > 1) {
    if (fragment === null) {
      fragment = new DocumentFragment()
    }
    fragment.appendChild(htmlElement)
  }

  if (hasText(templateElement)) {
    const text = document.createTextNode(templateElement.text as string)
    htmlElement.appendChild(text)
  }

  // Conditions
  if (hasChildren(templateElement)) {
    callRender(templateElement.children as Template[], htmlElement)
  }

  if (index + 1 < templateLength) {
    callRender(template, parent, index + 1)
  }

  if (fragment !== null) {
    return fragment
  } else {
    return htmlElement
  }
}

/**
 * This function is mean to protect the callRender function by
 * forcing the user to pass only one argument and not allowing
 * parent or index to be passed into the function
 */
export const renderTemplate = (template: Template[]): HTMLElement | DocumentFragment => {
  return callRender(template)
}
