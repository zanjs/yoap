import { jwtStorageName } from 'config'
import localStore from './localStore'

export default function getToken() {
  return localStore.get(jwtStorageName);
}
