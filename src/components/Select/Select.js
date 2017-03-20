import React, { Component } from 'react'
import { classNames } from 'helpers'
import s from './Select.sass'


const Select = ({className, itemClassName, values, ...rest}) => {
  return (
    <select className={classNames(s.select, className)} {...rest}>
      {values.map((val, key) => (
        <option className={itemClassName}
                key={key} value={val}>{val}</option>
      ))}
    </select>
  )
};

export default Select;

