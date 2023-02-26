import { Template, TimeData } from '../../types'
import '../../styles/navbar.css'
import { renderTemplate } from '../../helpers/render'
import { getTime } from '../../store/getters'
import Window from '../../components/Window'
import '../../styles/clock.css'

const startTimer = (
  timeData: TimeData,
  htmlElement: HTMLElement,
  intervalId: number | null,
): number => {
  if (intervalId !== null) {
    return intervalId
  }

  const htmlHours = htmlElement.getElementsByClassName('clock-timer-hours')[0]
  const htmlMinutes = htmlElement.getElementsByClassName('clock-timer-minutes')[0]
  const htmlSeconds = htmlElement.getElementsByClassName('clock-timer-seconds')[0]
  const htmlMilliseconds = htmlElement.getElementsByClassName('clock-timer-milliseconds')[0]

  console.log(htmlElement)

  return setInterval(() => {
    timeData.millisecond += 1

    if (timeData.millisecond > 99) {
      timeData.second += 1
      timeData.millisecond = 0
    }

    if (timeData.second > 59) {
      timeData.minute += 1
      timeData.second = 0
    }

    if (timeData.minute > 59) {
      timeData.hour += 1
      timeData.minute = 0
    }

    if (timeData.millisecond < 10) {
      htmlMilliseconds.innerHTML = ` 0${timeData.millisecond}`
    } else {
      htmlMilliseconds.innerHTML = ` ${timeData.millisecond}`
    }

    if (timeData.second < 10) {
      htmlSeconds.innerHTML = ` 0${timeData.second} :`
    } else {
      htmlSeconds.innerHTML = ` ${timeData.second} :`
    }

    if (timeData.minute < 10) {
      htmlMinutes.innerHTML = ` 0${timeData.minute} :`
    } else {
      htmlMinutes.innerHTML = ` ${timeData.minute} :`
    }

    if (timeData.hour < 10) {
      htmlHours.innerHTML = `0${timeData.hour} :`
    } else {
      htmlHours.innerHTML = `${timeData.minute} :`
    }
  }, 10)
}

const Clock = (): HTMLElement => {
  const template: Template = {
    tagName: 'div',
    class: 'clock-container',
    children: [
      {
        tagName: 'div',
        class: 'clock-time-container',
        children: {
          tagName: 'span',
          class: 'clock-time',
          text: getTime(),
        },
      },
      {
        tagName: 'div',
        class: 'clock-timer-container',
        children: [
          {
            tagName: 'div',
            class: 'clock-timer',
            children: [
              {
                tagName: 'span',
                class: 'clock-timer-hours',
                text: '00 : ',
              },
              {
                tagName: 'span',
                class: 'clock-timer-minutes',
                text: ' 00 : ',
              },
              {
                tagName: 'span',
                class: 'clock-timer-seconds',
                text: ' 00 : ',
              },
              {
                tagName: 'span',
                class: 'clock-timer-milliseconds',
                text: ' 00',
              },
            ],
          },
          {
            tagName: 'div',
            class: 'clock-timer-buttons',
            children: [
              {
                tagName: 'button',
                class: 'clock-timer-start',
                text: 'Commencer',
              },
              {
                tagName: 'button',
                class: 'clock-timer-stop',
                text: 'Stop',
              },
              {
                tagName: 'button',
                class: 'clock-timer-reset',
                text: 'Réinitialiser',
              },
            ],
          },
        ],
      },
    ],
  }

  const htmlWindow = Window('Horloge', '/icon_clock.png', { width: 600, height: 600 })
  const htmlElement = renderTemplate(template) as HTMLElement
  const htmlTime = htmlElement.getElementsByClassName('clock-time')[0] as HTMLElement
  const htmlTimer = htmlElement.getElementsByClassName('clock-timer')[0] as HTMLElement
  const parent = htmlWindow.getElementsByClassName('window-content')[0]
  const startButton = htmlElement.getElementsByClassName('clock-timer-start')[0] as HTMLElement
  const stopButton = htmlElement.getElementsByClassName('clock-timer-stop')[0] as HTMLElement
  const resetButton = htmlElement.getElementsByClassName('clock-timer-reset')[0] as HTMLElement

  const timeData = {
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  }

  let intervalId: number | null = null

  startButton.addEventListener('click', () => {
    intervalId = startTimer(timeData, htmlTimer, intervalId)
    stopButton.style.display = 'inline-block'
    startButton.style.display = 'none'
    startButton.innerHTML = 'Reprendre'
  })

  stopButton.addEventListener('click', () => {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
    stopButton.style.display = 'none'
    startButton.style.display = 'inline-block'
  })

  resetButton.addEventListener('click', () => {
    const htmlHours = htmlElement.getElementsByClassName('clock-timer-hours')[0]
    const htmlMinutes = htmlElement.getElementsByClassName('clock-timer-minutes')[0]
    const htmlSeconds = htmlElement.getElementsByClassName('clock-timer-seconds')[0]
    const htmlMilliseconds = htmlElement.getElementsByClassName('clock-timer-milliseconds')[0]

    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }

    stopButton.style.display = 'none'
    startButton.style.display = 'inline-block'
    startButton.innerHTML = 'Commencer'

    timeData.hour = 0
    timeData.minute = 0
    timeData.second = 0
    timeData.millisecond = 0

    htmlHours.innerHTML = '00 :'
    htmlMinutes.innerHTML = ' 00 :'
    htmlSeconds.innerHTML = ' 00 :'
    htmlMilliseconds.innerHTML = ' 00'
  })

  parent.appendChild(htmlElement)

  setInterval(() => {
    htmlTime.innerHTML = getTime()
  }, 1000)

  return htmlWindow
}

export default Clock
