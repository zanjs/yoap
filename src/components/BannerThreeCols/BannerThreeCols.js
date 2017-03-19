import React, { Component } from 'react'
import {
  Title, FlexGrid, Link,
  Content, Container, Svg
} from 'components'
import { classNames } from 'helpers'
import s from './BannerThreeCols.sass'

import arrowIcon from 'icons/ui/arrow-small.svg'


const BannerThreeCols = ({title, more = 'Подробнее', link = '/', content, className}) => (
  <Container className={classNames(s.wrapper, className)}>
    <FlexGrid tag="header" align="center" className={s.header}>
      <Title nooffsets size="1">{title}</Title>
      <Link nooffsets gray to={link}>
        <FlexGrid align="center">
          {more} <Svg src={arrowIcon} className={s.arrow}/>
        </FlexGrid>
      </Link>
    </FlexGrid>
    {content && <FlexGrid className={s.body} tag="article" align="start"
                          justify="space-between" wrap="true">
      {content.map(({title, content}, key) => (
        <div className={s.item} key={key}>
          <Title className={s.item__title} light size="4">{title}</Title>
          <Content gray>{content}</Content>
        </div>
      ))}
    </FlexGrid>}
  </Container>
)

export default BannerThreeCols;

