import TodoStore from 'stores/TodoStore'
import DeviceStore from 'stores/DeviceStore'
import DomStore from 'stores/DomStore'
import UserStore from 'stores/UserStore'
import ItemsStore from 'stores/ItemsStore'


export const store = window.store = {
  todo: TodoStore,
  device: DeviceStore,
  dom: DomStore,
  user: UserStore,
  items: ItemsStore
};
