/**
 * UserStore module.
 * @module stores/UserStore
 * @see store
 */
import { observable, reaction } from 'mobx'
import { login as serverLogin, auth as serverAuth } from 'api'
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

  /**
   * Handler response for server subscription.
   *
   * @param {string|boolean} isError
   * @return {Function}
   */
  responseHandler = isError => {
    return () => {
      this.isAuthorized = !isError;
      this.isError = isError;
      this.isFetching = false;
    }
  };

  login = () => {
    this.isFetching = true;

    return serverLogin(this.toJSON())
      .then(this.responseHandler(false))
      .catch(this.responseHandler('404 Not Found'));
  };

  signup = () => {
    this.isFetching = true;

    return serverAuth(this.toJSON())
      .then(this.responseHandler(false))
      .catch(this.responseHandler('404 Not Found'));
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
    const isAuth = this.name && this.email && this.phone && this.password;

    return isAuth || (this.isAuthorized = false);
  };

  /**
  * Generate a JSON from the data.
  *
  * @return {Object}
  */
  toJSON = () => ({
    name: this.name,
    email: this.email,
    phone: this.phone,
    password: this.password,
    isAuthorized: this.checkAuth()
  })
}


export default new UserStore();
