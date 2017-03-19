import React, { Component } from 'react'
import { Content, Title, Svg } from 'components'
import { classNames } from 'helpers'
import s from './BaseFilterItem.sass'


const BaseFilterItem = ({className, tag, title, icon, render, children, ...rest}) => {
  const Element = tag || 'div';

  if (render) {
    return <Element className={classNames(s.item, className)} {...rest}>{render}</Element>
  }

  return (
    <Element className={classNames(s.item, className)}>
      <Content className={s.item__title} gray>{title}</Content>
      {icon && <Svg className={s.item__icon} src={icon}/>}
      <Title size="4" regular light className={s.item__content}>
        {children}
      </Title>
    </Element>
  )
};

export default BaseFilterItem;

