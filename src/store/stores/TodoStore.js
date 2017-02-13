import { observable, computed, reaction } from 'mobx'
import { localStore } from 'helpers'
import { store as config } from 'constants'
import { TodoModel } from 'models'


class TodoStore {
  storeName = config.todo;
  @observable data = [];
  @observable filter = '';

  @computed get filteredTodos() {
    const filter = new RegExp(this.filter.toLowerCase(), 'i');

    return this.data.filter(todo => !this.filter || filter.test(todo))
  }

  @computed get activeTodoCount() {
    return this.data.reduce(
      (sum, todo) => sum + (todo.completed ? 0 : 1),
      0
    )
  }

  @computed get completedCount() {
    return this.data.length - this.activeTodoCount;
  }

  @computed get length() {
    return this.data.length;
  }

  addTodo = (
    value, id = Date.now(),
    completed = false
  ) => this.data.push(new TodoModel(
    this,
    id,
    value,
    completed
  ));

  toggleAll = f => {
    this.data.forEach(
      todo => todo.completed = f
    );
  };

  clearCompleted = () => {
    this.data = this.data.filter(
      todo => !todo.completed
    );
  };

  removeAll = f => {
    this.data.replace([]);
  };

  toJSON = () => this.data.map(todo => todo.toJSON());
  fromJSON = (data) => data.forEach(({value, id, completed}) => this.addTodo(
    value, id, completed
  ));

  constructor() {
    const data = localStore.get(this.storeName);

    if (data) {
      this.fromJSON(data);
    }

    this.subscribeToLocalStorage();
  }

  subscribeToLocalStorage = () => reaction(
    // parse data to json
    () => this.toJSON(),

    // save to the local store
    todos => localStore.set(this.storeName, todos)
  );
}

export default new TodoStore();
