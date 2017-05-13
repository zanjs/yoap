import loadYMaps from './loadYMaps'


export default class NearestTransport {
  isLoaded = false;
  callbacks = [];

  set callback(fn) {
    this.callbacks.push(fn);
  }

  get Map() {
    return window.ymaps;
  }

  constructor() {
    loadYMaps().then(this.onLoad);
  }

  onLoad = () => {
    this.isLoaded = true;

    if (this.callbacks.length) {
      this.callbacks.forEach(item => item());
    }
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
