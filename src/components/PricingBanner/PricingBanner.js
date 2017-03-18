import React, { Component } from 'react'
import {
  Title, Content, Button,
  Container, FlexGrid
} from 'components'
import s from './PricingBanner.sass'


const Column = ({title, price, term, type = 'light', children}) => (
  <div className={s.item}>
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
)

const PricingBanner = () => {
  return (
    <div className={s.wrapper}>
      <Container>
        <Title className={s.nopadding} size="2" center light>
          Станьте хозяином уже сегодня!
        </Title>
        <Content center lightGray size="3">
          Активируйте подписку для просмотра<br/>
          и публикации объявлений
        </Content>

        <FlexGrid className={s.row} justify="space-between" wrap="true">
          <Column title="Минимальный" price="290" term="3 дня">
            Все это выглядело бы чистым абсурдом, если бы не те ранние утра, когда, запив свой завтрак жидким чаем, я догонял трамвай.
          </Column>
          <Column title="Оптимальный" price="690" term="7 дней" type="blue">
            Все это выглядело бы чистым абсурдом, если бы не те ранние утра, когда, запив свой завтрак жидким чаем, я догонял трамвай.
          </Column>
          <Column title="Расширенный" price="1190" term="14 дней">
            Все это выглядело бы чистым абсурдом, если бы не те ранние утра, когда, запив свой завтрак жидким чаем, я догонял трамвай.
          </Column>
        </FlexGrid>
      </Container>
    </div>
  )
};

export default PricingBanner;

