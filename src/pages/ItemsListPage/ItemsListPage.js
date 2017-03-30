import React, { Component } from 'react'
import Helmet from 'react-helmet'
import {
  Container, FlexGrid, Title, LinkIcon,
  ItemTilesGrid
} from 'components'
import s from './ItemsListPage.sass'


export default class ItemsListPage extends Component {
  render() {
    return (
      <div className={s.wrapper}>
        <Helmet title="Все объявления"/>
        <Container>
          <FlexGrid className={s.title} justify="space-between" align="center">
            <Title nooffsets size="1">Все объявления</Title>
            <LinkIcon className={s.link} to="/y" gray>Посмотреть на карте</LinkIcon>
          </FlexGrid>
          <ItemTilesGrid />
        </Container>
      </div>
    )
  }
}

