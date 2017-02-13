import { fetch } from 'helpers'
import {
  auth as authUrl,
  login as loginUrl,

  JSONHeaders as headers
} from 'constants'

export const login = ({name, password}) => fetch(loginUrl, {
  ...headers,
  method: 'post',
  body: {
    name, password
  }
});

export const auth = ({name, email, phone, password}) => fetch(authUrl, {
  ...headers,
  method: 'post',
  body: {
    name, email, phone, password
  }
});
