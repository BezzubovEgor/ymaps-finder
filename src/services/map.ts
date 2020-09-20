import { get, pipe, cond, isNil, constant, stubTrue } from "lodash/fp";

import { YMaps, Coordinates } from "../interfaces";
import config from './config';
import { loadScript } from "../utils";


const YMAPS_SCRIPT_PATH = `https://api-maps.yandex.ru/2.1/?apikey=${config.MAP_API_KEY}&lang=ru_RU`;
declare const ymaps: YMaps;
let yMap: ymaps.Map;

loadScript(YMAPS_SCRIPT_PATH).then(() => ymaps.ready(init));

function init() {
    yMap = new ymaps.Map("map", {
        center: config.MAP_CENTER,
        zoom: config.MAP_ZOOM,
        controls: config.MAP_CONTROLS,
        behaviors: config.MAP_BEHAVIORS,
    });
}

export function setCoordinates(coordinates: Coordinates) {
    yMap.setCenter(coordinates, 15);
    yMap.geoObjects.removeAll();
    yMap.geoObjects.add(new ymaps.Placemark(coordinates, {}));
}

export function showRoute(from: Coordinates, to: Coordinates = config.MAP_CENTER as Coordinates) {
    const multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: [ from, to ],
        params: { results: 3 },
    }, {
        boundsAutoApply: true
    });

    yMap.geoObjects.add(multiRoute);
}

export function getLocations(request: string): Promise<ymaps.IGeoObject[]> {
    return ymaps.geocode(request).then((res) => res.geoObjects.toArray());
}

export function getCoordinates(request: string): Promise<Coordinates> {
    return getLocations(request).then(pipe(
        get(0),
        cond([
            [isNil, constant([])],
            [stubTrue, ((gObject) => gObject.geometry.getCoordinates())]
        ]),
    ));
}
