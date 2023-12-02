import { BrowserWindow, ipcMain } from "electron"
import * as cmd from 'node:child_process'
import util from 'node:util'

const exec = util.promisify(cmd.exec)

class api {
  public hello = () => {
    return 'hello world'
  }

  public execCommand = async ({ data }: any) => {
    const { command, args } = data
    if (args && args.length > 0) {
      return await exec(`${command} ${args?.join(' ')}`)
    }
    return await exec(command)
  }
}


const registerApi = (mainWindow: BrowserWindow) => {
  const a = new api()

  ipcMain.on('launcher-api', async (event, arg) => {
    const window = arg.winId ? BrowserWindow.fromId(arg.winId) : mainWindow;
    //@ts-ignore
    const data = await a[arg.type](arg, window, event);
    event.returnValue = data;
  })
}

export { registerApi }
