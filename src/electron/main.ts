import { app, ipcMain, BrowserWindow } from "electron";
import path from "path";
import { isDev, getPreloadPath } from "./util.js";
import Store from "electron-store";

const store = new Store();

ipcMain.handle("store:get", (_, key) => {
  return store.get(key);
});

ipcMain.handle("store:set", (_, key, value) => {
  store.set(key, value);
});

async function main() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: getPreloadPath(),
    },
    titleBarStyle: "hidden",
    ...(process.platform !== "darwin" ? { titleBarOverlay: true } : {}),
  });

  if (isDev()) {
    await mainWindow.loadURL("http://localhost:3000");
  } else {
    await mainWindow.loadFile(
      path.join(app.getAppPath(), "/dist-react/index.html"),
    );
  }
}

app.whenReady().then(main);
