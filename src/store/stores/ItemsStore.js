import { observable, computed, reaction, action, observer } from 'mobx'
import { localStore } from 'helpers'
import { store as config } from 'constants'
import { getItems } from 'api'
import { ItemModel } from 'models'


class ItemsStore {
  @observable data = [];
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

  responseHandler = response => {
    if (response.json) {
      return this.fromJSON(response.json())
    }

    this.fromJSON(response.data);
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

  fetchItems = cb => {
    getItems(data)
      // .then(this.checkStatus)
      // .then(this.parseJSON)
      .then(this.responseHandler)
      .catch(this.errorHandler);
  };


  removeAll = f => {
    this.data.replace([]);
  };

  newModel = data => ItemModel.fromJS(
    this.data,

    data
  );

  add = data => {
    let isExist = null;

    this.data.forEach((item, index) => {
      const idProp = item.id ? 'id' : '_id';

      if (
        item[idProp] && data[idProp] &&
        item[idProp] === data[idProp]
      ) {
        isExist = index;
      }
    });

    if (isExist != null) {
      return this.data[isExist] = this.newModel(data);
    }

    this.data.push(
      this.newModel(data)
    );
  };
  replace = () => {

  };
  toJSON = () => this.data.map(todo => todo.toJSON());

  @action fromJSON = data => {
    if (data && data.forEach) {
      data.forEach(item => {
        this.add(item);
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
