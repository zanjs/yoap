import React, { Component } from 'react'
import { FlexGrid, Svg, Link, Content } from 'components'
import { classNames } from 'helpers'
import s from './LinkIcon.sass'
import arrowIcon from 'icons/ui/arrow-small.svg'

const LinkIcon = ({children, tag, className, to, ...rest}) => (
  <FlexGrid className={classNames(s.btn__link, className)} tag={to && Link || Content} to={to}
            justify="start" align="center" {...rest}>
    <span>{children}</span>
    <Svg className={s.btn__icon} src={arrowIcon}/>
  </FlexGrid>
);

export default LinkIcon;

