import React, { Component } from 'react'
import {
  Title, Content, InputClean,
  ItemPageInfoTitle, ItemPageInfoEditIcon,
  Select
} from 'components'
import { statusTypes } from 'constants'
import { classNames } from 'helpers'
import s from './ItemPageTitle.sass'

const ItemPageTitle = ({edit, children, id, statusContent, onChange}) => {
  return (
    <div className={s.wrapper}>
      <ItemPageInfoTitle title={id != null && `Объявление №${id}`}>
        {statusContent &&
          <Content nooffsets className={s.status}>
            {statusContent}
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

