import React, { Component } from 'react'
import { classNames } from 'helpers'
import s from './Title.sass'


const Title = ({size = '2', tag, bold, regular, light, children, getRef, className, ...rest}) => {
  const Element = tag ? tag : `h${size}`;
  const _className = classNames(
    s[`title--${size}`],
    bold && s.bold,
    regular && s.regular,
    light && s.light,

    className
  )

  return (
    <Element ref={getRef} className={_className} {...rest}>
      {children}
    </Element>
  )
};

export default Title;

