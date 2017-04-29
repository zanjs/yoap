import {
  updateDummyUserApi as updateDummyUserUrl,
  getUsers as getUsersUrl,
  createDummyUserApi as createDummyUserUrl,
} from 'constants'
import { getHeaders, fetch } from 'helpers'

export const getUsersApi = data => fetch(getUsersUrl, {
  ...getHeaders(),
  method: 'get'
});

export const createDummyUserApi = data => fetch(createDummyUserUrl, {
  ...getHeaders(),
  method: 'post',
  body: JSON.stringify(data)
})

export const updateDummyUserApi = (id, data) => fetch(updateDummyUserUrl, {
  ...getHeaders(),
  method: 'post',
  body: JSON.stringify({
    id, data
  })
})
