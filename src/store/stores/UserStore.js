/**
 * UserStore module.
 * @module stores/UserStore
 * @see store
 */
import { observable, reaction } from 'mobx'
import { login as serverLogin, signup as serverSignup } from 'api'
import { extend, localStore } from 'helpers'
import { store as config } from 'constants'

/**
 * UserStore class.
 * It contains user auth, stores his data (including his items).
 *
 * @class
 */
class UserStore {
  storeName = config.user;
  // user data
  @observable id;
  @observable name;
  @observable email;
  @observable phone;
  @observable password;

  // auth states
  @observable isFetching = false;
  @observable isAuthorized = false;
  @observable isError = false;

  constructor() {
    this.restoreValues();
    this.subscribeToLocalStore();
  }

  checkStatus = (res) => {
    if (res.status >= 200 && res.status < 300) {
      return res
    } else {
      var error = new Error(res.statusText)
      error.response = res
      throw error
    }
  }
  parseJSON = res => res.json();

  /**
   * Handler response for server subscription.
   *
   * @param {Object} response
   * @return {Function}
   */
  responseHandler = response => {
    console.log(window.resp = response);

    const {
      name, phone, email,
      _id
    } = response.data;
    this.isAuthorized = true;
    this.isError = false;
    this.isFetching = false;

    this.name = name;
    this.phone = phone;
    this.email = email;
    this.id = _id;
  };

  errorHandler = response => {
    const data = response.response || response;

    if (data.json) {
      return data.json().then(data => {
        if (data.message.errmsg) {
          data = {message: data.message.errmsg}
        }

        this.isError = {
          ...data,
          text: data.message
        };
        this.isFetching = false;
      })
    }

    console.log('data', window.d = data);

    this.isError = data;
    this.isFetching = false;
  };

  login = () => {
    this.isFetching = true;
    const { email, phone, password } = this.toJSON();
    const data = {
      ...(email ? {email} : {phone}),
      password
    }

    return serverLogin(data)
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(this.responseHandler)
      .catch(this.errorHandler);
  };

  signup = () => {
    this.isFetching = true;

    return serverSignup(this.toJSON())
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(this.responseHandler)
      .catch(this.errorHandler);
  };

  subscribeToLocalStore = () => reaction(
    // parse data to json
    () => this.toJSON(),

    // save to the local store
    data => {
      console.log('saving to store', JSON.stringify(data));

      localStore.set(this.storeName, data)
    }
  );

  /**
  * Save values to the store.
  *
  * @param {Object} values
  */
  saveValues = values => {
    extend(this, values);
  };

  restoreValues = () => {
    const data = localStore.get(this.storeName);

    if (data) {
      return extend(this, data);
    }
  };

  checkAuth = () => {
    if (!this.isAuthorized) return false;
    const isAuth = this.id && this.name && this.email && this.phone;

    return isAuth || (this.isAuthorized = false);
  };

  /**
  * Generate a JSON from the data.
  *
  * @return {Object}
  */
  toJSON = () => ({
    id: this.id,
    name: this.name,
    email: this.email,
    phone: this.phone,
    password: this.password
  })
}


export default new UserStore();
