import {
  signupApi as signupUrl,
  loginApi as loginUrl,
  logoutApi as logoutUrl,
  updateUserDataApi as updateUserDataUrl,
  checkUserApi as checkUserUrl,
  checkPasswordApi as checkPasswordUrl,
  JSONHeaders as headers,
} from 'constants'
import { getHeaders, fetch } from 'helpers'

export const login = data => fetch(loginUrl, {
  ...headers,
  method: 'post',
  body: JSON.stringify(data)
});

export const logout = () => {
  return fetch(logoutUrl, {
    ...getHeaders(),
    method: 'post'
  })
}

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
    ...getHeaders(),
    method: 'post',
    body: JSON.stringify(data)
  })
}

export const checkAuth = () => {
  return fetch(checkUserUrl, {
    ...getHeaders(),
    method: 'post'
  })
}

export const checkPassword = password => {
  return fetch(checkPasswordUrl, {
    ...headers,
    method: 'post',
    body: JSON.stringify({
      password
    })
  })
}
