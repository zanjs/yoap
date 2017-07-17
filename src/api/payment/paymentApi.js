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
  const data = {
    paymentType: __data.paymentType,
    receiver: __data.receiver,
    'short-dest': __data.title,
    'quickpay-form': __data.quickpay_form,
    sum: __data.sum,
    targets: __data.targets,
    label: __data.id,
    formcomment: __data.title
  };

  const form = document.createElement('form');
  form.setAttribute('id', __data.targets);
  form.setAttribute('method', 'POST');
  form.setAttribute('action', paymentSystem);
  form.innerHTML = Object.keys(data).map(prop => (
    `<input type="hidden" name="${prop}" value="${data[prop]}"/>`
  ));

  document.body.appendChild(form);


  console.log(window.form = document.querySelector(`#${__data.targets}`));


  // return fetch(paymentSystem, {
  //   method: 'POST', body,
  //   mode: 'no-cors',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   }
  // })
};
