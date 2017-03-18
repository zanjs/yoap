import React, { Component } from 'react'
import {
  FlexGrid, Title, Content,
  Container, Link, SocialLinks
} from 'components'
import { classNames } from 'helpers'
import s from './Footer.sass'


const Footer = () => {
  return (
    <footer className={s.wrapper}>
      <Container>
        <FlexGrid align="start" justify="space-between" wrap="true">

          <div className={s.col}>
            <Title className={s.title} size="3" light>О нас</Title>
            <Content size="5" regular className={s.text}>
              Быстрый и надежный поиск квартир. Проверенные объявления от собственников. <br />
              Мы тщательно отбираем и проверяем все объекты, представленные на нашем сайте.
            </Content>
          </div>

          <FlexGrid align="start" justify="start" className={s.col_big}>
            <div className={s.col_half}>
              <Link className={s.link} to="/">Стать хозяином</Link>
              <Link className={s.link} to="/">Помощь</Link>
              <Link className={s.link} to="/">Регистрация</Link>
              <Link className={s.link} to="/">Вход</Link>
            </div>
            <div className={s.col_half}>
              <Link className={s.link} to="/">Условия подписки</Link>
              <Link className={s.link} to="/">Гарантия</Link>
              <Link className={s.link} to="/">Безопасность</Link>
              <Link className={s.link} to="/">Конфиденциальность</Link>
            </div>
          </FlexGrid>

          <div className={s.col}>
            <Title className={s.title} size="3" light>Контакты</Title>
            <Content size="5" regular className={classNames(s.address, s.text)}>
              190000, Санкт-Петербург,
              ул. Инженерная, д.2
            </Content>

            <Content size="5" regular className={s.text}>
              <a href="mailto:info@yoap.co" className={s.link_gray}>info@yoap.co</a>
              <a href="tel:+7 812 333 22 55" className={s.link_gray}>+7 812 333 22 55</a>
            </Content>
          </div>

        </FlexGrid>

        <FlexGrid className={s.bottom} justify="space-between" align="center">
          <Content size="5" regular className={s.text}>© 2017, YOAP</Content>
          <SocialLinks className={s.social} />
        </FlexGrid>

      </Container>
    </footer>
  )
};

export default Footer;

