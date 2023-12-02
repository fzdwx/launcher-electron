import { ipcRenderer } from "electron"


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

  execCommand(command: string, args = {}) {
    return callApiWithRes('execCommand', {
      command,
      args
    })
  },
}
