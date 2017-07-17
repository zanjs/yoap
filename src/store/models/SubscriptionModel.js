import { observable, computed, action } from 'mobx'
import {
  SUBSCRIPTION_PENDING_STATUS,
  SUBSCRIPTION_CLOSED_STATUS,
  SUBSCRIPTION_OPENED_STATUS
} from 'constants/subscribtionConstants'
import { store } from 'store'
import { extend, createId } from 'helpers'

export default class SubscriptionModel {
  @observable _id;
  @observable id;
  @observable term;
  @observable date;
  @observable _creator;
  @observable createdAt;
  @observable sum;
  @observable openedBalance;
  @observable openAmountSum;
  @observable termBalance;
  @observable paymentId;

  @observable support = {
    navigator: true,
    featured: true,
    saveFilter: true,
    itemsEmailSubscription: true,
    bestItemsEmailSubscription: false,
    createObject: false
  };

  @observable name;
  @observable title;
  @observable about;
  @observable status = SUBSCRIPTION_PENDING_STATUS;

  @computed get isValid() {
    return this.status === SUBSCRIPTION_OPENED_STATUS;
  }

  constructor(__store, data) {
    this.store = __store;
    extend(this, {
      ...data,
      id: data.id || createId(),
      createdAt: data.createdAt || new Date(),
      _creator: data._creator || store.user._id,
      support: {
        ...this.support,
        ...data.support
      }
    });
  }

  toJSON = () => {
    const {
      support, name, title, status, term,
      _id, date, createdAt, sum, openedBalance,
      openAmountSum, termBalance, about, id, paymentId
    } = this;

    return {
      support, name, title, status, term,
      _id, date, createdAt, sum, openedBalance,
      openAmountSum, termBalance, about, id, paymentId
    }
  };

  static fromJSON = (store, data) => {
    return new SubscriptionModel(store, data)
  };
}
