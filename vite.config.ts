import vue from '@vitejs/plugin-vue'
import {defineConfig} from 'vite'
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';
import path from 'path';


export default defineConfig(({mode}) => {
    return {
        base: './',
        plugins: [
            vue(),
            VueSetupExtend(),
            AutoImport({
                resolvers: [ElementPlusResolver()]
            }),
            Components({
                resolvers: [ElementPlusResolver()]
            }),
            createSvgIconsPlugin({
                // 指定需要缓存的图标文件夹
                iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
                symbolId: 'icon-[dir]-[name]'
            })
        ],
        server: {
            open: true,
        },
        envDir: "./env",
        envPrefix: ["VITE_", "APP_"],
        resolve: {
            alias: {
                '@': path.resolve('./src'), // 使用@会更加方便
            },
        },
    }

})