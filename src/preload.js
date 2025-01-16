const { contextBridge, ipcRenderer } = require('electron');

// Aqui estamos expondo a função runProgram para o React
contextBridge.exposeInMainWorld('electron', {
  runProgram: (manifestos) => ipcRenderer.invoke('run-program', manifestos)
});
