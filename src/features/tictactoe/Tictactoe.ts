import Window from '../../components/Window'
import { renderTemplate } from '../../helpers/render'
import { Template, TictactoeData, TictactoeGameOverState, TictactoeSymbols } from '../../types'
import '../../styles/tictactoe.css'

const resetGrid = (data: TictactoeData, htmlContainer: HTMLElement): void => {
  const htmlGridBoxes = htmlContainer.getElementsByClassName('tictactoe-grid-box') as HTMLCollection
  const htmlHeader = htmlContainer.getElementsByClassName('tictactoe-header')[0]
  const htmlPlayerBeginning = htmlHeader.getElementsByTagName('span')[1]

  for (let i = 0; i < htmlGridBoxes.length; i++) {
    htmlGridBoxes[i].innerHTML = ''
  }

  if (data.isGameOver) {
    htmlPlayerBeginning.innerHTML = `Joueur ${data.isPlayerOneBeginning ? '1' : '2'} commence`
  }

  data.isPlayerOneTurn = data.isPlayerOneBeginning
  data.board = data.board.fill('')
  data.isGameOver = false
  data.hasGameStarded = true
}

const handleGameOver = (
  data: TictactoeData,
  gameOverState: TictactoeGameOverState,
  htmlContainer: HTMLElement,
): void => {
  const htmlHeader = htmlContainer.getElementsByClassName('tictactoe-header')[0]
  const htmlScore = htmlHeader.getElementsByTagName('span')[0]

  data.isPlayerOneBeginning = !data.isPlayerOneBeginning
  data.isGameOver = true

  if (gameOverState === 'x') {
    data.currentScore[0] += 1
  } else if (gameOverState === 'o') {
    data.currentScore[1] += 1
  }

  htmlScore.innerHTML = `J1: ${data.currentScore[0]} - J2: ${data.currentScore[1]}`
}

const checkIfGameIsOver = (board: string[]): TictactoeGameOverState => {
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
  const htmlContainer = htmlBox.closest('.tictactoe-container') as HTMLElement
  const index = parseInt(htmlBox.getAttribute('data-index') as string)

  if (!data.isGameOver) {
    if (!htmlBox.hasChildNodes()) {
      const shape = data.isPlayerOneTurn ? 'cross' : 'circle'
      const symbol = data.isPlayerOneTurn ? 'x' : 'o'
      const imgTemplate: Template = {
        tagName: 'img',
        src: `/tictactoe_${shape}_icon.png`,
        alt: `${shape}`,
        class: `${shape}`,
      }

      const htmlImg = renderTemplate(imgTemplate)

      data.isPlayerOneTurn = !data.isPlayerOneTurn
      data.board[index] = symbol

      htmlBox.append(htmlImg)
    }

    const gameOverState = checkIfGameIsOver(data.board)

    if (gameOverState !== false) {
      handleGameOver(data, gameOverState, htmlContainer)
    }
  }
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
    isPlayerOneBeginning: true,
    currentScore: [0, 0],
  }

  const htmlWindow = Window('Tic Tac Toe', '/icon_tictactoe.png', { width: 600, height: 600 })
  const gridTemplate = renderGridTemplate(data)

  const template: Template = {
    tagName: 'div',
    class: 'tictactoe-container',
    children: [
      {
        tagName: 'div',
        class: 'tictactoe-header',
        children: [
          {
            tagName: 'h2',
            text: 'Score',
          },
          {
            tagName: 'span',
            text: 'J1 : 0 - J2 : 0',
          },
          {
            tagName: 'span',
            text: 'Joueur 1 commence',
          },
        ],
      },
      {
        tagName: 'div',
        class: 'tictactoe-grid',
        children: gridTemplate,
      },
      {
        tagName: 'button',
        class: 'tictactoe-start-button',
        text: 'Recommencer une partie',
        click: () => resetGrid(data, htmlElement),
      },
    ],
  }

  const htmlElement = renderTemplate(template) as HTMLElement
  const parent = htmlWindow.getElementsByClassName('window-content')[0]

  parent.appendChild(htmlElement)

  return htmlWindow
}

export default Tictactoe
