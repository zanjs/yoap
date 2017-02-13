import React, { Component } from 'react'
import { classNames } from 'helpers'
import s from './Title.sass'

const getType = (type) => {
  const className = s[`title--${type}`];

  if (className) {
    return {
      className,
      tag: 'h' + type
    }
  }

  return {
    className: s.title,
    tag: 'h2'
  };
};

const Title = ({className, children, type, ...rest}) => {
  const data = getType(type);
  const Element = data.tag;

  return (
    <Element className={classNames(data.className, className)} {...rest}>{children}</Element>
  )
};

export default Title;
