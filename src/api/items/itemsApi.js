import { fetch } from 'helpers'
import {
  itemsApi as itemsUrl,
  itemApi as itemUrl,
  itemFindApi as itemFindUrl,
  itemUpdateApi as itemUpdateUrl,
  itemToggleFeaturedApi as itemToggleFeaturedUrl,

  JSONHeaders as headers
} from 'constants'


export const getItems = body => fetch(itemsUrl, {
  ...headers,
  method: 'post',
  body: body ? JSON.stringify(body) : null
});

export const getItem = body => fetch(itemFindUrl, {
  ...headers,
  method: 'post',
  body: body ? JSON.stringify(body) : null
});

export const saveItem = body => fetch(itemUrl, {
  ...headers,
  method: 'post',
  body: JSON.stringify(body)
});

export const updateItem = body => fetch(itemUpdateUrl, {
  ...headers,
  method: 'post',
  body: JSON.stringify(body)
});

export const toggleFeaturedItem = data => fetch(itemToggleFeaturedUrl, {
  ...headers,
  method: 'post',
  body: JSON.stringify(data)
});
