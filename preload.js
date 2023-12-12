const { contextBridge, ipcRenderer } = require("electron")

console.log(123)

contextBridge.exposeInMainWorld('jsbr', {
  a() {
    ipcRenderer.invoke('a')
  },
  b() {
    ipcRenderer.invoke('b')
  }
})