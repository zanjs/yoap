import React, { Component } from 'react'
import { classNames } from 'helpers'
import s from './Text.sass'


export default function Text({className, tag, children, ...rest}) {
  const Element = tag ? tag : 'span';

  return (
    <Element className={classNames(s.text, className)} {...rest}>
      {children}
    </Element>
  )
};
