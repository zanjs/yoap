import { observable, computed } from 'mobx'

export default class UserModel {
  @observable _id;
  @computed id() {
    return this._id;
  }
  set id(id) {
    return this._id = id;
  }

  @observable name;
  @observable phone;
  @observable email;

  @observable editedAt;
  @observable createdAt;
  @observable visits;

  @observable isDeleted;
  @observable isDummy;


  @observable banned;
  @observable verified;

  @observable featured = [];
  @observable objects = [];

  constructor(store, data) {
    this.store = store;
    this.setData(data);
  }

  setData = data => {
    for (let prop in data) {
      const value = data[prop];
      if (prop === 'featured' || prop === 'objects') {
        this[prop].replace(value);
        continue;
      }

      this[prop] = value;
    };
  }

  static fromJSON = (store, data) => {
    return new UserModel(store, data);
  }
  toJSON = () => {
    const {
      _id, id, phone, name, email,
      editedAt, createdAt, visits,
      isDeleted, isDummy,
      banned, verified,
      objects, featured
    } = this;

    return {
      _id, id, phone, name, email,
      editedAt, createdAt, visits,
      isDeleted, isDummy,
      banned, verified,
      objects, featured
    }
  }
}
