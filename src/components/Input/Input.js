import React, { Component } from 'react'
import { classNames } from 'helpers'
import s from './Input.sass'


const Input = ({tag, className, getRef, ...rest}) => {
    const Element = tag ? tag : 'input';
    return (
        <Element className={classNames(s.input, className, rest.disabled && s.disabled)}
                 ref={getRef}  {...rest}/>
    )
};

Input.className = s.input;
Input.disabledClassName = s.disabled;

export default Input;

