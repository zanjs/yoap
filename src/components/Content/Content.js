import React, { Component } from 'react'
import { classNames } from 'helpers'
import s from './Content.sass'


export default function Content({
  className, bold, regular,
  light, size = 4, gray, lightGray,
  lightColor, white, transparent, center,

  tag, children,

  ...rest
}) {
  const Element = tag ? tag : 'p';
  const _className = classNames(
    s.text,
    s[`size-${size}`],
    bold && s.bold,
    regular && s.regular,
    light && s.light,
    lightColor && s.lightColor,
    lightGray && s.lightGray,
    gray && s.gray,
    center && s.center,
    white && s.white,
    transparent && s.transparent,


    className
  )

  return (
    <Element className={_className} {...rest}>
      {children}
    </Element>
  )
};
