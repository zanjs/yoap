import React, { Component } from 'react'
import { classNames } from 'helpers'
import s from './Content.sass'


export default function Content({
  className, bold, regular,
  light, size = 4, gray, lightColor,

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
    gray && s.gray,

    className
  )

  return (
    <Element className={_className} {...rest}>
      {children}
    </Element>
  )
};
