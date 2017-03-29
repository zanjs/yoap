import JSONToQuery from './JSONToQuery'
import { map as config } from 'config'

export default class Directions {
  url = 'https://maps.googleapis.com/maps/api/distancematrix/json';
  city = '59.9342802,30.3350986';
  key = config.apiKey;

  getLink = obj => {
    const { url, city, key } = this;
    const params = JSONToQuery(obj)
      .replace('?', '&');

    return `${url}?origin=${city}${params}&key=${key}`;
  };

  goTo = () => {
    const data = {
      destinations: '59.94921953,30.34986148|59.92679726,30.31737456',
      language: 'ru',
    };

    return this.getLink(data);
  }


}

window.Directions = new Directions;
