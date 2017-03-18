import React, { Component } from 'react'
import { Content, Title, Svg } from 'components'
import s from './BaseFilterItem.sass'


const BaseFilterItem = ({title, icon, children}) => {
  return (
    <div className={s.item}>
      <Content className={s.item__title} gray>{title}</Content>
      {icon && <Svg className={s.item__icon} src={icon}/>}
      <Title size="4" regular light className={s.item__content}>
        {children}
      </Title>
    </div>
  )
};

export default BaseFilterItem;

