import electron from "electron";

electron.contextBridge.exposeInMainWorld("electron", {
  store: {
    get: async (key: string): Promise<string> => {
      return await electron.ipcRenderer.invoke("store:get", key);
    },
    set: async (key: string, value: string): Promise<void> => {
      await electron.ipcRenderer.invoke("store:set", key, value);
    },
  },
} satisfies Window["electron"]);
