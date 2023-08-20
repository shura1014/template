import {createApp, Directive} from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import {createPinia} from 'pinia';
import App from '@/App.vue'
import router from '@/router';
// import '@/assets/css/icon.css'
import '@/assets/css/font.css'
import 'element-plus/dist/index.css'
import i18n from '@/lang/index';


const app = createApp(App);

// 注册elementplus图标
// 官网 https://element-plus.org/zh-CN/component/icon.html#%E5%AE%89%E8%A3%85
// @ts-ignore
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

// 引入svg注册脚本
import 'virtual:svg-icons-register'

// 注册权限
import * as permission from './permission/index';

app.directive('permission', {
    mounted: permission.hasPerm
});

app.use(createPinia())
    .use(router)
    .use(i18n)
    .mount('#app');
