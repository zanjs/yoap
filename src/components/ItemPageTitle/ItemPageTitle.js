import React, { Component } from 'react'
import {
  Title, Content, InputClean,
  ItemPageInfoTitle, ItemPageInfoEditIcon
} from 'components'
import { classNames } from 'helpers'
import s from './ItemPageTitle.sass'


const ItemPageTitle = ({edit, children, id, status, onChange}) => {
  return (
    <div className={s.wrapper}>
      <ItemPageInfoTitle title={`Объявление №${id}`}>
        {status &&
          <Content nooffsets className={s.status}>
            {status}
          </Content>
        }
      </ItemPageInfoTitle>
      <Title size="3" light
             className={classNames(s.title, edit && ItemPageInfoEditIcon.wrapperClassName)}>
        {edit && <ItemPageInfoEditIcon />}
        {edit ?
          <InputClean placeholder="Введите заголовок" onChange={onChange}>
            {children}
          </InputClean> :

          children
        }
      </Title>
    </div>
  )
};

export default ItemPageTitle;

