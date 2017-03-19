import React, { Component } from 'react'
import { FlexGrid, Svg, Link } from 'components'
import s from './LinkIcon.sass'
import arrowIcon from 'icons/ui/arrow-small.svg'

const LinkIcon = ({children, to, ...rest}) => (
  <FlexGrid className={s.btn__link} tag={Link} to={to}
            justify="start" align="center" {...rest}>
    <span>{children}</span>
    <Svg className={s.btn__icon} src={arrowIcon}/>
  </FlexGrid>
)

export default LinkIcon;

