import { divider as _divider } from 'config'

export default function generateItemTypes(type, types, divider = _divider) {
  return types.map((item, index) => ({
    name: item.ru,
    id: type + divider + index
  }))
}
