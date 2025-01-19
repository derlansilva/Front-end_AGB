const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  openProgram: (programPath) => ipcRenderer.send('open-program', programPath),
});
