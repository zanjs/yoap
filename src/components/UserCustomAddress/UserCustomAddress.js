import React, { Component } from 'react'
import {
  UserCustomAddressItem,
  ItemPageInfoTitle,
  FlexGrid, Content
} from 'components'
import s from './UserCustomAddress.sass'

const UserCustomAddress = ({data}) => {
  return (
    <div className={s.wrapper}>
      <ItemPageInfoTitle title="Мои адреса">
        <Content nooffsets gray>Изменить</Content>
      </ItemPageInfoTitle>
      <FlexGrid justify="start" align="start" wrap="true">
        {data && data.map((item, key) => (
          <UserCustomAddressItem className={s.item} key={key} {...item} />
        ))}
      </FlexGrid>
    </div>
  )
};

export default UserCustomAddress;

