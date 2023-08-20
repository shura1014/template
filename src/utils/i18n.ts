import i18n from "@/lang";

export function text(title: string) {
    const hasKey = i18n.global.te(title);
    if (hasKey) {
        return i18n.global.t(title);
    }
    return title;
}