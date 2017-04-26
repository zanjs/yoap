import {
  observable, computed, reaction,
  action, observer, autorun
} from 'mobx'
import { localStore, noop, isEmpty } from 'helpers'
import { store as config, statusTypes } from 'constants'
import {
  getItems, saveItem, getItem,
  updateItem as updateItemApi,
  fetchFilteredItems as fetchFilteredItemsApi,
  toggleFeaturedItem as toggleFeaturedItemApi
} from 'api'
import { ItemModel } from 'models'
import { store } from 'store'


class ItemsStore {
  @observable data = [];
  @observable manage = [];
  @observable users = [];
  @observable featured = [];
  @observable filtered = [];

  @observable isError = false;
  @observable isFetching = false;

  storeName = config.items;

  constructor() {
    // const data = localStore.get(this.storeName);
    //
    // if (data) {
    //   this.fromJSON(data);
    // }
    //
    this.fetchItems();
    //
    // this.subscribeToLocalStorage();
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
    const { objects, price, squares } = response;
    this.fromJSON(objects);
    price && store.filter.setPrice(price);
    squares && store.filter.setSquares(squares);
    this.isFetching = false;
    return response.data;
  };
  userItemsResponse = response => {
    this.fromJSON(response.objects, 'users');
    this.isFetching = false;

    return response.objects;
  };
  userFeaturedResponse = response => {
    const { objects } = data;
    if (objects && objects.length) {
      this.fromJSON(objects, 'featured', true);
    }
    this.isFetching = false;

    return response.data;
  };
  manageItemsResponse = response => {
    this.fromJSON(response.objects, 'manage');
    this.isFetching = false;

    return response.data;
  };
  filterItemsResponse = response => {
    const { objects, price, squares } = response;
    this.fromJSON(objects, 'filtered', true);
    this.fromJSON(objects, 'data', true);
    price && store.filter.setPrice(price);
    squares && store.filter.setSquares(squares);
    this.isFetching = false;
    return response.objects;
  };
  createItemResponse = response => {
    let item;
    if (response.data && !response.data.ok) {
      item = [response.data];

      this.fromJSON(item, 'users');
    }

    this.isFetching = false;

    return item || response.data;
  };
  updateItemResponse = response => {
    let item;
    if (response.data) {
      item = [response.data];

      this.fromJSON(item, 'manage');
    }

    this.isFetching = false;

    return item || response.data;
  };
  findByResponse = col => response => {
    this.fromJSON(response.data, col);
    this.isFetching = false;

    return response.data;
  };
  toggleFeaturedItemResponse = response => {
    // TODO: remove featured items from collection!
    // maybe server will send updated featured items ?
    let item;
    if (response.data && !response.data.ok) {
      item = [response.data];
    }

    this.isFetching = false;

    return item || response.data;
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
  fetchFilteredItems = (filters, cb = noop) => {
    if (isEmpty(filters))
      return null;

    this.isFetching = true;
    return fetchFilteredItemsApi(filters)
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(this.filterItemsResponse)
      .then(cb)
      .catch(this.errorHandler);
  }
  fetchUserItems = (ids, cb = noop) => {
    if (!ids || !ids.length)
      return;

    this.isFetching = true;
    getItems({ids, noStatus: true})
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(this.userItemsResponse)
      .then(cb)
      .catch(this.errorHandler);
  };
  fetchUserFeatured = (ids, cb = noop) => {
    if (!ids || !ids.length)
      return;

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
    const item = this
      .newModel(null, data)
      .toJSON();

    saveItem(item)
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(this.createItemResponse)
      .then(cb)
      .catch(this.errorHandler);
  };
  updateItem = (id, update, cb = noop) => {
    this.isFetching = true;

    updateItemApi({id, update})
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(this.updateItemResponse)
      .then(cb)
      .catch(this.errorHandler);
  };
  toggleFeaturedItem = (id, cb = noop) => {
    const userId = store.user.id || store.user._id;

    if (!userId || !id)
      return;

    toggleFeaturedItemApi({user: userId, id})
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(this.toggleFeaturedItemResponse)
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
  getAllManageItems = cb => {
    this.isFetching = true;
    const statuses = statusTypes.types
      .map(item => item.id)
      .filter((item, index) => index !== 1);

    getItems({statuses})
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(this.manageItemsResponse)
      .then(cb)
      .catch(this.errorHandler);
  };

  removeAll = f => {
    this.data.replace([]);
  };

  newModel = (col, data) => ItemModel.fromJS(
    col, data
  );

  add = (data, collection = 'data', noCheck) => {
    const col = this[collection];

    if (!noCheck && col.length) {
      let isExist = null;

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
    }

    col.push(
      this.newModel(col, data)
    );
  };
  replace = (data, col = 'data') => {
    return this[col].replace(data);
  };
  find = (query, col = 'data') => {
    return this[col].find(query)
  };
  toJSON = () => this.data.map(todo => todo.toJSON());

  @action fromJSON = (data, collection = 'data', toReplace) => {
    if (data && data.forEach) {
      let shouldReplace = !!toReplace;
      if (toReplace || collection !== 'data') {
        this[collection].replace([]);
        shouldReplace = true;
      }

      data.forEach(item => {
        this.add(item, collection, shouldReplace);
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
