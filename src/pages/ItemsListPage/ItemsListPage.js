import React, { Component } from 'react'
import { Container, FlexGrid, Title, LinkIcon } from 'components'
import { ItemTilesGridContainer } from 'containers'
import s from './ItemsListPage.sass'


export default class ItemsListPage extends Component {
  render() {
    return (
      <div className={s.wrapper}>
        <Container>
          <FlexGrid className={s.title} justify="space-between" align="center">
            <Title className={s.nooffsets} size="1">Все объявления</Title>
            <LinkIcon to="/y" gray>Посмотреть на карте</LinkIcon>
          </FlexGrid>
          <ItemTilesGridContainer />
        </Container>
      </div>
    )
  }
}

