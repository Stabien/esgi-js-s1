import { Attribute } from '../types'

/**
 * Creates HTML element allowing to pass an object
 * with unlimited properties to add attributes
 */
export const createElement = (
  tagName: string,
  attributes: Attribute | null = null,
): HTMLElement => {
  const element: HTMLElement = document.createElement(tagName)

  if (attributes !== null) {
    const attributeKeys = Object.keys(attributes)

    for (const attributeKey of attributeKeys) {
      element.setAttribute(attributeKey, attributes[attributeKey])
    }
  }

  return element
}
