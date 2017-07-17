import DeviceStore from 'stores/DeviceStore'
import DomStore from 'stores/DomStore'
import UserStore from 'stores/UserStore'
import ItemsStore from 'stores/ItemsStore'
import FilterStore from 'stores/FilterStore'
import ThemesStore from 'stores/ThemesStore'
import ManageItemStore from 'stores/ManageItemStore'
import UsersStore from 'stores/UsersStore'
import DashboardStore from 'stores/DashboardStore'
import PaymentStore from 'stores/PaymentStore'
import SubscriptionStore from 'stores/SubscriptionStore'


export const store = window.store = {
  device: DeviceStore,
  dom: DomStore,
  user: UserStore,
  items: ItemsStore,
  filter: FilterStore,
  theme: ThemesStore,
  manage: ManageItemStore,
  users: UsersStore,
  dash: DashboardStore,
  payment: PaymentStore,
  subscription: SubscriptionStore
};
