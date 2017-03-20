import { fetch } from 'helpers'
import {
  itemsApi as itemsUrl,

  JSONHeaders as headers
} from 'constants'
import data from './data'



export const getItems = () => fetch(itemsUrl, {
  ...headers,
  method: 'get'
}, data);

export const saveItem = body => fetch(itemsUrl, {
  ...headers,
  method: 'post',
  body
});

window.getItems = getItems;
