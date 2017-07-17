import { observable, computed, action } from 'mobx'
import { SubscriptionModel } from 'models'
import { syncSubscriptionApi } from 'api'
import { checkStatus, parsePromiseJSON, isEmpty } from 'helpers'

class SubscriptionStore {
  @observable current = {};
  @observable temp = {};
  @observable data = [
    {
      support: {
        itemsEmailSubscription: false
      },
      name: "min",
      title: "Минимальный",
      about: "Минимальный доступ к нашей базе объявлений на 3 дня с возможностью просмотра 30 номеров телефонов собственников",
      term: 3,
      sum: 290,
      openedBalance: 30,
      openAmountSum: 30,
      termBalance: 3
    },
    {
      name: "mid",
      title: "Оптимальный",
      about: "Оптимальный доступ к нашей базе объявлений на 7 дней с возможностью просмотра 100 номеров телефонов собственников",
      term: 7,
      sum: 690,
      openedBalance: 100,
      openAmountSum: 100,
      termBalance: 7
    },
    {
      name: "max",
      title: "Максимальный",
      about: "Максимальный доступ к нашей базе объявлений на 14 дней с возможностью просмотра 300 номеров телефонов собственников",
      term: 14,
      sum: 1190,
      openedBalance: 300,
      openAmountSum: 300,
      termBalance: 14,
      support: {
        createObject: true
      }
    }
  ];
  @observable history = [];

  @action Sync = __data => {
    const model = __data.store ? __data : SubscriptionModel.fromJSON(this, __data);
    const data = model.toJSON();

    return syncSubscriptionApi(data)
      .then(checkStatus)
      .then(parsePromiseJSON)
      .then(sub => {
        const cur = this.current = SubscriptionModel.fromJSON(this, sub);

        return new Promise(resolve => (
          resolve(cur)
        ))
      })
  };

  @action setTemp = item => {
    if (isEmpty(item))
      return this.temp = {};

    this.temp = SubscriptionModel.fromJSON(this, item);
  }

}

export default new SubscriptionStore();
