import React, { Component } from 'react'
import {
  Title, Content, InputClean,
  ItemPageInfoTitle, ItemPageInfoEditIcon
} from 'components'
import { classNames } from 'helpers'
import { editPageConfig as config } from 'config'
import s from './ItemPageTitle.sass'

const ItemPageTitle = ({edit, children, id, status, statusContent, onChange}) => {
  return (
    <div className={s.wrapper}>
      <ItemPageInfoTitle title={id != null && `Объявление №${id}`}>
        {statusContent &&
          <Content nooffsets className={s.status}>
            {statusContent}
          </Content>
        }
        {!statusContent && status &&
         <Content nooffsets style={status.color && {color: status.color}}>
           {status.name || status}
         </Content>
        }
      </ItemPageInfoTitle>
      <Title size="3" light
             className={classNames(s.title, edit && ItemPageInfoEditIcon.wrapperClassName)}>
        {edit && <ItemPageInfoEditIcon />}
        {edit ?
          <InputClean placeholder="Введите заголовок"
                      maxLength={config.maxTitleLength}
                      onChange={onChange}>
            {children}
          </InputClean> :

          children
        }
      </Title>
    </div>
  )
};

export default ItemPageTitle;

