import { fetch } from 'helpers'
import {
  itemsApi as itemsUrl,
  itemApi as itemUrl,

  JSONHeaders as headers
} from 'constants'
import data from './data'



export const getItems = () => fetch(itemsUrl, {
  ...headers,
  method: 'get'
}, data);

export const saveItem = body => fetch(itemUrl, {
  ...headers,
  method: 'post',
  body: JSON.stringify(body)
});

window.getItems = getItems;
