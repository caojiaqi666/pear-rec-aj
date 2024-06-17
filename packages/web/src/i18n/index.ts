import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Local } from "../util/storage";
import zhCN from "./locales/zh-CN.json";
import enUS from "./locales/en-US.json";
import deDE from "./locales/de-DE.json";

export async function initI18n() {
  const locale = await window.electronAPI.getLang()
  // 默认语言采用本地语言
  const lng = Local.get("i18n") ?? (locale.startsWith('zh') ? 'zh' : 'en')
  i18n.use(initReactI18next).init({
    resources: {
      de: {
        translation: deDE,
      },
      en: {
        translation: enUS,
      },
      zh: {
        translation: zhCN,
      },
    },
    lng,
    fallbackLng: "zh", // 设置回退语言
    interpolation: {
      escapeValue: false, // 不需要转义内容
    },
  });
}
