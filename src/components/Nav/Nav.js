import React, { Component } from 'react'
import { Container, FlexGrid, Link, Button, Logo } from 'components'
import s from './Nav.sass'


const Nav = ({links}) => (
  <nav className={s.nav}>
    <FlexGrid justify="space-between" align="center"
              tag={Container} type="full" className={s.wrapper}>
      <Logo />
      <div className={s.links}>
        {links.map(({to, content}, key) => (
          <Link regular className={s.item} to={to} key={key}>
            {content}
          </Link>
        ))}
        <Button className={s.button} type="light">Войти</Button>
      </div>
    </FlexGrid>
  </nav>
);

export default Nav;

