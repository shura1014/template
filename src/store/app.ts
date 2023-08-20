import {defineStore} from 'pinia';
import {getLanguage} from "@/lang";

interface AppState {
    language: string
    font: string
}

const useAppStore = defineStore("app", {
    state: (): AppState => ({
        language: getLanguage(),
        font: localStorage.getItem('font') || 'Light',
    }),
    actions: {
        setLanguage(language: string) {
            this.language = language;
            localStorage.setItem('language', language);
        },

        setFont(font: string) {
            this.font = font;
            localStorage.setItem('font', font);
        },
    }
})

export default useAppStore;
