import { tap, pipe, get, once } from 'lodash/fp';

import { setCoordinates, getCoordinates } from './services/map';
import { translatePage } from './services/translate';
import { onEvent, preventDefault, getFormDataFromEvent } from './utils';


const form = document.getElementById('place-search-form')!;

translatePage();

onEvent('submit', preventDefault(
    pipe(
        once(tap(() => {
            form.classList.remove('fullscreen');
        })),
        getFormDataFromEvent,
        get('place'),
        getCoordinates,
        tap(async (result) => {
            setCoordinates(await result);
        }),
    ),
), form);
