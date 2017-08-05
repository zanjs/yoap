import { observable, computed, reaction, action } from 'mobx'
import { extend, isEmpty, fetch, localStore, checkStatus, parsePromiseJSON } from 'helpers'
import { PaymentModel } from 'models'
import { syncPaymentApi, sendPayment } from 'api'
import { store } from 'store'


class PaymentStore {
  storeName = '@payment/STORE';
  @observable errors = {};
  @observable data = [];
  @observable history = [];

  @observable isFetching = false;
  @observable isError = false;

  constructor() {
    const store = localStore.get(this.storeName) || {};

    if (store.data && store.data.length > 0) {
      extend(this, store);
    }

    this.subscribeToLocalStore();
  }

  @action cleanError = () => this.isError = false;

  @action createPayment = data => {
    this.data.push(
      PaymentModel.fromJSON(this, data)
    );

    return this.data[this.data.length - 1];
  };

  getPayment = id => this.data.find(it => it.id === id);
  replacePayment = (data) => {
    const { id } = data;
    let payment;
    const newData = this.data.map(it => {
      if (it.id !== id) {
        return it;
      }

      if (data.store) {
        return data;
      }

      return (payment = PaymentModel.fromJSON(this, data))
    });

    this.data.replace(newData);

    return payment;
  };

  @action PayForSubscription = (sub, payData = {}) => {
    const { title, sum } = sub;
    const payment = this.createPayment({
      title: `Доступ к базе YOAP: ${title}`,
      sum, ...payData
    });

    this.isFetching = true;
    return this.SyncPayment(payment.id)
      .then(paymentData => {
        const id = paymentData._id;
        const subData = sub.toJSON ? sub.toJSON() : sub;
        const data = {
          ...subData,
          paymentId: id,
        };

        return store.subscription.Sync(data)
      })
      .then(() => {
        this.isFetching = false;
        return this.Pay(payment.id)
      })
      .catch(err => {
        console.log(this.isError = err)
      })
  };

  @action SyncPayment = id => {
    const payment = this.getPayment(id);
    const isValid = payment.isValid();

    if (!payment || !isValid) {
      return new Promise((resolve, reject) => {
        if (!isValid)
          return reject(this.errors.message = payment.error);

        return reject(this.errors.message = 'Такого платежа нет');
      })
    }

    const data = payment.toJSON();

    return syncPaymentApi(data)
      .then(checkStatus)
      .then(parsePromiseJSON)
      .then(res => {
        const data = res.data;
        const __payment = this.replacePayment(data);

        return new Promise(resolve => (
          resolve(__payment)
        ))
      })
      .catch(err => console.log(window.err = err))
  };

  @action Pay = id => {
    const payment = this.getPayment(id);
    const isValid = payment.isValid();

    if (!payment || !isValid) {
      if (!isValid)
        return this.errors.message = payment.error;

      return this.errors.message = 'Такого платежа нет';
    }

    const data = payment.toJSON();

    return sendPayment(data)
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
