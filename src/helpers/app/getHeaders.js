import getToken from './getToken'
import { JSONHeaders } from 'constants/urls'

export default () => ({
  headers: {
    ...JSONHeaders.headers,
    'X-AUTH': getToken()
  }
})
