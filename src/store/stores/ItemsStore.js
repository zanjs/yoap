import { observable, computed, reaction } from 'mobx'
import { localStore } from 'helpers'
import { store as config } from 'constants'
import { getItems } from 'api'
import { ItemModel } from 'models'


class ItemsStore {
  storeName = config.items;
  @observable data = [];

  constructor() {
    const data = localStore.get(this.storeName);

    if (data) {
      this.fromJSON(data);
    }

    this.fetchItems(
      this.fromJSON
    );

    this.subscribeToLocalStorage();
  }

  fetchItems = cb => getItems().then(resp => cb(resp.json()));

  createNew = data => {
    const validatedData = this.validate(data);

    if (validatedData) {

    }
  };

  validate = data => {

  };

  clearCompleted = () => {
    this.data = this.data.filter(
      todo => !todo.completed
    );
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
      if (item.id === data.id) {
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
  fromJSON = data => {
    console.log(data);
    return data && data.forEach && data.forEach(item => this.add(item));
  }


  subscribeToLocalStorage = () => reaction(
    // parse data to json
    () => this.toJSON(),

    // save to the local store
    data => localStore.set(this.storeName, data)
  );
}



window.model = ItemModel;
export default window.items = new ItemsStore();
