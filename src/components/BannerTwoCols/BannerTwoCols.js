import React, { Component } from 'react'
import {
  Container, Title, Content, Link,
  Image, FlexGrid, SocialLinks, Svg
} from 'components'
import s from './BannerTwoCols.sass'

import keysImage from 'images/bg/keys.png'
import arrowIcon from 'icons/ui/arrow-small.svg'

const BannerTwoCols = () => {
  return (
    <article className={s.wrapper}>
      <FlexGrid tag={Container} wrap="true">
        <div className={s.image}>
          <Image className={s.img} src={keysImage}/>
        </div>

        <div className={s.content}>
          <Title className={s.title} size="1">Быстрый поиск идеальной квартиры</Title>
          <Content gray className={s.subtitle}>Начните пользоваться YOAP уже сегодня</Content>
          <FlexGrid align="start" justify="space-between" className={s.cols}>
            <Content className={s.item}>
              Чтобы добавить еще одну вишенку к темной людской грозди, свисавшей с подножки, и плыл сквозь акварельный розово-голубой город к конуре-проходной.
            </Content>
            <Content className={s.item}>
              Все это выглядело бы чистым абсурдом, если бы не те ранние утра, когда, запив свой завтрак жидким чаем, я догонял трамвай.
            </Content>
          </FlexGrid>

          <FlexGrid className={s.bottom} align="center"
                    justify="space-between">
            <SocialLinks className={s.social} />
            <Link to="/" gray className={s.link}>
              <FlexGrid align="center" justify="start">
                Подробнее
                <Svg className={s.arrow} src={arrowIcon}/>
              </FlexGrid>
            </Link>
          </FlexGrid>
        </div>
      </FlexGrid>
    </article>
  )
};

export default BannerTwoCols;

