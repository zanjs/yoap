import React, { Component } from 'react'
import {
  Title, Content, Button,
  FlexGrid
} from 'components'
import s from './PricingBanner.sass'


const Column = ({title, onClick, price, term, type = 'light', children}) => (
  <div className={s.item} onClick={onClick}>
    <Title className={s.item__title}
           size="5" center>
      {title}
    </Title>
    <Content className={s.item__content} lightGray center>
      {children}
    </Content>
    <div className={s.price__wrapper}>
      <strong className={s.price}>₽{price}</strong>
      <span className={s.term}>{term}</span>
    </div>
    <Button className={s.button} type={type} rounded>Купить</Button>
  </div>
);

const PricingBanner = ({getRef, onClick}) => {
  return (
    <FlexGrid getRef={getRef} className={s.row} justify="space-between" wrap="true">
      <Column onClick={onClick} title="Минимальный" price="290" term="3 дня">
        Все это выглядело бы чистым абсурдом, если бы не те ранние утра, когда, запив свой завтрак жидким чаем, я догонял трамвай.
      </Column>
      <Column onClick={onClick} title="Оптимальный" price="690" term="7 дней" type="blue">
        Все это выглядело бы чистым абсурдом, если бы не те ранние утра, когда, запив свой завтрак жидким чаем, я догонял трамвай.
      </Column>
      <Column onClick={onClick} title="Расширенный" price="1190" term="14 дней">
        Все это выглядело бы чистым абсурдом, если бы не те ранние утра, когда, запив свой завтрак жидким чаем, я догонял трамвай.
      </Column>
    </FlexGrid>
  )
};

export default PricingBanner;

