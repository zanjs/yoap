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
  if (name) {
    return item.name.toLowerCase() === name.toLowerCase();
  }
  if (id) {
    return item.id.toLowerCase() === id.toLowerCase();
  }
};

const ItemPageType = ({name, id, edit, onChange}) => {
  const wrapperClassName = classNames(
    s.wrapper, edit && ItemPageInfoEditIcon.wrapperClassName
  );
  return (
    <div className={wrapperClassName}>
      <ItemPageInfoTitle title="Тип объекта" />
      {edit && <ItemPageInfoEditIcon />}
      <FlexGrid justify="space-between" align="center">
        {types.map(item => (
          <Content size="2" light className={
            classNames(
              s.item, edit && s.item_edit,isActive(item, name, id) && s.item_active
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

