import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import Helmet from 'react-helmet'
import {
  Container, FlexGrid, Title, LinkIcon,
  LoadingAnimation
} from 'components'
import { ItemTileContainer } from 'containers'
import s from './UserItemsPage.sass'

const mapStateToProps = ({user: {name, isAuthorized, isAdmin, update, isFetching, _objects}, items}) => ({
  data: items.users, name,
  isFetching: isFetching || items.isFetching,
  fetchUserItems: items.fetchUserItems,
  update, objects: _objects,
  isAuthorized, isAdmin
});

@inject(mapStateToProps) @observer
export default class UserItemsPage extends Component {
  componentWillMount() {
    this.props.update(() => {
      const { objects } = this.props;
      if (objects && objects.length) {
        this.props.fetchUserItems(
          objects
        );
      }
    })
  }
  render() {
    const { data, name, isAuthorized, isFetching } = this.props;

    if (!isAuthorized) {
      return <Redirect to="/login"/>
    }

    return (
      <div className={s.wrapper}>
        <Helmet title="Ваши объявления"/>
        {isFetching && <LoadingAnimation />}
        <Container>
          <FlexGrid className={s.title} justify="space-between" align="center">
            <Title nooffsets size="1">Ваши объявления, {name}</Title>
            <LinkIcon className={s.link} to="/y" gray>Посмотреть на карте</LinkIcon>
          </FlexGrid>
          <FlexGrid wrap="true" justify="start"
                    align="start">
            {data && data.map((item, key) => (
              <ItemTileContainer edit data={item} key={key} />
            ))}
          </FlexGrid>
        </Container>
      </div>
    )
  }
}

