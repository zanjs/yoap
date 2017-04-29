import React, { Component } from 'react'
import { observer } from 'mobx-react'
import {
  FlexGrid, Content, InputClean,
  InputCleanPhone, Button, Svg
} from 'components'
import { classNames, declination } from 'helpers'
import s from './UsersList.sass'

import editIcon from 'icons/ui/edit.svg'

const getObjectsWord = declination([
  'объект',
  'объекта',
  'объектов'
])

const UserRow = ({children, index, banned, click, head, ...rest}) => (
  <FlexGrid className={classNames(s.row, head && s.row_head, click && s.row_click, banned && s.row_banned)}
            data-index={index} {...rest}>
    {children}
  </FlexGrid>
)
const UserRowItem = ({children}) => (
  <Content size="2" className={s.item}>{children}</Content>
)
const Msg = ({children}) => (
  <span className={classNames(s.msg)}>
    {children}
  </span>
)

@observer export default class UsersList extends Component {
  render() {
    const {
      data, edit, isError, isFetching,
      onHeadClick, onChange, onSubmit, onCancel,
      newUser, onRowClick, onRowContext,
      onEditClick
    } = this.props;
    return (
      <div className={s.wrapper}>
        {!edit && <UserRow onClick={onHeadClick} click head>
          <UserRowItem>Пользователь</UserRowItem>
          <UserRowItem>Телефон</UserRowItem>
          <UserRowItem>Почта</UserRowItem>
          <UserRowItem>Объекты</UserRowItem>
        </UserRow>}
        {edit && <UserRow head>
          <UserRowItem>
            <InputClean placeholder="Пользователь" className={s.input}
                        defaultValue={newUser.name}
                        name="name" onChange={onChange}/>
            {isError && isError.name && <Msg>{isError.name}</Msg>}
          </UserRowItem>
          <UserRowItem>
            <InputCleanPhone placeholder="Телефон" className={s.input}
                             defaultValue={newUser.phone}
                             name="phone" onChange={onChange}/>
            {isError && isError.phone && <Msg>{isError.phone}</Msg>}
          </UserRowItem>
          <UserRowItem>
            <InputClean placeholder="Почта" className={s.input}
                        defaultValue={newUser.email}
                        name="email" onChange={onChange}/>
            {isError && isError.email && <Msg>{isError.email}</Msg>}
          </UserRowItem>
          <UserRowItem>
            <Button className={s.btn} onClick={onSubmit} type="green">Создать</Button>
            <Button className={s.btn} onClick={onCancel} type="pink">Отмена</Button>
          </UserRowItem>
        </UserRow>}
        {data && data.map(({name, email, phone, objects, banned}, key) => (
          <div className={s.row__wrapper} data-index={key} key={key}>
            <UserRow click onClick={onRowClick} onContextMenu={onRowContext} banned={banned}>
              <UserRowItem>{name || 'Без имени'}</UserRowItem>
              <UserRowItem>{phone || 'Без телефона'}</UserRowItem>
              <UserRowItem>{email || 'Без почты'}</UserRowItem>
              <UserRowItem>{`${objects.length} ${getObjectsWord(objects.length)}`}</UserRowItem>
            </UserRow>
            <div className={s.context}>
              {/* Edit button */}
              <Svg onClick={onEditClick} src={editIcon} className={s.icon}/>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

