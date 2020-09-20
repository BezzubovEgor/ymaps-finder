import { curry, pipe, get, fromPairs } from 'lodash/fp';

type EventHandler = (event: Event) => void;
type RemoveListenerFn = Function;

export const onEvent =  curry((event: any, handler: EventHandler, target: HTMLElement): RemoveListenerFn => {
    target.addEventListener(event, handler);
    return () => target.removeEventListener(event, handler);
});

export const preventDefault = curry((handler: EventHandler, event: Event) => {
    event.preventDefault();
    handler(event);
});

export const getFormDataFromEvent = curry(pipe(
    get('target'),
    (form: HTMLFormElement) => [...new FormData(form).entries()],
    fromPairs,
));
