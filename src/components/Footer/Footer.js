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
            <Title className={s.title} size="3" light white>О нас</Title>
            <Content size="5" light regular white transparent className={s.text}>
              Быстрый и надежный поиск квартир. Проверенные объявления от собственников. <br />
              Мы тщательно отбираем и проверяем все объекты, представленные на нашем сайте.
            </Content>
          </div>

          <FlexGrid align="start" justify="start" className={s.col_big}>
            <div className={s.col_half}>
              <Link className={s.link} white to="/signup">Стать хозяином</Link>
              {/*<Link className={s.link} white to="/">Помощь</Link>*/}
              <Link className={s.link} white to="/signup">Регистрация</Link>
              <Link className={s.link} white to="/login">Вход</Link>
            </div>
            <div className={s.col_half}>
              <Link className={s.link} white to="/">ALPHA version 0.1.13</Link>
              {/*<Link className={s.link} white to="/">Гарантия</Link>*/}
              {/*<Link className={s.link} white to="/">Безопасность</Link>*/}
              {/*<Link className={s.link} white to="/">Конфиденциальность</Link>*/}
            </div>
          </FlexGrid>

          <div className={s.col}>
            <Title className={s.title} white size="3" light>Контакты</Title>
            <Content white transparent size="5" regular className={classNames(s.address, s.text)}>
              Soon
              {/*190000, Санкт-Петербург,*/}
              {/*ул. Инженерная, д.2*/}
            </Content>

            <Content size="5" regular white transparent className={s.text}>
              <Link white transparent regular to="mailto:info@yoap.co" className={s.link_gray}>info@yoap.co</Link>
              <Link white transparent regular to="tel:+7 812 333 22 55" className={s.link_gray}>+7 812 333 22 55</Link>
            </Content>
          </div>

        </FlexGrid>

        <FlexGrid className={s.bottom} justify="space-between" align="center">
          <Content white transparent size="5" regular className={s.text}>© 2017, YOAP</Content>
          <SocialLinks className={s.social} />
        </FlexGrid>

      </Container>
    </footer>
  )
};

export default Footer;

