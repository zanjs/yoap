import { localStore } from 'helpers'

export default (name, middleware) => {
  const { set, get } = localStore;

  const saveToStore = (state) => {
    set(name, middleware ? middleware(state) : state);

    return state;
  };

  const initialStore = get(name) || {};

  return {
    saveToStore,
    initialStore
  }
}
