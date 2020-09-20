import { curry } from 'lodash/fp';


export const setStringItem = curry((key: string, value: string) => {
    localStorage.setItem(key, value);
    return value;
})

export const setItem = curry((key: string, value: Object) => setStringItem(key, JSON.stringify(value)));

export function getStringItem(key: string) {
    return localStorage.getItem(key);
}

export function getItem<T extends Object>(key: string): T {
    return maybeParse(getStringItem(key));
}

function maybeParse(value: string | null) {
    try {
        return JSON.parse(value!);
    } catch {
        return undefined;
    }
}
