import React, { Component } from 'react'
import { classNames } from 'helpers'
import s from './Title.sass'


const Title = ({
  size = '2', tag, bold, regular,
  light, center, white,
  lightColor, className,
  children, getRef,

  ...rest
}) => {
  const Element = tag ? tag : `h${size}`;
  const _className = classNames(
    s[`title--${size}`],
    bold && s.bold,
    regular && s.regular,
    light && s.light,
    lightColor && s.lightColor,
    center && s.center,
    white && s.white,

    className
  )

  return (
    <Element ref={getRef} className={_className} {...rest}>
      {children}
    </Element>
  )
};

export default Title;

