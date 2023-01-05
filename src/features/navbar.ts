import { createElement } from '../helpers/createElement'
import { Attribute } from '../types'

export const navbar = (body: HTMLElement): void => {
  const containerAttributes: Attribute = { class: 'navbar-container' }
  const container = createElement('div', containerAttributes)

  body.appendChild(container)
}
