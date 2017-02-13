import React, { Component } from 'react'
import { FlexGrid } from 'components'
import { classNames } from 'helpers'
import s from './Header.sass'

const Header = ({className, children, ...rest}) => (
  <FlexGrid tag="header" direction="column" align="center" justify="center"
            className={classNames(s.header, className)} {...rest}>
    {children}
  </FlexGrid>
);

export default Header;

