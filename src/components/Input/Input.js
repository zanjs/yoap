import React, { Component } from 'react'
import { classNames } from 'helpers'
import s from './Input.sass'


const Input = ({tag, className, getRef, ...rest}) => {
    const Element = tag ? tag : 'input';
    return (
        <Element ref={getRef} className={classNames(s.input, className, rest.disabled && s.disabled)} {...rest}/>
    )
};

export default Input;

