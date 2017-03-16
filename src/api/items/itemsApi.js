import { fetch } from 'helpers'
import {
  getItems as getItemsUrl,
  saveItem as saveItemUrl,

  JSONHeaders as headers
} from 'constants'
import data from './data'



export const getItems = () => fetch(getItemsUrl, {
  ...headers,
  method: 'get'
}, data);

export const saveItem = body => fetch(saveItemUrl, {
  ...headers,
  method: 'post',
  body
});

window.getItems = getItems;
