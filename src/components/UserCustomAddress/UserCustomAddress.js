import React, { Component } from 'react'
import {
  UserCustomAddressItem,
  ItemPageInfoTitle,
  FlexGrid, Content,
  Svg
} from 'components'
import s from './UserCustomAddress.sass'

import addIcon from 'icons/ui/add-flat.svg'
const addTitle = 'Добавьте новый пункт, чтобы мы могли показать вам расстояние от него и время';

const UserCustomAddress = props => {
  const {
    data, editData, isEdit, onControlClick,
    isNew, onTitleChange, onAddressChange,
    onAddNew, onRemove
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
                                 onTitleChange={e => onTitleChange(e, key)}
                                 onAddressChange={e => onAddressChange(e, key)}
                                 edit={isEdit} onRemove={() => onRemove(key)}
                                 key={key} {...item} />
        ))}
        {isEdit && !isNew && <div title={addTitle} className={s.item}>
          <Svg onClick={onAddNew} className={s.icon} src={addIcon}/>
        </div>}
        {isNew && isEdit &&
        <UserCustomAddressItem onTitleChange={onTitleChange} edit noIcon
                               onAddressChange={onAddressChange} noLimit
                               className={s.item} {...editData}/>}
      </FlexGrid>
    </div>
  )
};

export default UserCustomAddress;

