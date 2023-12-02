import { BrowserWindow, ipcMain } from "electron"
import * as cmd from 'node:child_process'
import util from 'node:util'

const exec = util.promisify(cmd.exec)
const spawn = util.promisify(cmd.spawn)

class api {

  private mainWindow: BrowserWindow

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow
  }

  public hello = () => {
    return 'hello world'
  }

  public hide = () => {
    this.mainWindow.hide()
  }
}


const registerApi = (mainWindow: BrowserWindow) => {
  const a = new api(mainWindow)

  ipcMain.on('launcher-api', async (event, arg) => {
    const window = arg.winId ? BrowserWindow.fromId(arg.winId) : mainWindow;
    //@ts-ignore
    const data = await a[arg.type](arg, window, event);
    event.returnValue = data;
  })
}

export { registerApi }
