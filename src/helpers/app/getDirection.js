import { map as config } from 'config'
import loadScript from './loadScript'

const loadLibrary = cb => {
  const { scriptId, link } = config;

  loadScript(link, cb, scriptId);
};

const findDirection = ({point, direction, resolve, reject}) => {
  const [lat, lng] = point.position;
  const [_lat, _lng] = direction.position;

  const origin = new google.maps.LatLng(lat, lng);
  const destination = new google.maps.LatLng(_lat, _lng);

  const request = {
    origin, destination,
    travelMode: google.maps.TravelMode[direction.method || 'WALKING'],
    unitSystem: google.maps.UnitSystem.METRIC,
    optimizeWaypoints: true,
    provideRouteAlternatives: true,
    avoidHighways: true,
    avoidTolls: true
  };
  new google.maps.DirectionsService().route(request, (result, status) => {
    if (status == google.maps.DirectionsStatus.OK) {
      const routes = result.routes;
      const leg = routes[0].legs;
      const length = leg[0].distance.text;
      const duration = leg[0].duration.text;

      resolve({
        result, routes, length,
        duration, status
      });
    } else {
      const error = new Error
      reject(result, status);
      throw error
    }
  })
}

export default (point, direction) => {
  return new Promise((resolve, reject) => {
    if (!point || !direction || !point.position || !direction.position) {
      const error = new Error
      reject({message: 'Have no point or direction'});
      throw error
    }

    const google = window.google;
    if (!google) {
      return loadLibrary(() => {
        findDirection({resolve, reject, point, direction});
      })
    }

    findDirection({resolve, reject, point, direction});
  })
}
