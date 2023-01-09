import { Template } from '../types'
import '../styles/navbar.css'
import { renderTemplate } from '../helpers/createElement'

export const navbar = (body: HTMLElement): void => {
  const template: Template[] = [
    {
      tagName: 'div',
      class: 'navbar-container',
    },
  ]

  renderTemplate(template, body)
}
