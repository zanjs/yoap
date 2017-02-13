import React, { Component } from 'react'
import { classNames } from 'helpers'
import s from './Container.sass'

const getType = (type) => {
  const className = s[`container_${type}`];
  if (className) {
    return className;
  }

  return s.container
};

const Container = ({className, children, getRef, style, tag, type, ...rest}) => {
  const Element = tag ? tag : 'div';

  return (
    <Element ref={getRef} style={style} className={classNames(getType(type), className)} {...rest}>
      {children}
    </Element>
  )
};

export default Container;
