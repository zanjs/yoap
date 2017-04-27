import { Item } from 'models'

export default function getMaxItemOrder() {
  let order = 0;

  return Item.find({}).then(items => {
    items.forEach(item => {
      if (item.order > order) {
        order = item.order;
      }
    })

    return order
  })
}
