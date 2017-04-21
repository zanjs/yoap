import { fetch } from 'helpers'
import {
  signupApi as signupUrl,
  loginApi as loginUrl,
  updateUserDataApi as updateUserDataUrl,

  JSONHeaders as headers
} from 'constants'

export const login = data => fetch(loginUrl, {
  ...headers,
  method: 'post',
  body: JSON.stringify(data)
});

export const signup = data => {
  const {name, email, phone, password} = data;

  return fetch(signupUrl, {
    ...headers,
    method: 'post',
    body: JSON.stringify({
      name, email, phone, password
    })
  })
};

export const updateUserData = data => {
  return fetch(updateUserDataUrl, {
    ...headers,
    method: 'post',
    body: JSON.stringify(data)
  })
}
