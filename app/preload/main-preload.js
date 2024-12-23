const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  downloadVideo: (url) => ipcRenderer.invoke('download-video', url),
  onDownloadProgress: (callback) => ipcRenderer.on('download-progress', (_event, data) => callback(data)),
  onDownloadError: (callback) => ipcRenderer.on('download-error', (_event, data) => callback(data)),
});