import { observable, reaction } from 'mobx'
import { login as serverLogin, auth as serverAuth } from 'api'
import { extend, localStore } from 'helpers'
import { store as config } from 'config'

class UserStore {
  storeName = config.user;
  // user data
  @observable name;
  @observable email;
  @observable phone;
  @observable password;

  // auth states
  @observable isFetching = false;
  @observable isAuthorized = false;
  @observable isError = false;

  constructor() {
    this.restoreValues();
    this.subscribeToLocalStore();
  }

  responseHandler = (isError) => {
    return () => {
      console.log('isError', isError);

      this.isAuthorized = !isError;
      this.isError = isError;
      this.isFetching = false;
    }
  };

  login = () => {
    this.isFetching = true;

    return serverLogin(this.toJSON())
      .then(this.responseHandler(false))
      .catch(this.responseHandler('404 Not Found'));
  };

  signup = () => {
    this.isFetching = true;

    return serverAuth(this.toJSON())
      .then(this.responseHandler(false))
      .catch(this.responseHandler('404 Not Found'));
  };

  subscribeToLocalStore = () => reaction(
    // parse data to json
    () => this.toJSON(),

    // save to the local store
    data => {
      console.log('saving to store', JSON.stringify(data));

      localStore.set(this.storeName, data)
    }
  );

  saveValues = values => {
    extend(this, values);
  };

  restoreValues = () => {
    const data = localStore.get(this.storeName);

    if (data) {
      return extend(this, data);
    }
  };

  checkAuth = () => {
    if (!this.isAuthorized) return false;
    const isAuth = this.name && this.email && this.phone && this.password;

    return isAuth || (this.isAuthorized = false);
  };

  toJSON = () => ({
    name: this.name,
    email: this.email,
    phone: this.phone,
    password: this.password,
    isAuthorized: this.checkAuth()
  })
}


export default new UserStore();
