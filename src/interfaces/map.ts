import ymaps, { GeoObjectCollection } from 'yandex-maps';

export type Coordinates = [number, number];

export type YMaps = typeof ymaps & {
    geocode: (request: string) => Promise<{ geoObjects: GeoObjectCollection }>
}
