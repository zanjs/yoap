import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { UsersList, FlexGrid, Title, LinkIcon, Container } from 'components'
import s from './ManageUsersPage.sass'


export default class ManageUsersPage extends Component {
  render() {
    return (
      <div className={s.wrapper}>
        <Helmet title="Управление пользователями"/>
        <Container>
          <FlexGrid className={s.title} justify="space-between" align="center">
            <Title nooffsets size="1">
              Пользователи
            </Title>
            <LinkIcon className={s.link} to="/manage" gray>
              Проверенные
            </LinkIcon>
          </FlexGrid>

          <UsersList/>
        </Container>
      </div>
    )
  }
}

