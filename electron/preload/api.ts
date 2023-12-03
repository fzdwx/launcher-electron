import { BrowserWindow, app, ipcMain } from "electron"
import { toCenter } from "../main/screen";
import * as cmd from 'node:child_process'
import util from 'node:util'

const exec = util.promisify(cmd.exec)
const spawn = util.promisify(cmd.spawn)

class LauncherApi {

  private mainWindow: BrowserWindow

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow
  }

  public hello = () => {
    return 'hello world'
  }

  public hide = () => {
    this.mainWindow.blur()
    this.mainWindow.hide()
    this.mainWindow.reload()
  }

  public show = () => {
    this.mainWindow.show()
    toCenter(this.mainWindow)
    this.mainWindow.focus()
  }

  public async execCommand({ data }: { data: any }) {
    const { command, args } = data
    if (args && args.length > 0) {
      return await exec(`${command} ${args?.join(' ')}`)
    }
    return await exec(command)
  }

  public async spawn({ data }: { data: any }) {
    const { command, args } = data
    return await spawn(command, args ? args : [], {})
  }

  public getPath({ data }: { data: any }) {
    const { name } = data
    return app.getPath(name)
  }
}


const registerApi = (mainWindow: BrowserWindow) => {
  const a = new LauncherApi(mainWindow)

  ipcMain.handle('launcher-api', async (event, arg) => {
    const window = arg.winId ? BrowserWindow.fromId(arg.winId) : mainWindow;
    //@ts-ignore
    return await a[arg.type](arg, window, event);
  })

  ipcMain.on('launcher-api', async (event, arg) => {
    const window = arg.winId ? BrowserWindow.fromId(arg.winId) : mainWindow;
    //@ts-ignore
    const data = await a[arg.type](arg, window, event);
    event.returnValue = data;
  })
}

export { registerApi, LauncherApi as api }
