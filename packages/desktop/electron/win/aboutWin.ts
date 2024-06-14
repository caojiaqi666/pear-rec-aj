import { BrowserWindow, shell } from 'electron';
import { ICON, WEB_URL, WIN_CONFIG, preload, url } from '../main/constant';

let aboutWin: BrowserWindow | null = null;

function createAboutWin(): BrowserWindow {
  aboutWin = new BrowserWindow({
    title: 'SnipTaker about',
    icon: ICON,
    autoHideMenuBar: WIN_CONFIG.setting.autoHideMenuBar, // 自动隐藏菜单栏
    width: WIN_CONFIG.setting.width, // 宽度(px)
    height: WIN_CONFIG.setting.height, // 高度(px)
    titleBarStyle: 'hidden',
    webPreferences: {
      preload,
    },
  });

  // aboutWin.webContents.openDevTools();
  if (url) {
    aboutWin.loadURL(WEB_URL + 'about.html');
  } else {
    aboutWin.loadFile(WIN_CONFIG.setting.html);
  }

  aboutWin.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url);
    return { action: 'deny' };
  });

  return aboutWin;
}

// 打开关闭录屏窗口
function closeAboutWin() {
  aboutWin?.isDestroyed() || aboutWin?.close();
  aboutWin = null;
}

function openAboutWin() {
  if (!aboutWin || aboutWin?.isDestroyed()) {
    aboutWin = createAboutWin();
  }
  aboutWin?.show();
}

function showAboutWin() {
  aboutWin?.show();
}

function hideAboutWin() {
  aboutWin?.hide();
}

export { closeAboutWin, createAboutWin, openAboutWin, showAboutWin, hideAboutWin };
