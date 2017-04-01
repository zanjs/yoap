export const apiOrigin = 'http://localhost:500';
export const api = '/api';
export const JSONHeaders = {
  headers: {"Content-type": 'application/json'}
};

// user api
export const signup = `/signup`;
export const signupApi = apiOrigin + api + signup;
export const login = `/login`;
export const loginApi = apiOrigin + api + login;

// items api
export const items = '/items';
export const itemsApi = apiOrigin + api + items;

// item api
export const item = '/item';
export const itemApi = apiOrigin + api + items;

