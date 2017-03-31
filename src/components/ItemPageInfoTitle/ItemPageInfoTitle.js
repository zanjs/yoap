import React, { Component } from 'react'
import { FlexGrid, Title } from 'components'
import { classNames } from 'helpers'
import s from './ItemPageInfoTitle.sass'


const ItemPageInfoTitle = ({title, subtitle, className, children}) => {
  return (
    <FlexGrid justify="space-between" align="center"
              className={classNames(s.wrapper, className)}>
      <Title nooffsets regular size="6">
        {title}
      </Title>
      {subtitle && <Title nooffsets light lightColor size="6">
        {subtitle}
      </Title>}
      {children}
    </FlexGrid>
  )
};

export default ItemPageInfoTitle;

