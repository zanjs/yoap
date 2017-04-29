import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import InputMask from 'react-input-mask'
import { Input } from 'components'
import { isEmpty, classNames } from 'helpers'
// import s from './InputPhone.sass'


const getPlaceHolder = ph => {
  if (typeof ph === 'string' && !isEmpty(ph)) {
    return ph
  }

  return 'Phone'
}

const InputPhone = ({className, placeholder, getRef, ...props}) => {
  const inputClassName = Input.className;
  const disabledClassName = Input.disabledClassName;
  const _className = classNames(
    inputClassName,
    className,

    props.disabled && disabledClassName
  );

  return <InputMask className={_className} mask="+7 (999) 999-99-99"
                    ref={getRef && (b => getRef(findDOMNode(b)))}
                    placeholder={getPlaceHolder(placeholder)}
                    {...props}/>
};

export default InputPhone;

