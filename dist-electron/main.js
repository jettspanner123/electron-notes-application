import { app, BrowserWindow, screen } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let registrationWindow;
function createRegistrationWindow() {
  registrationWindow = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    },
    frame: false,
    movable: false,
    transparent: true,
    resizable: false,
    height: Math.floor(screen.getPrimaryDisplay().workAreaSize.height * 0.75),
    width: Math.floor(screen.getPrimaryDisplay().workAreaSize.width * 0.75)
  });
  registrationWindow.loadURL("http://localhost:5173/registration");
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    registrationWindow = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createRegistrationWindow();
  }
});
app.whenReady().then(createRegistrationWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
