import { toCenter } from "./screen"
import { initShortCut } from "./shortcut"
import { update } from "./update"

export default function initMainWin(mainWin: Electron.BrowserWindow, w: number, h: number) {
  update(mainWin)

  mainWin.setMenu(null)
  mainWin.setMaximumSize(w, h)
  mainWin.setMinimumSize(w, h)

  toCenter(mainWin, w, h)
  initShortCut(mainWin, w, h)
}
