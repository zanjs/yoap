import { fetch } from 'helpers'
import {
  itemsApi as itemsUrl,
  itemApi as itemUrl,

  JSONHeaders as headers
} from 'constants'
import data from './data'



export const getItems = body => fetch(itemsUrl, {
  ...headers,
  method: 'post',
  body: body ? JSON.stringify(body) : null
});

export const saveItem = body => fetch(itemUrl, {
  ...headers,
  method: 'post',
  body: JSON.stringify(body)
});

window.getItems = getItems;
