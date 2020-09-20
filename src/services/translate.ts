import { getOr } from 'lodash/fp';
import axios from 'axios';

import { getStringItem } from './local-storage';
import config from './config';


let translates: Record<string, string> = {};

initTranslations();

export function getLocale() {
    return config.LOCALE
        || getStringItem('locale')
        || (window.navigator.language || 'en').split('-')[0];
}

export function getLocaleFileName() {
    return `${config.I18N_FOLDER}/${getLocale()}.json`;
}

export function initTranslations(path = getLocaleFileName()) {
    axios.get(path)
        .then(getOr({}, 'data'))
        .then(data => (translates = data))
        .then(translatePage);
}

export function translate(key: string | null | undefined) {
    return translates[key!] ?? key;
}

export function translatePage() {
    const items = document.querySelectorAll('[data-translate]')! as NodeListOf<HTMLElement>;
    items.forEach((item: HTMLElement) => {
        item.textContent = translate(item.dataset['translate']);
    });
}
