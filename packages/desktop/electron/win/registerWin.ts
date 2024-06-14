import { BrowserWindow, shell } from 'electron';
import { ICON, WEB_URL, WIN_CONFIG, preload, url } from '../main/constant';

let registerWin: BrowserWindow | null = null;

function createRegisterWin(): BrowserWindow {
  registerWin = new BrowserWindow({
    title: 'SnipTaker register',
    icon: ICON,
    width: WIN_CONFIG.register.width, // 宽度(px)
    height: WIN_CONFIG.register.height, // 高度(px)
    titleBarStyle: 'hidden',
    webPreferences: {
      preload,
    },
  });

  // registerWin.webContents.openDevTools();
  if (url) {
    registerWin.loadURL(WEB_URL + 'register.html');
  } else {
    registerWin.loadFile(WIN_CONFIG.register.html);
  }

  registerWin.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url);
    return { action: 'deny' };
  });

  return registerWin;
}

// 打开关闭录屏窗口
function closeRegisterWin() {
  registerWin?.isDestroyed() || registerWin?.close();
  registerWin = null;
}

function openRegisterWin() {
  if (!registerWin || registerWin?.isDestroyed()) {
    registerWin = createRegisterWin();
  }
  registerWin?.show();
}

function showRegisterWin() {
  registerWin?.show();
}

function hideRegisterWin() {
  registerWin?.hide();
}

export { closeRegisterWin, createRegisterWin, hideRegisterWin, openRegisterWin, showRegisterWin };
