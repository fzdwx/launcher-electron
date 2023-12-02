import { BrowserWindow, globalShortcut } from "electron";
import { toCenter } from "./screen";

const initShortCut = (win: BrowserWindow, w: number, h: number) => {
  globalShortcut.register('Alt+Space', () => {
    if (win.isVisible()) {
      win.hide()
      win.blur()
    } else {
      win.show()
      win.focus()
      toCenter(win, w, h)
    }
  })
}

export { initShortCut }
