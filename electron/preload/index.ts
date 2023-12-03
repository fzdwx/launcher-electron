import { ipcRenderer } from "electron"

import * as cmd from 'node:child_process'
import util from 'node:util'

const exec = util.promisify(cmd.exec)
const spawn = util.promisify(cmd.spawn)

const callApi = (type: string, data: any) => {
  ipcRenderer.send('launcher-api', {
    type,
    data
  })
}

const callApiWithRes = <I, O>(type: string, data: I) => {
  return ipcRenderer.invoke('launcher-api', {
    type,
    data
  }) as O
}

window.launcher = {
  hello() {
    return callApiWithRes('hello', {})
  },

  async execCommand(command: string, args?: Array<string>) {
    callApiWithRes('execCommand', {
      command,
      args
    })
  },

  async spawn(command: string, args?: Array<string>) {
    callApiWithRes('spawn', {
      command,
      args
    })
  },

  async getPath(name: 'home' | 'appData' | 'userData' | 'sessionData' | 'temp' | 'exe' | 'module' | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | 'recent' | 'logs' | 'crashDumps') {
    return callApiWithRes('getPath', {
      name
    })
  },

  hide() {
    callApi('hide', {})
  }
}
