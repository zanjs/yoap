import getToken from 'helpers/app/getToken'

export const hostname = (() => {
  if (typeof window !== 'object') {
    return 'localhost'
  }

  return window.location.hostname;
})();

export const apiOrigin = `http://${hostname}:5000`;
export const api = '/api';
export const JSONHeaders = {
  headers: {
    "Content-type": 'application/json',
  }
};

// user api
export const signup = `/signup`;
export const signupApi = apiOrigin + api + signup;
export const login = `/login`;
export const loginApi = apiOrigin + api + login;
export const logout = `/logout`;
export const logoutApi = apiOrigin + api + logout;
export const checkUser = `/check`;
export const checkUserApi = apiOrigin + api + checkUser;
export const updateUserData = `/update`;
export const updateUserDataApi = apiOrigin + api + updateUserData;

// items api
export const items = '/items';
export const itemsApi = apiOrigin + api + items;
export const filterItems = '/items-filtered'
export const filterItemsApi = apiOrigin + api + filterItems;

// item api
export const item = '/item';
export const itemApi = apiOrigin + api + item;

// item find api
export const itemFind = '/item/find';
export const itemFindApi = apiOrigin + api + itemFind;

// item update api
export const itemUpdate = '/item/update';
export const itemUpdateApi = apiOrigin + api + itemUpdate;

// item get phone number api
export const itemPhone = '/item/phone';
export const itemPhoneApi = apiOrigin + api + itemPhone;

// item views api
export const itemView = '/item/view';
export const itemViewApi = apiOrigin + api + itemView;

// item featured api
export const itemToggleFeatured = '/item/featured';
export const itemToggleFeaturedApi = apiOrigin + api + itemToggleFeatured;

// images api
export const image = '/images';
export const imageApi = apiOrigin + api + image;


