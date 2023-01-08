import { Attribute, ListenerFunction, Template } from '../types'

/**
 * Creates HTML element allowing to pass attributes
 * and children
 */
export const createElement = (
  tagName: string,
  attributes: Attribute | null = null,
  children: HTMLElement | string | null = null,
): HTMLElement => {
  const element: HTMLElement = document.createElement(tagName)

  if (attributes !== null) {
    const attributeKeys = Object.keys(attributes)

    for (const attributeKey of attributeKeys) {
      element.setAttribute(attributeKey, attributes[attributeKey])
    }
  }

  if (children !== null) {
    if (typeof children === typeof HTMLElement) {
      element.appendChild(children as HTMLElement)
    }
    if (typeof children === 'string') {
      element.innerHTML = children
    }
  }

  return element
}

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
