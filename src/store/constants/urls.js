export const api = '/api';
export const JSONHeaders = {
  headers: {"Content-type": 'application/json'}
};

// user api
export const signup = `/signup`;
export const signupApi = api + signup;
export const login = `/login`;
export const loginApi = api + login;

// item api
export const getItems = `${api}/items/get`;
export const saveItem = `${api}/items/save`;

