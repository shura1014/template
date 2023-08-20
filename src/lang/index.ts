import {createI18n} from 'vue-i18n';

//  本地找吃的语言包
import enLocale from '@/lang/en_US';
import zhCnLocale from '@/lang/zh_CN';


const messages = {
    'zh-cn': {
        ...zhCnLocale,
    },
    'zh': {
        ...zhCnLocale,
    },
    "en": {
        ...enLocale,
    },
    "en-us": {
        ...enLocale,
    },
};


export const getLanguage = (def?: string) => {
    // 本地缓存获取
    let language = localStorage.getItem('language');
    if (language) {
        return language;
    }
    // 如果有默认
    if (def) {
        localStorage.setItem("language",def)
        return def
    }
    // 当前浏览器使用语言
    language = navigator.language.toLowerCase();
    const locales = Object.keys(messages);
    for (const locale of locales) {
        if (language.indexOf(locale) > -1) {
            return locale;
        }
    }
    // 默认中文
    return 'zh-cn';
};

// 创建本应用的i18n
// 如果不配置以vite.config.ts 为主
// pluginOptions: {
//       i18n: {
//         locale: 'en',
//         fallbackLocale: 'en',
//         localeDir: 'locales',
//         enableLegacy: true,
//         runtimeOnly: false,
//         compositionOnly: true,
//         fullInstall: true
//       }
//     },
const i18n = createI18n({
    // 解决 _ctx.$t is not a function
    globalInjection: true,
    legacy: false,
    locale: getLanguage("en"), // 当前支持的语言
    fallbackLocale: 'zh', // 没有设置该语言时候，使用zh
    messages: messages, // 国际化的配置信息
});

export default i18n;