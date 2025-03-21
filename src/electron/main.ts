import {app, BrowserWindow} from 'electron';
import path from 'path';
import {isDev} from "./util.js";

app.on('ready', async () => {
  const mainWindow = new BrowserWindow({});

  if (isDev()) {
    await mainWindow.loadURL('http://localhost:3000');
  } else {
    await mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
});