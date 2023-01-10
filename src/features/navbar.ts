import { Template } from '../types'
import '../styles/navbar.css'
import { renderTemplate } from '../helpers'

const Navbar = (): HTMLElement => {
  const template: Template[] = [
    {
      tagName: 'nav',
      class: 'navbar-container',
    },
  ]

  const htmlElement = renderTemplate(template) as HTMLElement
  return htmlElement
}

export default Navbar
