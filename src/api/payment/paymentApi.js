import {
  paymentSyncApi as paymentSyncUrl,
  paymentSystem
} from 'constants/urls'
import { getHeaders, fetch } from 'helpers'

export const syncPaymentApi = data => {
  return new Promise(resolve => resolve({
    status: 200,
    json: () => {}
  }));

  fetch(paymentSyncUrl, {
    ...getHeaders(),
    method: 'get',
    body: JSON.stringify({data})
  });
};

export const sendPayment = __data => {
  const body = new FormData();
  const data = {
    paymentType: __data.paymentType,
    receiver: __data.receiver,
    'short-dest': __data.title,
    'quickpay-form': __data.quickpay_form,
    sum: __data.sum,
    targets: __data.targets
  };

  Object.keys(data).forEach(prop => {
    const val = data[prop];
    body.append(prop, val);
  });

  return fetch(paymentSystem, {
    method: 'POST', body,
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
};
