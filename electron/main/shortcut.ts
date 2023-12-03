import { BrowserWindow, globalShortcut } from "electron";
import { api } from "../preload/api";
import { toCenter } from "./screen";

const initShortCut = (win: BrowserWindow) => {
  const a = new api(win)
  globalShortcut.register('Alt+Space', () => {
    if (win.isVisible()) {
      a.hide()
    } else {
      a.show()
    }
  })
}

export { initShortCut }
