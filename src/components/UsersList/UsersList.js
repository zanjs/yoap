import React, { Component } from 'react'
import { FlexGrid, Content } from 'components'
import { classNames } from 'helpers'
import s from './UsersList.sass'

const fakeItem = {
  name: 'Иван',
  phone: '+7 999 213 73 33',
  email: 'nikitrif@gmail.com',
  objects: [1,2,3]
};
const fakeData = [
  fakeItem,fakeItem,fakeItem,fakeItem,
  fakeItem,fakeItem,fakeItem,fakeItem
];

const UserRow = ({children, head}) => (
  <FlexGrid className={classNames(s.row, head && s.row_head)}>
    {children}
  </FlexGrid>
)
const UserRowItem = ({children}) => (
  <Content size="2" className={s.item}>{children}</Content>
)

const UsersList = ({data = fakeData}) => {
  return (
    <div className={s.wrapper}>
      <UserRow head>
        <UserRowItem>Пользователь</UserRowItem>
        <UserRowItem>Телефон</UserRowItem>
        <UserRowItem>Почта</UserRowItem>
        <UserRowItem>Объекты</UserRowItem>
      </UserRow>
      {data && data.map(({name, email, phone, objects}, key) => (
        <UserRow key={key}>
          <UserRowItem>{name || 'Без имени'}</UserRowItem>
          <UserRowItem>{phone || 'Без телефона'}</UserRowItem>
          <UserRowItem>{email || 'Без почты'}</UserRowItem>
          <UserRowItem>{`${objects.length} объектов`}</UserRowItem>
        </UserRow>
      ))}
    </div>
  )
};

export default UsersList;

