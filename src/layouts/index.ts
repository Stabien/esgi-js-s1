import Navbar from '../features/navbar/Navbar'
import Icon from '../components/Icon'
import { renderTemplate } from '../helpers/render'
import { Template } from '../types'
import Tictactoe from '../features/tictactoe/Tictactoe'
import Clock from '../features/Clock/Clock'

const Layout = (): HTMLElement => {
  const template: Template = {
    tagName: 'main',
    children: [
      {
        tagName: 'div',
        class: 'main-content',
        children: {
          tagName: 'div',
          class: 'icon-list',
        },
      },
      {
        tagName: 'img',
        class: 'background',
        src: '/background.jpg',
        alt: 'background',
      },
    ],
  }

  const htmlElement = renderTemplate(template) as HTMLElement
  const iconList = htmlElement.getElementsByClassName('icon-list')[0]
  const mainContent = htmlElement.getElementsByClassName('main-content')[0]

  const navbar = Navbar()

  iconList.appendChild(
    Icon('TicTacToe', '/icon_tictactoe.png', () => {
      mainContent.appendChild(Tictactoe())
    }),
  )

  iconList.appendChild(
    Icon('Horloge', '/icon_clock.png', () => {
      mainContent.appendChild(Clock())
    }),
  )

  htmlElement.append(navbar)

  return htmlElement
}

export default Layout
