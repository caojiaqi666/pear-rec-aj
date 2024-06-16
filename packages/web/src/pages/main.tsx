import { createRoot } from 'react-dom/client';
import { initI18n } from '../i18n';
import './index.scss';
import { Local } from '@/util/storage';
import axios from 'axios';

const queryActiveStatus = async ({ uEmail, uKey }) => {
  try {
    var agent = navigator.userAgent.toLowerCase();
    var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
    console.log("isMac", isMac)
    if (agent.indexOf('win32') >= 0 || agent.indexOf('wow32') >= 0) {
      console.log('这是windows32位系统');
    }
    if (agent.indexOf('win64') >= 0 || agent.indexOf('wow64') >= 0) {
      console.log('这是windows64位系统');
    }
    const { data: state } = await axios.get(
      `https://www.regserver3.com/admin/checkregister.php?pid=${isMac ? '4' : '3'}&email=${uEmail}&license=${uKey}&mac=4`,
      {
        timeout: 3000,
      },
    );
    if (state === 0) {
      Local.set('userActivated', true);
    } else {
      Local.set('userActivated', false);
    }
  } catch (err) {
    console.log('err', err);
  }
};

export default function initApp(App) {
  const userAgent = navigator.userAgent.toLowerCase();
  window.isElectron = userAgent.indexOf(' electron/') > -1 ? true : false;
  window.isOffline = location.host == 'pear-rec-xiguapi.vercel.app' ? true : false;
  window.isMac = /macintosh|mac os x/i.test(navigator.userAgent);
  window.baseURL = import.meta.env.VITE_API_URL;
  const container = document.getElementById('root') as HTMLElement;
  const root = createRoot(container);
  // 请求用户数据
  const uEmail = Local.get('uEmail') || null;
  const uKey = Local.get('uKey') || null;
  if (uEmail && uKey) {
    queryActiveStatus({ uEmail, uKey });
  }

  initI18n();
  root.render(<App />);

  postMessage({ payload: 'removeLoading' }, '*');
}
