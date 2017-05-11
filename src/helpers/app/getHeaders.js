import getToken from './getToken'
import { JSONHeaders, authHeader } from 'constants/urls'

export default () => ({
  headers: {
    ...JSONHeaders.headers,
    [authHeader]: getToken()
  }
})
