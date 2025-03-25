import path from "path";
import { app } from "electron";

export const isDev = () => {
  return process.env.NODE_ENV === "development";
};

export const getPreloadPath = () => {
  return path.join(
    app.getAppPath(),
    isDev() ? "." : "..",
    "/dist-electron/preload.cjs",
  );
};
