import { observable, computed } from 'mobx'
import { UserModel } from 'models'
import {
  createDummyUserApi, updateDummyUserApi,
  getUsersApi
} from 'api'
import { noop } from 'helpers'

export default class UsersStore {
  @observable dummies = [];
  @observable data = [];

  @observable isFetching = false;
  @observable isError = false;

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
    this.fromJSON(response);

    this.isFetching = false;
    this.isError = false;

    return response.data;
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
  parseJSON = res => res.json();

  createUser = (data, cb = noop) => {
    this.isFetching = true;
    this.isError = false;

    createDummyUserApi(data)
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(this.responseHandler)
      .then(cb)
      .catch(this.errorHandler)
  };
  updateUser = (id, data, cb = noop) => {
    this.isFetching = true;
    this.isError = false;

    updateDummyUserApi(id, data)
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(this.responseHandler)
      .then(cb)
      .catch(this.errorHandler)
  };
  fetchUsers = (cb = noop) => {
    this.isFetching = true;
    this.isError = false;

    getUsersApi()
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(this.responseHandler)
      .then(cb)
      .catch(this.errorHandler)
  };

  fromJSON = data => {
    if (data.length != null) {
      return this.fromJSONToCollection(data);
    }
    if (data.dummies) {
      this.fromJSONToCollection(data.dummies, 'dummies');
    }
    if (data.data) {
      this.fromJSONToCollection(data.data);
    }
  }

  fromJSONToCollection = (data, collection = 'data') => {
    return this[collection].replace(
      data.map(item => UserModel.fromJSON(this, data))
    );
  };
}
