import React, { Component } from 'react'
import { Svg } from 'components'
import { classNames } from 'helpers'
import s from './Logo.sass'
import logo from 'icons/logo.svg'

const Logo = ({className, fill, style, ...props}) => (
  <Svg className={classNames(s.logo, className)}
       style={fill && {fill, ...style} || style && style || null}
       src={logo} {...props}/>
)

export default Logo;

