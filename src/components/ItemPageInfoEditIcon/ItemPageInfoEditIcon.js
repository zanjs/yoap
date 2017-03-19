import React, { Component } from 'react'
import { Svg } from 'components'
import { classNames } from 'helpers'
import s from './ItemPageInfoEditIcon.sass'

import editIcon from 'icons/ui/edit.svg'

const ItemPageInfoEditIcon = ({className}) => (
  <Svg tag="span" className={classNames(s.item, className)}
       src={editIcon}/>
);

ItemPageInfoEditIcon.wrapperClassName = s.wrapper;

export default ItemPageInfoEditIcon;

