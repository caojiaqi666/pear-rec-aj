import { BrowserWindow, shell } from 'electron';
import { ICON, WEB_URL, WIN_CONFIG, preload, url } from '../main/constant';

let aboutWin: BrowserWindow | null = null;

function createAboutWin(): BrowserWindow {
  aboutWin = new BrowserWindow({
    title: 'SnipTaker about',
    icon: ICON,
    width: WIN_CONFIG.about.width, // 宽度(px)
    height: WIN_CONFIG.about.height, // 高度(px)
    titleBarStyle: 'hidden',
    webPreferences: {
      preload,
    },
  });
  aboutWin.setWindowButtonVisibility(false)
  // aboutWin.webContents.openDevTools();
  if (url) {
    aboutWin.loadURL(WEB_URL + 'about.html');
  } else {
    aboutWin.loadFile(WIN_CONFIG.about.html);
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
