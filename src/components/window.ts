import { renderTemplate } from '../helpers/render'
import { removeWindow, resizeWindow, setDisplayWindow } from '../helpers/window'
import { MousePosition, Template, WindowData } from '../types'
import '../styles/window.css'
import { setIsWindowFocused, setWindows } from '../store/actions'
import state from '../store/state'
import { getElementByUUID, getIsWindowHidden, getIsWindowMaximized } from '../store/getters'
import { generateUUID } from '../utils'

// const moveWindow = (
//   windowUUID: string,
//   isMouseDown: boolean,
//   mousePositionOnClick: MousePosition,
//   e: Event,
// ): void => {
//   if (isMouseDown && mousePositionOnClick.top !== 0 && mousePositionOnClick.left !== 0) {
//     const htmlWindow = getElementByUUID(windowUUID)

//     let { offsetTop, offsetLeft } = htmlWindow

//     console.log(e.pageX, mousePositionOnClick.left)

//     offsetLeft += (e.pageX - mousePositionOnClick.left) * 20
//     offsetTop += (e.pageY - mousePositionOnClick.top) * 20

//     htmlWindow.style.top = offsetTop <= 0 ? '0px' : `${offsetTop}px`
//     htmlWindow.style.left = offsetLeft <= 0 ? '0px' : `${offsetLeft}px`
//   }
// }

/**
 * Render window
 */
const Window = (label: string, iconPath: string): HTMLElement => {
  // let isMouseDown = false

  // const previousMousePosition: MousePosition = {
  //   top: 0,
  //   left: 0,
  // }

  // const onMouseMove = (e: Event): void => {
  //   moveWindow(uuid, isMouseDown, previousMousePosition, e)
  //   previousMousePosition.left = (e as MouseEvent).pageX
  //   previousMousePosition.top = (e as MouseEvent).pageY
  // }

  const uuid = generateUUID()
  const template: Template[] = [
    {
      tagName: 'div',
      class: 'window-container',
      'data-uuid': uuid,
      children: [
        {
          tagName: 'div',
          class: 'window-header',
          // mousemove: onMouseMove,
          // mousedown: (e: Event) => {
          //   isMouseDown = true
          //   mousePositionOnClick.left = (e as MouseEvent).pageX
          //   mousePositionOnClick.top = (e as MouseEvent).pageY
          // },
          // mouseup: () => {
          //   isMouseDown = false
          // },
          // mouseout: () => {
          //   isMouseDown = false
          // },
          children: [
            {
              tagName: 'div',
              class: 'window-header-title-container',
              children: [
                { tagName: 'img', class: 'window-header-icon', src: iconPath },
                { tagName: 'h2', class: 'window-header-title', text: label },
              ],
            },
            {
              tagName: 'div',
              class: 'window-header-buttons-container',
              children: [
                {
                  tagName: 'button',
                  class: 'window-button-hide',
                  click: () => setDisplayWindow(uuid),
                  children: [
                    {
                      tagName: 'img',
                      class: 'window-icon-hide',
                      src: '/icon_hide.png',
                      alt: 'icon-hide',
                    },
                  ],
                },
                {
                  tagName: 'button',
                  class: 'window-button-resize',
                  click: () => resizeWindow(uuid),
                  children: [
                    {
                      tagName: 'img',
                      class: 'window-icon-maximize',
                      src: '/icon_maximize.png',
                      alt: 'icon-maximize',
                    },
                    {
                      tagName: 'img',
                      class: 'window-icon-minimize',
                      src: '/icon_minimize.png',
                      alt: 'icon-minimize',
                    },
                  ],
                },
                {
                  tagName: 'button',
                  class: 'window-button-close',
                  click: () => removeWindow(windows, uuid),
                  children: [
                    {
                      tagName: 'img',
                      class: 'window-icon-close',
                      src: '/icon_close.png',
                      alt: 'icon-close',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ]
  const htmlElement = renderTemplate(template) as HTMLElement
  const isMaximized = getIsWindowMaximized(uuid)
  const isHidden = getIsWindowHidden(uuid)

  let windows: WindowData[] = state.windows
  const windowData: WindowData = {
    uuid,
    iconPath,
    isMaximized,
    isHidden,
    isFocused: true,
  }

  document.addEventListener('onStateChange', () => {
    windows = state.windows
  })

  setWindows([...windows, windowData])
  setIsWindowFocused(uuid, true)

  return htmlElement
}

export default Window
