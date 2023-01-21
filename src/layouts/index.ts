import Navbar from '../features/navbar/Navbar'
import Icon from '../components/Icon'
import { renderTemplate } from '../helpers/render'
import { Template } from '../types'
import Tictactoe from '../features/tictactoe/Tictactoe'

const Layout = (): HTMLElement => {
  const template: Template[] = [
    {
      tagName: 'main',
      children: [
        {
          tagName: 'div',
          class: 'main-content',
          children: [
            {
              tagName: 'div',
              class: 'icon-list',
            },
          ],
        },
        {
          tagName: 'img',
          class: 'background',
          src: '/background.jpg',
          alt: 'background',
        },
      ],
    },
  ]

  const htmlElement = renderTemplate(template) as HTMLElement
  const iconList = htmlElement.getElementsByClassName('icon-list')[0]
  const mainContent = htmlElement.getElementsByClassName('main-content')[0]

  const navbar = Navbar()

  for (let i = 0; i < 10; i++) {
    iconList.appendChild(
      Icon('Calculatrice', '/icon_calculator.png', () => {
        mainContent.appendChild(Tictactoe())
      }),
    )
  }

  htmlElement.append(navbar)

  return htmlElement
}

export default Layout
