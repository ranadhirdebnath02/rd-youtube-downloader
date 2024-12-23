const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

const APP_PATH = __dirname;
const PRELOAD_PATH = path.join(APP_PATH, 'preload');
const UI_PATH = path.join(APP_PATH, 'ui');
const EVENTS_PATH = path.join(APP_PATH, 'event');

const createWindow = (loadFile = 'main.html') => {
  const window = new BrowserWindow({
    width: 700,
    height: 600,
    // show: false,
    webPreferences: {
      preload: path.join(PRELOAD_PATH, 'main-preload.js'),
    },
    maximizable: false,
    resizable: false,
  });

  // Open the DevTools.
  // window.webContents.openDevTools();

  window.setMenu(null);    // disable menu bar

  window.loadFile(path.join(UI_PATH, loadFile));
  // window.maximize();

  return window;
};


const initApp = async () => {
  const mainWindow = await app.whenReady().then(createWindow);
  require(path.join(EVENTS_PATH, 'download-handler.js'))(APP_PATH, mainWindow);
  

  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createWindow());

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Ctrl/Cmd + Q.
  app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit());
};

module.exports = {
  init: initApp
};