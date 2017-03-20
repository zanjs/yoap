import React, { Component } from 'react'
import {
  Title, Link, LinkIcon, FlexGrid,
  Image, Svg, ItemPageInfoTitle
} from 'components'
import s from './ItemPageUser.sass'

import verifiedIcon from 'icons/ui/verifed.svg'

const ItemPageUser = ({children, title = 'Хозяин', phone, email, link, image, isVerified}) => {
  return (
    <div className={s.wrapper}>
      <ItemPageInfoTitle title={title}>
        <LinkIcon gray to={link}>
          Профиль
        </LinkIcon>
      </ItemPageInfoTitle>
      <FlexGrid justify="flex-start" align="start">
        <div className={s.image}>
          {image ? <Image src={image}/> : <div className={s.noImage}/>}
        </div>
        <div className={s.content}>
          <FlexGrid justify="start" align="center">
            <Title light nooffsets size="6">
              {children}
            </Title>
            {isVerified && <Svg className={s.icon}
                                src={verifiedIcon}/>}
          </FlexGrid>

          <div className={s.links}>
            <Link tag="a" gray className={s.link} href={`tel:${phone}`}>{phone}</Link>
            <Link tag="a" gray className={s.link} href={`mailto:${email}`}>{email}</Link>
          </div>
        </div>
      </FlexGrid>

    </div>
  )
};

export default ItemPageUser;

