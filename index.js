const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    frame: false,
    show: true,
    webPreferences: {
      fullscreen: true,
      sandbox: true,
      nodeIntegration: false,
      enableRemoteModule: false,
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
      preload: path.resolve(__dirname, './preload.js'),
    },
  });

  mainWindow.loadURL('http://www.google.com');
  mainWindow.webContents.openDevTools({
    mode: 'undocked',
  });
  ipcMain.handle('a', () => {
    mainWindow.setFullScreen(false);
  })
  ipcMain.handle('b', () => {
    mainWindow.setFullScreen(true);
  })
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
