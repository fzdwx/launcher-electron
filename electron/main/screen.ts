import { BrowserWindow, screen } from 'electron'

const getScreenSize = () => {
  const p = screen.getCursorScreenPoint()
  const d = screen.getDisplayNearestPoint(p)

  return {
    width: d.bounds.width,
    height: d.bounds.height
  }
}

/**
 * Returns the center coordinates of the screen.
 *
 * @return {Object} An object with x and y properties representing the center coordinates.
 */
const getCenter = (width: number, height: number) => {
  const p = getScreenSize()

  return {
    x: (p.width - width) / 2,
    y: (p.height - height) / 2 + 30
  }
}


const toCenter = (win: BrowserWindow, w: number, h: number) => {
  const { x, y } = getCenter(w, h)
  win.setPosition(x, y)
}


export { getCenter, toCenter }
