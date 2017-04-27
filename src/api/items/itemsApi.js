import { fetch } from 'helpers'
import {
  itemsApi as itemsUrl,
  itemApi as itemUrl,
  itemFindApi as itemFindUrl,
  itemUpdateApi as itemUpdateUrl,
  itemToggleFeaturedApi as itemToggleFeaturedUrl,
  filterItemsApi as filterItemsUrl,
  itemViewApi as updateItemViewUrl,
  itemPhoneApi as itemPhoneUrl,

  JSONHeaders as headers
} from 'constants'
import { getHeaders } from 'helpers'


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
  ...getHeaders(),
  method: 'post',
  body: JSON.stringify(body)
});

export const updateItem = body => fetch(itemUpdateUrl, {
  ...getHeaders(),
  method: 'post',
  body: JSON.stringify(body)
});

export const toggleFeaturedItem = data => fetch(itemToggleFeaturedUrl, {
  ...getHeaders(),
  method: 'post',
  body: JSON.stringify(data)
});

export const fetchFilteredItems = data => fetch(filterItemsUrl, {
  ...headers,
  method: 'post',
  body: JSON.stringify(data)
})

export const updateItemViews = id => fetch(updateItemViewUrl, {
  ...headers,
  method: 'put',
  body: JSON.stringify({id})
})

export const findPhoneNumber = id => fetch(itemPhoneUrl, {
  ...getHeaders(),
  method: 'post',
  body: JSON.stringify({id})
})
