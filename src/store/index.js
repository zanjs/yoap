import DeviceStore from 'stores/DeviceStore'
import DomStore from 'stores/DomStore'
import UserStore from 'stores/UserStore'
import ItemsStore from 'stores/ItemsStore'
import FilterStore from 'stores/FilterStore'
import ThemesStore from 'stores/ThemesStore'
import ManageItemStore from 'stores/ManageItemStore'


export const store = window.store = {
  device: DeviceStore,
  dom: DomStore,
  user: UserStore,
  items: ItemsStore,
  filter: FilterStore,
  theme: ThemesStore,
  manage: ManageItemStore
};
