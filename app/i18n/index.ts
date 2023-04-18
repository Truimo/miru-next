"use client";
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import cookies from "js-cookie";
import {
    initReactI18next,
    useTranslation as useTranslationOrg,
} from "react-i18next";
import {fallbackLng, getOptions, languages} from "./settings";
import {isClient} from "@/utils/is-client";

i18next
    .use(initReactI18next)
    .use(
        resourcesToBackend(
            (language: string, namespace: string) =>
                import(`./locales/${language}/${namespace}.json`)
        )
    )
    .init(getOptions());

export function useTranslation(ns?: string[] | string, options: any = {}) {
    const savedLng = cookies.get("language") ?? 'auto';
    const lng = isClient() ? 'auto' === savedLng ? languages.includes(navigator.language) ? navigator.language : fallbackLng : savedLng ?? fallbackLng : fallbackLng;
    if (i18next.resolvedLanguage !== lng) i18next.changeLanguage(lng);
    return useTranslationOrg(ns, options);
}
