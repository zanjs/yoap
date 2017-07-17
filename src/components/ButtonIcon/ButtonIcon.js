import React from 'react'
import { Svg, FlexGrid, Content } from 'components'
import { classNames } from 'helpers'
import s from './ButtonIcon.sass'


const ButtonIcon = ({children, className, isActive, icon, ...rest}) => (
  <FlexGrid className={classNames(s.wrapper, isActive && s.active, className)}
            justify="space-between" align="center" {...rest}>
    <Svg className={s.icon} src={icon}/>
    <Content nooffsets size="5"
             className={s.content}>{children}</Content>
  </FlexGrid>
);

export default ButtonIcon;

