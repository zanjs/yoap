import { observable, computed, reaction, action, observer } from 'mobx'
import { localStore, noop } from 'helpers'
import { store as config } from 'constants'
import { getItems, saveItem, getItem } from 'api'
import { ItemModel } from 'models'


class ItemsStore {
  @observable data = [];
  @observable users = [];
  @observable featured = [];

  @observable isError = false;
  @observable isFetching = false;

  storeName = config.items;

  constructor() {
    const data = localStore.get(this.storeName);

    if (data) {
      this.fromJSON(data);
    }

    this.fetchItems();

    this.subscribeToLocalStorage();
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

  // responses handlers
  responseHandler = response => {
    this.fromJSON(response.data);
    this.isFetching = false;

    return response.data;
  };
  userItemsResponse = response => {
    this.fromJSON(response.data, 'users');
    this.isFetching = false;

    return response.data;
  };
  userFeaturedResponse = response => {
    this.fromJSON(response.data, 'featured');
    this.isFetching = false;

    return response.data;
  };
  createItemResponse = response => {
    let item;
    if (response.data) {
      item = [response.data];

      this.fromJSON(item, 'users');
      this.fromJSON(item, 'data');
    }

    this.isFetching = false;

    return item || response.data;
  };
  findByResponse = col => response => {
    this.fromJSON(response.data, col);
    this.isFetching = false;

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

  // fetches
  fetchItems = (cb = noop) => {
    this.isFetching = true;
    getItems()
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(this.responseHandler)
      .then(cb)
      .catch(this.errorHandler);
  };
  fetchUserItems = (ids, cb = noop) => {
    this.isFetching = true;
    getItems({ids})
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(this.userItemsResponse)
      .then(cb)
      .catch(this.errorHandler);
  };
  fetchUserFeatured = (ids, cb = noop) => {
    this.isFetching = true;
    getItems({ids})
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(this.userFeaturedResponse)
      .then(cb)
      .catch(this.errorHandler);
  };
  createItem = (data, cb = noop) => {
    this.isFetching = true;
    console.log(data.user);
    const item = this
      .newModel(null, data)
      .toJSON();

    console.log('createItem dewa', item.dewa);
    console.log('createItem floors', item.floors);

    saveItem(item)
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(this.createItemResponse)
      .then(cb)
      .catch(this.errorHandler);
  };

  // selectors
  findBy = (sel, val, col, cb) => {
    const selector = item => item[sel] === val;
    let data = this.data.find(selector);

    if (!data) {
      data = this.users.find(selector);
    }

    if (!data) {
      data = this.featured.find(selector);
    }

    if (data)
      return cb(data);

    if (!data) {
      this.isFetching = true;
      getItem({[sel]: val})
        .then(this.checkStatus)
        .then(this.parseJSON)
        .then(this.findByResponse(col || 'data'))
        .then(() => {
          this.findBy(sel, val, col, cb);
        })
    }
  };
  findByLink = (link, col, cb) => {
    return this.findBy('_link', link, col, cb);
  };

  removeAll = f => {
    this.data.replace([]);
  };

  newModel = (col, data) => ItemModel.fromJS(
    col, data
  );

  add = (data, collection = 'data') => {
    let isExist = null;
    const col = this[collection];

    col.forEach((item, index) => {
      const itemId = item.id;
      const dataId = data && (data.id || data._id);

      if (dataId && itemId === dataId) {
        isExist = index;
      }
    });

    if (isExist != null) {
      return col[isExist] = this.newModel(col, data);
    }

    col.push(
      this.newModel(col, data)
    );
  };
  replace = () => {

  };
  toJSON = () => this.data.map(todo => todo.toJSON());

  @action fromJSON = (data, collection) => {
    if (data && data.forEach) {
      data.forEach(item => {
        this.add(item, collection);
      });
    }
  };


  subscribeToLocalStorage = () => reaction(
    // parse data to json
    () => this.toJSON(),

    // save to the local store
    data => localStore.set(this.storeName, data)
  );
}



window.model = ItemModel;
export default window.items = new ItemsStore();
