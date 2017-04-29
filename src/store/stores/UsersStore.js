import { observable, computed, action } from 'mobx'
import { UserModel } from 'models'
import {
  createDummyUserApi, updateDummyUserApi,
  getUsersApi
} from 'api'
import { noop } from 'helpers'

class UsersStore {
  @observable current = {};
  @observable dummies = [];
  @observable users = [];

  @observable isFetching = false;
  @observable isError = false;
  @observable errorMessage = false;

  checkStatus = (res) => {
    if (res.status >= 200 && res.status < 300) {
      return res
    } else {
      const error = new Error(res.statusText);
      error.response = res;
      throw error
    }
  };
  responseHandler = response => {
    response.data && this.fromJSON(response.data);

    this.isFetching = false;
    this.isError = false;

    return response.data;
  };
  errorHandler = response => {
    const data = response.response || response;

    if (data.json) {
      return data.json().then(data => {
        this.isFetching = false;

        if (data.errors) {
          this.isError = data.errors;
        }
        if (data.message) {
          this.errorMessage = data.message.errmsg ||  data.message;
        }
      })
    }

    this.isError = data;
    this.isFetching = false;
  };
  parseJSON = res => res.json();

  @action createUser = (data, cb = noop) => {
    this.isFetching = true;
    this.isError = false;

    createDummyUserApi(data)
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(this.responseHandler)
      .then(cb)
      .catch(this.errorHandler)
  };
  @action updateUser = (id, data, cb = noop) => {
    this.isFetching = true;
    this.isError = false;

    updateDummyUserApi(id, data)
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(this.responseHandler)
      .then(cb)
      .catch(this.errorHandler)
  };
  //@action deleteUser = id => {};
  @action fetchUsers = (cb = noop) => {
    this.isFetching = true;
    this.isError = false;

    getUsersApi()
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(this.responseHandler)
      .then(cb)
      .catch(this.errorHandler)
  };

  @action updateCurrent = data => {
    this.current = {
      ...this.current,
      ...data
    };
  }

  find = cb => {
    const dataCollection = this.users.find(cb);

    if (dataCollection) {
      return dataCollection;
    }

    return this.dummies.find(cb);
  }
  fromJSON = data => {
    if (data.length != null) {
      return this.fromJSONToCollection(data);
    }

    if (data.dummies) {
      this.fromJSONToCollection(data.dummies, 'dummies');
    }
    if (data.users) {
      this.fromJSONToCollection(data.users);
    }
  }
  fromJSONToCollection = (data, collection = 'users') => {
    const newCollection = data.map(item => UserModel.fromJSON(this, item));
    return this[collection].replace(newCollection);
  };
}

export default new UsersStore()
