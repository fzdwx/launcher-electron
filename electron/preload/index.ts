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
  return ipcRenderer.sendSync('launcher-api', {
    type,
    data
  }) as O
}

window.launcher = {
  hello() {
    return callApiWithRes('hello', {})
  },

  async execCommand(command: string, args?: Array<string>) {
    if (args && args.length > 0) {
      return await exec(`${command} ${args?.join(' ')}`)
    }
    return await exec(command)
  },

  async spawn(command: string, args?: Array<string>) {
    return await spawn(command, args ? args : [], {})
  },

  hide() {
    callApi('hide', {})
  }
}
