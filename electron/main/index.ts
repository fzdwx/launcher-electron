import { app } from "electron";
import main from "./mainWin";
import { registerApi } from "../preload/api";

class Launcher {
  init: () => void;
  getWindow: () => Electron.BrowserWindow;
  loadMainView: () => void;


  constructor() {
    const { init, getWindow, loadMainView } = main()
    this.init = init
    this.getWindow = getWindow
    this.loadMainView = loadMainView
  }

  createWindow() {
    this.init()
    registerApi(this.getWindow())
  }
}


const launcher = new Launcher()
app.whenReady().then(() => {
  launcher.createWindow()
})


app.on('activate', () => {
  if (launcher.getWindow() === null) {
    launcher.createWindow()
  }
})
