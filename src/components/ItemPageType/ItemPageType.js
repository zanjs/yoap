import React, { Component } from 'react'
import {
  Content, FlexGrid, ItemPageInfoTitle,
  ItemPageInfoEditIcon
} from 'components'
import { objectTypes } from 'constants'
import { classNames } from 'helpers'
import s from './ItemPageType.sass'

const { types } = objectTypes;

const isActive = (item, name, id) => {
  if (typeof item === 'string') {
    const val = item.toLocaleLowerCase();

    return val === id.toLowerCase() || val === name.toLowerCase();
  }
  if (name) {
    return item.name.toLowerCase() === name.toLowerCase();
  }
  if (id) {
    return item.id.toLowerCase() === id.toLowerCase();
  }
};

const ItemPageType = ({name, id, edit, className, onChange}) => {
  return (
    <div className={classNames(s.wrapper, className)}>
      <ItemPageInfoTitle title="Тип объекта"
                         className={edit && ItemPageInfoEditIcon.wrapperClassName}>
        {edit && <ItemPageInfoEditIcon />}
      </ItemPageInfoTitle>

      <FlexGrid justify="space-between" align="center">
        {types.map(item => (
          <Content size="2" light className={
            classNames(
              s.item, edit && s.item_edit, isActive(item, name, id) && s.item_active
            )} onClick={onChange && (() => onChange(item))}
               key={item.id}>
            {item.name}
          </Content>
        ))}
      </FlexGrid>
    </div>
  )
};

export default ItemPageType;

