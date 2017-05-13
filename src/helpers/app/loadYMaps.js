import loadScript from './loadScript'
import subscribe from './subscribe'
import { map as config } from 'config'

const link = config.yandexMap;
const scriptId = 'yandex-maps';

const isLoaded = () => !!(window.ymaps && window.ymaps.geocode);
let timeOut;

export default function loadYMaps() {
  return new Promise((resolve, reject) => {
    if (isLoaded()) {
      return resolve(window.ymaps);
    }

    loadScript(link, () => {
      subscribe(
        () => resolve(),
        isLoaded,
        timeOut,
        100
      );
    }, scriptId);
  })
}
