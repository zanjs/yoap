/**
 * UserStore module.
 * @module stores/UserStore
 * @see store
 */
import { observable, reaction, action, computed } from 'mobx'
import jwtDecode from 'jwt-decode'
import {
  login as serverLogin,
  signup as serverSignup,
  updateUserData as serverUpdateUserData,
  checkAuth as serverCheckAuth,
  logout as serverLogout,
  updatePassword as serverUpdatePassword,
  restorePassword as serverRestorePassword,
  verifyUser as serverVerifyUser
} from 'api'
import {
  extend, localStore, noop, isEmpty,
  captcha, getToken, findUserPosition
} from 'helpers'
import { store as config } from 'constants'
import { jwtStorageName } from 'config'
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
  get id() {
    return this._id;
  }
  set id(id) {
    this._id = id;
  }

  @observable _token;
  set token(token) {
    if (!token) {
      localStore.set(jwtStorageName, null);
      return this._token = null;
    }
    const data = jwtDecode(token)
    extend(this, data);

    localStore.set(jwtStorageName, token);
    this._token = token;
  }
  get token() {
    if (this._token) {
      return this._token;
    }

    return getToken();
  }

  @observable name;
  @observable identifier;
  @observable email;
  @observable phone;
  @observable password;
  @observable isAdmin;

  @observable image = {};
  @observable visits = [];
  @observable lastVisit;
  @observable isDeleted;
  @observable createdAt;
  @observable location = {};

  @observable verified;
  @observable banned;

  @observable notifications = [];
  @observable personalPoints = [];
  @observable isUserPage = false;
  @observable redirect = null;
  @observable isAllowed = false;

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
  @observable errorMessage = '';
  @observable message = '';
  get isAuthorized() {
    return !!this.id && !!this.token;
  }

  constructor() {
    this.getUserPosition();
    this.restoreValues();
    this.subscribeToLocalStore();
  }

  @action getUserPosition = () => {
    return findUserPosition().then(data => {
      this.location = data;

      if (this.isAuthorized) {
        this.updateUserData({
          location: data
        })
      }
    })
  }

  @action redirectWhenLogin = path => {
    this.redirect = path;
  }
  @action updateAllowed = data => this.isAllowed = data;

  has = id => {
    if (this._objects) {
      return !!this._objects.find(item => item === id);
    }

    return null;
  };

  checkStatus = (res) => {
    if (res.status >= 200 && res.status < 300) {
      return res
    } else {
      const error = new Error(res);
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
    console.log(response.data);

    extend(this, response.data);
  };

  errorHandler = response => {
    const data = response.response || response;
    console.log('error', window.res = response);

    if (data.json) {
      return data.json().then(__data => {
        let newData = {...__data};
        if (newData.errors) {
          newData = __data.errors;
        }

        if (__data.message) {
          this.errorMessage = __data.message;
        }

        this.isError = newData;
        this.isFetching = false;
      })
    }

    this.isError = data;
    this.isFetching = false;
  };

  checkPhone = phone => {
    if (isEmpty(phone)) {
      return false;
    }
    if (phone.indexOf('_') !== -1) {
      return false;
    }
    return true;
  }

  login = (cb = noop) => {
    if (this.isAuthorized)
      return cb();

    this.isFetching = true;
    this.errorMessage = false;
    this.isError = false;
    const { email, phone, password, location } = this.toJSON();
    const data = {
      ...(this.loginByPhone && this.checkPhone(phone) ? {phone} : {email}),
      password,
      location
    };

    return captcha().then(() => {
      return serverLogin(data)
        .then(this.checkStatus)
        .then(this.parseJSON)
        .then(this.responseHandler)
        .then(cb)
        .catch(this.errorHandler);
    })
  };
  logout = (cb = noop) => {
    this.isLogout = true;
    const deleteData = () => {
      extend(this, {
        name: '',
        identifier: '',
        password: '',
        phone: '',
        id: '',
        isAdmin: '',
        verified: false,
        banned: this.banned,
        createdAt: '',
        isDeleted: '',
        lastVisit: '',
        visits: '',
        image: '',
        objects: [],
        featured: [],
        token: null,
        personalPoints: []
      });

      store.items.users.replace([]);
      store.items.featured.replace([]);
    };

    serverLogout()
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(deleteData)
      .catch(deleteData)
  }
  signup = () => {
    this.isFetching = true;
    this.errorMessage = false;
    this.isError = false;

    return captcha().then(() => {
      return serverSignup(this.toJSON())
        .then(this.checkStatus)
        .then(this.parseJSON)
        .then(this.responseHandler)
        .catch(this.errorHandler);
    })
  };
  updateUserData = (data, cb = noop, id) => {
    if (!this.id || isEmpty(data))
      return null;

    //extend(this, data);
    let newData = {
      data: {
        ...data,
        location: data.location || this.location
      },
      id: id || this.id
    };

    return serverUpdateUserData(newData)
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(this.responseHandler)
      .then(cb)
      .catch(this.errorHandler);
  }
  update = cb => {
    if (!this.isAuthorized)
      return;

    return serverCheckAuth()
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(res => {
        if (!res.success) {
          console.log('will logout');
          this.logout();
        }

        if (res.data.token) {
          this.token = res.data.token;
        }

        return res;
      })
      .then(cb)
      .catch(err => {
        this.logout();

        return err;
      })
  };

  restorePassword = email => {
    if (isEmpty(email))
      return null;

    this.isFetching = true;
    this.isError = false;
    this.errorMessage = '';
    this.message = '';
    return serverRestorePassword({email})
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(res => {
        this.isFetching = false;
        if (res.success && res.message) {
          this.message = res.message;
        }
      })
      .catch(this.errorHandler)
  };
  updatePassword = data => {
    if (isEmpty(data))
      return null;

    this.isFetching = true;
    this.isError = false;
    this.errorMessage = '';
    this.message = '';
    return serverUpdatePassword(data)
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(res => {
        this.isFetching = false;
        if (res.success && res.message) {
          this.message = res.message;
        }
        if (res.token || res.data.token) {
          this.token = res.token || res.data.token;
        }
      })
      .catch(this.errorHandler)
  };
  verify = () => {
    return serverVerifyUser()
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(res => {
        this.message = res.message;
        setTimeout(() => {
          this.message = ''
        }, 3000);
      })
      .catch(this.errorHandler)
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
  saveValues = _values => {
    let values = {..._values};
    if (values.identifier) {
      const { identifier } = values;
      const __phone = parseInt(identifier.replace(/ /gi, '').replace(/\(|\)|\-/gi, ''), 10);
      const isPhone = !isNaN(__phone);

      if (!isPhone) {
        this.loginByPhone = true;
        values.email = identifier;
      } else {
        this.loginByPhone = true;
        values.phone = identifier;
      }
    }

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
    id: this.id || '',
    name: this.name,
    email: this.email,
    image: this.image,
    phone: this.phone,
    password: this.password,
    token: this.token,
    personalPoints: this.personalPoints,
    isAllowed: this.isAllowed,
    location: this.location,
    // isAuthorized: this.isAuthorized,
    isAdmin: this.isAdmin
    // _featured: this._featured,
    // _objects: this._objects
  })
}


export default new UserStore();
