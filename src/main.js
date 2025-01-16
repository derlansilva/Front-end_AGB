const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { execFile } = require('child_process');

let mainWindow;

console.log("estou no main")
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Caminho do preload.js
      contextIsolation: true, // Isolamento de contexto
      nodeIntegration: false // Desabilitar nodeIntegration (por segurança)
    }
  });

  // Carregar o React (em desenvolvimento ou produção)
  mainWindow.loadURL('http://localhost:3000'); // React em desenvolvimento
  // mainWindow.loadFile('build/index.html'); // Para produção, carregue o arquivo HTML gerado pelo React
});

// Função que será chamada pelo React para executar o programa de desktop
ipcMain.handle('run-program', async (_, manifestos) => {
  const executablePath = path.join(__dirname, 'assets', 'program.exe');
  
  execFile(executablePath, manifestos, (error, stdout, stderr) => {
    if (error) {
      console.error('Erro ao executar o programa:', error);
      return;
    }
    console.log('Saída do programa:', stdout);
  });

  return { success: true };
});
