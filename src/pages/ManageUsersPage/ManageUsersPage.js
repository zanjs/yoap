import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import Helmet from 'react-helmet'
import { FlexGrid, Title, LinkIcon, Container } from 'components'
import { UsersListContainer } from 'containers'
import s from './ManageUsersPage.sass'

const mapStateToProps = ({user}) => ({
  isAllowed: user.isAuthorized && user.isAdmin
})

@inject(mapStateToProps) @observer
export default class ManageUsersPage extends Component {
  render() {
    if (!this.props.isAllowed) {
      return <Redirect to="/y"/>
    }

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

          <UsersListContainer/>
        </Container>
      </div>
    )
  }
}

