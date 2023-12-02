import { BrowserWindow, globalShortcut } from "electron";
import { toCenter } from "./screen";

const initShortCut = (win: BrowserWindow) => {
  globalShortcut.register('Alt+Space', () => {
    if (win.isVisible()) {
      win.hide()
      win.blur()
    } else {
      win.show()
      toCenter(win)
      win.focus()
    }
  })
}

export { initShortCut }
