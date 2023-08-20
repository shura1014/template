/// <reference types="vite/client" />

declare module '*.vue' {
    import type {DefineComponent} from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}


// 环境变量 TypeScript的智能提示
interface ImportMetaEnv {
    APP_BASE_API: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}