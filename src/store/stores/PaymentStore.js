import { observable, computed, reaction, action } from 'mobx'
import { extend, isEmpty, fetch, localStore, checkStatus, parsePromiseJSON } from 'helpers'
import { PaymentModel } from 'models'
import { syncPaymentApi, sendPayment } from 'api'
//import { store } from 'store'


class PaymentStore {
  storeName = '@payment/STORE';
  @observable errors = {};
  @observable data = [];
  @observable history = [];

  constructor() {
    const store = localStore.get(this.storeName) || {};

    if (store.data && store.data.length > 0) {
      extend(this, store);
    }

    this.subscribeToLocalStore();
  }

  @action createPayment = data => {
    return this.data.push(
      PaymentModel.fromJSON(this, data)
    );
  };

  getPayment = id => this.data.find(it => it.id === id);

  @action Pay = id => {
    const payment = this.getPayment(id);

    if (!payment || !payment.isValid()) {
      return this.errors.message = 'Такого платежа нет';
    }

    const data = payment.toJSON();

    syncPaymentApi(data)
      .then(checkStatus)
      .then(parsePromiseJSON)
      .then(() => {
        return sendPayment(data)
      })
      .then(res => {
        console.log(window.res = res);
        console.log(res.status);
        console.log(res.redirect);

        res.json().then(data => {
          console.log((window.data = data))
        })
      })
      .catch(err => console.log(window.err = err))
  };

  subscribeToLocalStore = () => reaction(
    // parse data to json
    () => this.toJSON(),

    // save to the local store
    data => {
      localStore.set(this.storeName, data)
    }
  );

  toJSON = () => {
    return {
      data: this.data,
      history: this.history
    };
  }
}

export default new PaymentStore();
