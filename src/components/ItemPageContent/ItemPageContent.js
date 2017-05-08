import React, { Component } from 'react'
import {
  InputClean, Content, ItemPageInfoTitle,
  ItemPageInfoEditIcon
} from 'components'
import { editPageConfig as config } from 'config'
import s from './ItemPageContent.sass'

const placeholder =
  'Опишите ваше объявление, чем оно может понравиться пользователю. ' +
  '\nПожалуйста, не дублируйте параметры квартиры в описании.'

const ItemPageContent = ({children, edit, onChange}) => {
  return (
    <div className={s.wrapper}>
      <ItemPageInfoTitle title="Описание"
                         className={edit && ItemPageInfoEditIcon.wrapperClassName}>
        {edit && <ItemPageInfoEditIcon />}
      </ItemPageInfoTitle>
      <Content className={!edit && s.noselect} nooffsets lightColor>
        {edit ? <InputClean placeholder={placeholder} tag="textarea"
                            maxLength={config.maxContentLength}
                            onChange={onChange}>
          {children}
        </InputClean> : children}
      </Content>
    </div>
  )
};

export default ItemPageContent;
