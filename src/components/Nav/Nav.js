import React, { Component } from 'react'
import { Container, FlexGrid, Link } from 'components'
import s from './Nav.sass'


const Nav = ({links}) => (
  <nav className={s.nav}>
    <FlexGrid justify="center" align="center"
              tag={Container} type="article" className={s.wrapper}>
      {links.map(({to, value}, key) => (
        <Link type="underline" className={s.item} to={to} key={key}>
          {value}
        </Link>
      ))}
    </FlexGrid>
  </nav>
);

export default Nav;

