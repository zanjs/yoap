import React, { Component } from 'react'
import { classNames } from 'helpers'
import s from './Input.sass'


const Input = ({tag, className, theme, getRef, ...rest}) => {
    const Element = tag ? tag : 'input';
    const _className = classNames(
      s.input, className,
      theme && s[theme],
      rest.disabled && s.disabled
    )
    return (
        <Element className={_className}
                 ref={getRef}  {...rest}/>
    )
};

Input.className = s.input;
Input.disabledClassName = s.disabled;

export default Input;

