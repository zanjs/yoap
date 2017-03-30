import loadScript from './loadScript'
import subscribe from './subscribe'
import { map as config } from 'config'


export default class NearestTransport {
  isLoaded = false;
  link = config.yandexMap;
  scriptId = 'yandex-maps';
  callbacks = [];

  set callback(fn) {
    this.callbacks.push(fn);
  }

  get Map() {
    return window.ymaps;
  }

  constructor() {
    const { link, scriptId } = this;

    loadScript(link, this.onLoad, scriptId);
  }

  onLoad = () => {
    subscribe(
      () => {
        this.isLoaded = true;

        if (this.callbacks.length) {
          this.callbacks.forEach(item => item());
        }
      },

      () => !!(window.ymaps && window.ymaps.geocode),

      this.timeOut,

      100
    )
  };

  replaceSpaces = string => (
    string.replace(
      new RegExp('&#160;', 'gi'), ' '
    )
  );

  findStations = (pos, callback) => {
    if (!this.isLoaded)
      return this.callback = this.findStations.bind(this, pos, callback);

    const { replaceSpaces } = this;

    this.Map.geocode(pos, { kind: 'metro' }).then(res => {
      window.res = res;
      const length = res.geoObjects.getLength();

      if (length < 0)
        return null;

      let data = [];

      res.geoObjects.each(item => {
        const position = item.geometry.getCoordinates();
        const dist = ymaps.coordSystem.geo.getDistance(pos, position);
        const distance = replaceSpaces(ymaps.formatter.distance(dist));
        const duration = replaceSpaces(ymaps.formatter.duration(dist));

        data.push({
          distance, duration,
          name: item.getAddressLine(),
          position
        })
      });

      callback(data);
    });
  }
}
