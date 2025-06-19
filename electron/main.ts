import {app, BrowserWindow, screen} from 'electron'
import {createRequire} from 'node:module'
import {fileURLToPath} from 'node:url'
import path from 'node:path'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let registrationWindow: BrowserWindow | null;
let mainWindow: BrowserWindow | null;

function createRegistrationWindow() {
    registrationWindow = new BrowserWindow({
        icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.mjs'),
        },
        frame: false,
        movable: false,
        transparent: true,
        resizable: false,
        height: Math.floor(screen.getPrimaryDisplay().workAreaSize.height * 0.75),
        width: Math.floor(screen.getPrimaryDisplay().workAreaSize.width * 0.75),


    })
    registrationWindow.loadURL("http://localhost:5173/registration")
}

function createMainWindow(): void {
    mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
        },
        frame: false,
        movable: true,
        resizable: true,
        height: screen.getPrimaryDisplay().workAreaSize.height,
        width: screen.getPrimaryDisplay().workAreaSize.width
    });

    mainWindow.loadURL("http://localhost:5173");
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
        registrationWindow = null;
        mainWindow = null;
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createRegistrationWindow();
    }
})

app.whenReady().then(createRegistrationWindow)
