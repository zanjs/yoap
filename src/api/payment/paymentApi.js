import {
  paymentSyncApi as paymentSyncUrl,
  paymentSystem
} from 'constants/urls'
import { getHeaders, fetch } from 'helpers'

export const syncPaymentApi = data => {
  return fetch(paymentSyncUrl, {
    ...getHeaders(),
    method: 'POST',
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
    formcomment: __data.title,
    target: __data.target || __data.title
  };

  const formId = 'payment-fake-form';
  const form = document.createElement('form');
  form.style.display = 'none';
  form.setAttribute('id', formId);
  form.setAttribute('method', 'POST');
  form.setAttribute('action', paymentSystem);
  form.innerHTML = Object.keys(data).map(prop => (
    `<input type="hidden" name="${prop}" value="${data[prop]}"/>`
  ));

  document.body.appendChild(form);
  const formDom = document.querySelector(`#${formId}`);

  formDom.submit();
};
