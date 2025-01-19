const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');

let mainWindow;

// Cria a janela principal
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Opcional para comunicação segura
      nodeIntegration: true,
      contextIsolation: false, // Permitir usar Node.js diretamente no React
    },
  });

  // Carrega o aplicativo React
  mainWindow.loadURL('http://localhost:3000');
};

// Executa um programa ao receber o comando do React
ipcMain.on('open-program', (event, programPath) => {
  exec(programPath, (err) => {
    if (err) {
      console.error(`Erro ao abrir o programa: ${err.message}`);
    }
  });
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
