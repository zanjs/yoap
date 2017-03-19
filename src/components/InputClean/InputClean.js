import React, { Component } from 'react'
import { classNames } from 'helpers'
import s from './InputClean.sass'


const InputClean = ({className, tag, defaultValue, children, ...rest}) => {
  const Element = tag || 'input';

  return (
    <Element className={classNames(s.input, className)}
         defaultValue={defaultValue || children} {...rest}/>
  )
};

export default InputClean;

