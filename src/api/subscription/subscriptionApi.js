import {
  subscriptionSyncApi as subscriptionSyncUrl
} from 'constants/urls'
import { getHeaders, fetch } from 'helpers'

export const syncSubscriptionApi = data => {
  return fetch(subscriptionSyncUrl, {
    ...getHeaders(),
    method: 'POST',
    body: JSON.stringify({data})
  });
};
