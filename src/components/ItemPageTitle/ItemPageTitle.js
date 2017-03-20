import React, { Component } from 'react'
import {
  Title, Content, InputClean,
  ItemPageInfoTitle, ItemPageInfoEditIcon,
  Select
} from 'components'
import { statusTypes } from 'constants'
import { classNames } from 'helpers'
import s from './ItemPageTitle.sass'

const types = statusTypes.types.map(
  item => item.name
);

const ItemPageTitle = ({edit, children, id, status, onChange}) => {
  return (
    <div className={s.wrapper}>
      <ItemPageInfoTitle title={`Объявление №${id}`}>

        {(edit || status) &&
          <Content nooffsets className={s.status}>
            {!edit ? status :
              <Select inherit values={types}/>
            }
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

