import React, { Component } from 'react'
import { classNames } from 'helpers'
import s from './Select.sass'


const Select = ({className, getRef, inherit, itemClassName, values, data, ...rest}) => {
  const _data = values || data;
  const _className = classNames(
    s.select, inherit && s.inherit,

    className
  );

  return (
    <select className={_className}
            ref={getRef}  {...rest}>
      {_data.map((val, key) => (
        <option className={itemClassName}
                key={key} value={val}>{val}</option>
      ))}
    </select>
  )
};

export default Select;

