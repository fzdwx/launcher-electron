import { BrowserWindow, globalShortcut } from "electron";

const initShortCut = (mainWin: BrowserWindow) => {
  globalShortcut.register('Alt+Space', () => {
    if (mainWin.isVisible()) {
      mainWin.hide()
      mainWin.blur()
    } else {
      mainWin.show()
      mainWin.focus()
    }
  })
}

export { initShortCut }
