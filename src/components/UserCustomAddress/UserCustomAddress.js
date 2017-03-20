import React, { Component } from 'react'
import {
  UserCustomAddressItem,
  ItemPageInfoTitle,
  ItemPageInfoEditIcon,
  FlexGrid
} from 'components'
import s from './UserCustomAddress.sass'

const data = [
  {
    title: 'Работа',
    address: 'Санкт-Петербург, Лиговский пр. 76а, 190000'
  },
  {
    title: 'Учеба',
    address: 'Санкт-Петербург, ул. Большая морская, 67, 190000'
  }
];

const UserCustomAddress = () => {
  const { wrapperClassName } = ItemPageInfoEditIcon;
  return (
    <div className={s.wrapper}>
      <ItemPageInfoTitle className={wrapperClassName} title="Мои адреса">
        <ItemPageInfoEditIcon />
      </ItemPageInfoTitle>
      <FlexGrid justify="start" align="start">
        {data.map((item, key) => (
          <UserCustomAddressItem key={key} {...item} />
        ))}
      </FlexGrid>
    </div>
  )
};

export default UserCustomAddress;

