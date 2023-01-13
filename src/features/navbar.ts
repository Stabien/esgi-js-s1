import { Reactive, Template } from '../types'
import '../styles/navbar.css'
import { renderTemplate } from '../helpers'
import state from '../store/state'

const renderWindowsIcon = (windows: Reactive[], parent: HTMLElement): void => {
  console.log(windows)
}

const Navbar = (): HTMLElement => {
  const template: Template[] = [
    {
      tagName: 'nav',
      class: 'navbar-container',
    },
  ]

  const htmlElement = renderTemplate(template) as HTMLElement

  let windows: [] = state.windows

  document.addEventListener('onStateChange', () => {
    windows = state.windows
    renderWindowsIcon(windows, htmlElement)
  })

  return htmlElement
}

export default Navbar
