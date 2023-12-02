import { lstat } from 'node:fs/promises'
import * as fs from 'node:fs'
import { cwd } from 'node:process'
import { ipcRenderer } from 'electron'

ipcRenderer.on('main-process-message', (_event, ...args) => {
  console.log('[Receive Main-process message]:', ...args)
})

lstat(cwd()).then(stats => {
  console.log('[fs.lstat]', stats)
}).catch(err => {
  console.error(err)
})



const helloWorld = () => {
  fs.readFile('/home/like/.zshrc', (err, data) => {
    if (err) throw err;
    console.log(data.toString());
  });
  console.log("this is hello worl222d");
}


export {
  helloWorld
}
