import { ListenerFunction, Template } from '../types'

const hasChildren = (templateElement: Template): boolean => {
  return Object.prototype.hasOwnProperty.call(templateElement, 'children')
}

const hasText = (templateElement: Template): boolean => {
  return Object.prototype.hasOwnProperty.call(templateElement, 'text')
}

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

export const renderTemplate = (
  template: Template[],
  parent: HTMLElement | null = null,
  index = 0,
): HTMLElement => {
  const templateLength = template.length
  const templateElement: Template = template[index]

  if (templateLength > 1 && parent === null) {
    throw new Error('Missing parent')
  }

  // Actions
  const htmlElement: HTMLElement = document.createElement(templateElement.tagName as string)

  addProperties(htmlElement, templateElement)

  if (parent !== null) parent.appendChild(htmlElement)

  if (hasText(templateElement)) {
    const text = document.createTextNode(templateElement.text as string)
    htmlElement.appendChild(text)
  }

  // Conditions
  if (hasChildren(templateElement))
    renderTemplate(templateElement.children as Template[], htmlElement)

  if (index + 1 < templateLength) {
    renderTemplate(template, parent, index + 1)
  }

  return htmlElement
}
