import React, { Component } from 'react'
import { Title, Content, Container, FlexGrid, Button } from 'components'
import { classNames } from 'helpers'
import s from './PricingBannerFull.sass'

const Row = ({children, className}) => (
  <FlexGrid justify="space-between" wrap="true" align="start"
            className={classNames(s.row, className)}>
    {children}
    </FlexGrid>
)

const Column = ({children, className}) => (
  <div className={classNames(s.column, className)}>{children}</div>
)

const PriceItem = ({type, title, price}) => (
  <div className={s.item}>
    <Title className={s.nopadding} size="6" white regular>{title}</Title>
    <div className={s.price}>₽{price}</div>
    <Button className={s.button} rounded type={type}>Купить</Button>
  </div>
)

const Circle = ({active}) => {
  if (!active) {
    return null
  }

  return (
    <div className={s.circle} />
  )
}

const Description = ({title, data}) => (
  <Row className={s.row_des}>
    <Column>
      <Content white className={s.des__title}>{title}</Content>
    </Column>
    {data.map((item, key) => {
      const isBoolean = item === false || item === true;

      return (
        <Column className={s.column_des} key={key}>
          {isBoolean ? <Circle active={item}/> :
            <Content className={s.nopadding} white transparent>
              {item}
            </Content>
          }
        </Column>
      )
    })}
  </Row>
);

const PricingBannerFull = () => {
  return (
    <div className={s.wrapper}>
      <Container>

        <Row className={s.header}>
          <Column>
            <Title className={s.title} size="3" light white>Тарифы</Title>
            <Content size="3" light regular white transparent className={s.text}>
              Активируйте подписку<br/> для просмотра и<br/> публикации<br/> объявлений
            </Content>
          </Column>
          <Column>
            <PriceItem title="Минимальный" type="gold-empty" price="290"/>
          </Column>
          <Column>
            <PriceItem title="Оптимальный" type="bright-blue-empty" price="690"/>
          </Column>
          <Column>
            <PriceItem title="Расширенный" type="blue-empty" price="1190"/>
          </Column>
        </Row>

        <Description title="Длительность" data={['3 дня', "7 дней", "14 дней"]}/>
        <Description title="Одно открытие" data={['9.6 руб', '6.9 руб', '3.9 руб']} />
        <Description title="Всего открытий" data={["30", "100", "300"]}/>
        <Description title="Автообновление" data={[true, true, true]}/>
        <Description title="Маршрут до работы/учебы" data={[true, true, true]}/>
        <Description title="Сохранение в избранное" data={[true, true, true]}/>
        <Description title="Сохранение фильтра" data={[true, true, true]}/>
        <Description title="СМС-уведомления" data={[false, true, true]}/>
        <Description title="Подписка на фильтр по почте" data={[false, true, true]}/>
        <Description title="Рассылка лучших вариантов" data={[false, false, true]}/>
      </Container>
    </div>
  )
};

export default PricingBannerFull;

