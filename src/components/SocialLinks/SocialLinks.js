import React, { Component } from 'react'
import { Svg, FlexGrid } from 'components'
import { classNames } from 'helpers'
import s from './SocialLinks.sass'

import instIcon from 'icons/social/instagram.svg'
import twiIcon from 'icons/social/twitter.svg'
import fbIcon from 'icons/social/facebook.svg'

const SocialItem = ({icon, link}) => (
  <Svg tag="a" href={link} target="_blank"
       className={s.icon} src={icon}/>
)

const SocialLinks = ({className}) => {
  return (
    <FlexGrid justify="flex-start" align="center"
              className={classNames(s.wrapper, className)}>
      <SocialItem icon={fbIcon} link="/" />
      <SocialItem icon={twiIcon} link="/" />
      <SocialItem icon={instIcon} link="/" />
    </FlexGrid>
  )
};

export default SocialLinks;

