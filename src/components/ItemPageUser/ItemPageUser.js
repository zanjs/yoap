import React, { Component } from 'react'
import {
  Title, Link, LinkIcon, FlexGrid,
  Image, Svg, ItemPageInfoTitle
} from 'components'
import { UserPhoneContainer } from 'containers'
import { classNames } from 'helpers'
import s from './ItemPageUser.sass'

import verifiedIcon from 'icons/ui/verifed.svg'

const ItemPageUser = props => {
  const {
    children, title = 'Хозяин', phone,
    email, link, image, notitle,
    isVerified, className,
    titleClassName, linkClassName,
    imageClassName, linksClassName,
    tag, id
  } = props;

  return (
    <div className={classNames(s.wrapper, className)}>
      {!notitle && <ItemPageInfoTitle title={title}>
        <LinkIcon tag={tag} gray to={link}>
          Профиль
        </LinkIcon>
      </ItemPageInfoTitle>}
      <FlexGrid justify="flex-start" align="start">
        <div className={classNames(s.image, imageClassName)}>
          {image ? <Image src={image}/> : <div className={s.noImage}/>}
        </div>
        <div className={s.content}>
          <FlexGrid justify="start" align="center">
            <Title className={titleClassName} light nooffsets size="6">
              {children}
            </Title>
            {isVerified && <Svg className={s.icon}
                                src={verifiedIcon}/>}
          </FlexGrid>

          <div className={classNames(s.links, linksClassName)}>
            {!phone && <UserPhoneContainer id={id} />}
            {phone && <Link tag={tag || 'a'} gray className={classNames(s.link, linkClassName)}
                            href={`tel:${phone}`}>{phone}</Link>}
            {email && <Link tag={tag || 'a'} gray className={classNames(s.link, linkClassName)}
                            href={`mailto:${email}`}>{email}</Link>}
          </div>
        </div>
      </FlexGrid>
    </div>
  )
};

export default ItemPageUser;

