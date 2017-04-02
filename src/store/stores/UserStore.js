/**
 * UserStore module.
 * @module stores/UserStore
 * @see store
 */
import { observable, reaction, computed } from 'mobx'
import { login as serverLogin, signup as serverSignup } from 'api'
import { extend, localStore, noop } from 'helpers'
import { store as config } from 'constants'
import { store } from 'store'

/**
 * UserStore class.
 * It contains user auth, stores his data (including his items).
 *
 * @class
 */
class UserStore {
  storeName = config.user;

  // user data
  @observable _id;
  @observable name;
  @observable email;
  @observable phone;
  @observable password;
  @observable isAdmin;

  @observable image;
  @observable visits;
  @observable lastVisit;
  @observable isDeleted;
  @observable createdAt;
  @observable verified;

  @observable _objects;
  set objects(d) {
    this._objects = d;
  }
  @computed get objects() {
    if (!this._objects)
      return null;

    this.isItemsFetching = true;
    store.items.fetchUserItems(
      this._objects, () => {
        this.isItemsFetching = false;
      }
    );

    return store.items.users;
  }

  @observable _featured;
  set featured(d) {
    this._featured = d;
  }
  @computed get featured() {
    if (!this._featured)
      return null;

    this.isFeaturedFetching = true;
    store.items.fetchUserFeatured(
      this._featured, () => {
        this.isFeaturedFetching = false;
      }
    );

    return store.items.users;
  }

  // item states
  @observable isItemsFetching = false;
  @observable isFeaturedFetching = false;

  // auth states
  @observable isFetching = false;
  @observable isError = false;
  get isAuthorized() {
    return !!(this._id || this.id)
  }

  constructor() {
    this.restoreValues();
    this.subscribeToLocalStore();
  }

  checkStatus = (res) => {
    if (res.status >= 200 && res.status < 300) {
      return res
    } else {
      const error = new Error(res.statusText);
      error.response = res;
      throw error
    }
  };
  parseJSON = res => res.json();

  /**
   * Handler response for server subscription.
   *
   * @param {Object} response
   * @return {Function}
   */
  responseHandler = response => {
    this.isError = false;
    this.isFetching = false;

    extend(this, response.data);
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

    this.isError = data;
    this.isFetching = false;
  };

  login = (cb = noop) => {
    this.isFetching = true;
    const { email, phone, password } = this.toJSON();
    const data = {
      ...(email ? {email} : {phone}),
      password
    };

    return serverLogin(data)
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(this.responseHandler)
      .then(cb)
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

  update = cb => {
    if ((this.email || this.phone) && this.password) {
      return this.login(cb);
    }
  };

  subscribeToLocalStore = () => reaction(
    // parse data to json
    () => this.toJSON(),

    // save to the local store
    data => {
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
      extend(this, data);
      this.update();
    }
  };

  /**
  * Generate a JSON from the data.
  *
  * @return {Object}
  */
  toJSON = () => ({
    id: this.id || this._id || '',
    name: this.name,
    email: this.email,
    phone: this.phone,
    password: this.password,
    // _featured: this._featured,
    // _objects: this._objects
  })
}


export default new UserStore();
