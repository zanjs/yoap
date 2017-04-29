import React, { Component } from 'react'
import InputMask from 'react-input-mask'
import { InputClean } from 'components'
// import { classNames } from 'helpers'
// import s from './InputPhone.sass'


const InputCleanPhone = (props) => {
  return <InputClean {...props}
                     tag={InputMask} mask="+7 (999) 999-99-99"/>
};

export default InputCleanPhone;

