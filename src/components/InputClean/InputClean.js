import React, { Component } from 'react'
import { classNames } from 'helpers'
import s from './InputClean.sass'


const InputClean = ({className, tag, focus, defaultValue, getRef, children, ...rest}) => {
  const Element = tag || 'input';
  const _className = classNames(
    s.input,
    focus && s.focus,

    className
  );

  return (
    <Element className={_className} ref={getRef}
         defaultValue={defaultValue || children} {...rest}/>
  )
};

export default InputClean;

