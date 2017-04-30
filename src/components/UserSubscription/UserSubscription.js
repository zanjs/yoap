import React from 'react'
import { observer } from 'mobx-react'
import { ItemPageInfoTitle, Content } from 'components'
import s from './UserSubscription.sass'


const UserSubscription = () => {
  return null;
  return (
    <div className={s.wrapper}>
      <ItemPageInfoTitle title="Подписка" />
      <Content nooffsets light size="3">Расширенный тариф до 21.04.17</Content>
      <Content nooffsets light size="3">Осталось 30 дней и 293 открытия</Content>
    </div>
  )
};

export default observer(UserSubscription);

