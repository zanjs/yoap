import { observable, computed, action } from 'mobx'
import {
  PAYMENT_PENDING_STATUS,
  PAYMENT_SUCCESS_STATUS,
  PAYMENT_CANCEL_STATUS,
  PAYMENT_FAILURE_STATUS,
  PAYMENT_TYPE_CARD,
  PAYMENT_TYPE_BALANCE,
  PAYMENT_TYPE_YANDEX
} from 'constants/paymentConstants'
import { extend, createId, isEmpty } from 'helpers'
import { paymentReceiver } from 'config'
import { store } from 'store'


export default class PaymentModel {
  store;
  @observable id;
  @observable _id;
  @observable error;
  @observable date;
  @observable createdAt;
  @observable _creator;
  @observable title;
  @observable sum;
  @observable target;
  @observable status = PAYMENT_PENDING_STATUS;
  @observable receiver = paymentReceiver;
  @observable paymentType = PAYMENT_TYPE_CARD;
  quickpay_form = 'shop';
  @observable user = {
    _id: null, name: null, email: null
  };

  @computed get isSuccess() {
    return this.status === PAYMENT_SUCCESS_STATUS;
  }

  isValid = () => {
    const { user, sum, paymentType } = this.toJSON();

    if (isEmpty(user._id)) {
      return !(this.error = 'Вы не вошли.');
    }
    if (isEmpty(sum)) {
      return !(this.error = 'Вы не ввели сумму платежа');
    }
    if (isEmpty(paymentType)) {
      return !(this.error = 'Вы не выбрали платежную систему');
    }

    return true;
  };

  constructor(__store, data) {
    this.store = __store;
    extend(this, {
      ...data,
      date: data.date || new Date(),
      createdAt: data.date || new Date(),
      id: data.id || createId(),
      target: data.target || 'YOAP',
      user: data.user || {
        _id: store.user._id,
        name: store.user.name,
        email: store.user.email,
      }
    });
  }

  @action changeStatus = status => this.status = status;
  @action changePaymentType = type => this.paymentType = type;

  toJSON = () => {
    const {
      id, date, title, sum,
      status, isClosed, user,
      receiver, quickpay_form,
      paymentType, target
    } = this;
    return {
      id, date, title,
      sum, status, isClosed, user,
      targets: `Транзакция #${id}`,
      receiver, quickpay_form,
      paymentType, target
    };
  };
  static fromJSON = (store, data) => {
    return new PaymentModel(store, data);
  };
}
