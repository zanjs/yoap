import React, { Component } from 'react'
import {
  UserCustomAddressItem,
  ItemPageInfoTitle,
  FlexGrid, Content
} from 'components'
import s from './UserCustomAddress.sass'

const UserCustomAddress = props => {
  const {
    data, editData, isEdit, onControlClick,
    onTitleChange, onAddressChange
  } = props;
  return (
    <div className={s.wrapper}>
      <ItemPageInfoTitle title="Мои адреса">
        <Content className={s.title}
                 onClick={onControlClick}
                 nooffsets gray>
          {isEdit ? 'Сохранить' : 'Изменить'}
        </Content>
      </ItemPageInfoTitle>
      <FlexGrid justify="start" align="start" wrap="true">
        {data && data.map((item, key) => (
          <UserCustomAddressItem className={s.item}
                                 key={key} {...item} />
        ))}
        {isEdit && <UserCustomAddressItem onTitleChange={onTitleChange} edit
                                          onAddressChange={onAddressChange}
                                          className={s.item} {...editData}/>}
      </FlexGrid>
    </div>
  )
};

export default UserCustomAddress;

