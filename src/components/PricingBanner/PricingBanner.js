import React, { Component } from 'react'
import {
  Title, Content, Button,
  FlexGrid
} from 'components'
import { declination } from 'helpers'
import s from './PricingBanner.sass'

const termDecl = declination([
  "день",
  "дня",
  "дней"
]);

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

const PricingBanner = ({getRef, data, onClick}) => {
  return (
    <FlexGrid getRef={getRef} className={s.row} justify="space-between" wrap="true">
      {data && data.map((item, key) => (
        <Column onClick={onClick && (() => onClick(item))} key={key}
                type={key === 1 ? 'blue' : undefined}
                title={item.title} price={item.sum}
                term={`${item.term} ${termDecl(item.term)}`}>
          {item.about}
        </Column>
      ))}
    </FlexGrid>
  )
};

export default PricingBanner;

