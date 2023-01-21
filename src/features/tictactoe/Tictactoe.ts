import Window from '../../components/Window'
import { renderTemplate } from '../../helpers/render'
import { Template, TictactoeData, TicTacToeGameOverStatus, TictactoeSymbols } from '../../types'
import '../../styles/tictactoe.css'

const checkIfGameIsOver = (board: string[]): TicTacToeGameOverStatus => {
  for (let i = 0; i < 3; i++) {
    if (board[i] !== '') {
      if (board[i] === board[i + 3] && board[i + 3] === board[i + 6]) {
        return board[i] as TictactoeSymbols
      }
    }
  }

  for (let i = 0; i < 7; i += 3) {
    if (board[i] !== '') {
      if (board[i] === board[i + 1] && board[i + 1] === board[i + 2]) {
        return board[i] as TictactoeSymbols
      }
    }
  }

  if (board[4] !== '') {
    if (board[0] === board[4] && board[4] === board[8]) {
      return board[0] as TictactoeSymbols
    }

    if (board[2] === board[4] && board[4] === board[6]) {
      return board[2] as TictactoeSymbols
    }
  }

  if (!board.includes('')) {
    return '='
  }

  return false
}

const onBoxClick = (e: Event, data: TictactoeData): void => {
  const htmlBox = e.currentTarget as HTMLElement
  const index = parseInt(htmlBox.getAttribute('data-index') as string)

  console.log(!htmlBox.hasChildNodes(), !data.isGameOver)
  if (!htmlBox.hasChildNodes() && !data.isGameOver) {
    console.log('test')
    const shape = data.isPlayerOneTurn ? 'cross' : 'circle'
    const symbol = data.isPlayerOneTurn ? 'x' : 'o'

    const imgTemplate: Template[] = [
      {
        tagName: 'img',
        src: `/tictactoe_${shape}_icon.png`,
        alt: `${shape}`,
        class: `${shape}`,
      },
    ]

    const htmlImg = renderTemplate(imgTemplate)

    data.isPlayerOneTurn = !data.isPlayerOneTurn
    data.board[index] = symbol

    htmlBox.append(htmlImg)
  }

  const gameOverState = checkIfGameIsOver(data.board)

  data.isGameOver = gameOverState !== false
}

const renderGridTemplate = (data: TictactoeData): Template[] => {
  const template: Template[] = []

  for (let i = 0; i < 9; i++) {
    const gridBoxTemplate: Template = {
      tagName: 'div',
      class: 'tictactoe-grid-box',
      'data-index': i,
      click: (e) => onBoxClick(e, data),
    }
    template.push(gridBoxTemplate)
  }

  return template
}

const Tictactoe = (): HTMLElement => {
  const data: TictactoeData = {
    hasGameStarded: false,
    isPlayerOneTurn: true,
    board: ['', '', '', '', '', '', '', '', ''],
    isGameOver: false,
  }

  const htmlWindow = Window('Tictactoe', '/icon_calculator.png', { width: 600, height: 600 })
  const gridTemplate = renderGridTemplate(data)

  const template: Template[] = [
    {
      tagName: 'div',
      class: 'tictactoe-container',
      children: [
        {
          tagName: 'div',
          class: 'tictactoe-grid',
          children: gridTemplate,
        },
        {
          tagName: 'button',
          class: 'tictactoe-start-button',
          text: 'Lancer une partie',
        },
      ],
    },
  ]

  const htmlElement = renderTemplate(template)
  const parent = htmlWindow.getElementsByClassName('window-content')[0]

  parent.appendChild(htmlElement)

  return htmlWindow
}

export default Tictactoe
