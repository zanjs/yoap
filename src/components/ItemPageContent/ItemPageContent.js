import React, { Component } from 'react'
import {
  InputClean, Content, ItemPageInfoTitle,
  ItemPageInfoEditIcon
} from 'components'
import s from './ItemPageContent.sass'

const placeholder =
  'Опишите ваше объявление, чем оно может понравится пользователю. ' +
  'Пожалуйста, не дублируйте параметры квартиры в описании.'

const ItemPageContent = ({children, edit, onChange}) => {
  return (
    <div className={s.wrapper}>
      <ItemPageInfoTitle title="Описание"
                         className={edit && ItemPageInfoEditIcon.wrapperClassName}>
        {edit && <ItemPageInfoEditIcon />}
      </ItemPageInfoTitle>
      <Content nooffsets gray>
        {edit ? <InputClean placeholder={placeholder} tag="textarea"
                            onChange={onChange}>
            {children}
          </InputClean> : children}
      </Content>
    </div>
  )
};

export default ItemPageContent;

