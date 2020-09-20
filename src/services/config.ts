import { toNumber } from 'lodash/fp';


const config = Object.freeze({
    MAP_CONTROLS: asArray(process.env.MAP_CONTROLS),
    MAP_BEHAVIORS: asArray(process.env.MAP_BEHAVIORS),
    MAP_CENTER: asNumbersArray(process.env.MAP_CENTER),
    MAP_ZOOM: toNumber(process.env.MAP_ZOOM),
    MAP_API_KEY: process.env.MAP_API_KEY,

    LOCALE: process.env.LOCALE,

    I18N_FOLDER: process.env.I18N_FOLDER,
    I18N_STORAGE_KEY: process.env.I18N_STORAGE_KEY
});

function asArray(configItem?: string) {
    return (configItem || '').split(',');
}

function asNumbersArray(configItem?: string) {
    return (configItem || '')
        .split(',')
        .map(toNumber);
}

export {
    config as default
};
