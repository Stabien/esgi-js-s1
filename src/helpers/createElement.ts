import { Attribute } from '../types'

/**
 * Creates HTML element allowing to pass an object
 * with unlimited properties to add attributes
 */
export const createElement = (
  tagName: string,
  attributes: Attribute | undefined = undefined,
): HTMLElement => {
  const element: HTMLElement = document.createElement(tagName)

  if (typeof attributes !== undefined) {
    const attributeKeys = Object.keys(attributes as Attribute)

    for (const attributeKey of attributeKeys) {
      element.setAttribute(attributeKey, (attributes as Attribute)[attributeKey])
    }
  }

  return element
}
