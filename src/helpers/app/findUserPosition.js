import loadYMaps from './loadYMaps'

const findUser = (ymaps = window.ymaps) => {
  const { geolocation } = ymaps;

  // find user location by ip
  return geolocation.get({
    provider: 'yandex',
  }).then(function (result) {
    const object = result.geoObjects.get(0);
    const position = object.geometry.getCoordinates();
    const { name, text, metaDataProperty: {GeocoderMetaData} } = object.properties.getAll();
    let data = {};

    GeocoderMetaData.Address.Components.forEach(item => {
      data[item.kind] = item.name || item.value;
    })

    const res = {
      position,
      city: name,
      full: text,
      data
    };

    return res;
  });
}

export default function findUserPosition() {
  return loadYMaps().then(findUser);
}
