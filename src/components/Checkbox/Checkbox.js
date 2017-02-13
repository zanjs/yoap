import React, { Component } from 'react'
import { classNames } from 'helpers'
import s from './Checkbox.sass'


const Checkbox = ({children, sub, onClick, isActive, className}) => {
    return (
        <div className={classNames(s.checkbox, isActive && s.checkbox_active, className)}>
            <div className={s.wrapper}>
                <span className={s.checkbox__icon} onClick={onClick}/>
                {children &&<span className={s.checkbox__value}>{children}</span>}
            </div>
            {sub && <span className={s.checkbox__sub}>{sub}</span>}
        </div>
    )
};

export default Checkbox;
