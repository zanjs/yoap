import { observable } from 'mobx';

export default class TodoModel {
  store;
  id;
  @observable value;
  @observable completed;

  constructor(store, id, value, completed) {
    this.store = store;
    this.id = id;
    this.value = value;
    this.completed = completed;
  }

  toggle = () => {
    this.completed = !this.completed;
  };

  complete = () => this.completed = true;

  destroy = () => {
    this.store.data.remove(this);
  };

  setValue(value) {
    this.value = value;
  }

  toJSON() {
    return {
      id: this.id,
      value: this.value,
      completed: this.completed
    };
  }

  static fromJS(store, object) {
    return new TodoModel(store, object.id, object.value, object.completed);
  }
}
