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

const mapStateToProps = ({user: {name, isAuthorized, isAdmin, update, isFetching, _objects}, users, items}) => ({
  data: items.users, name,
  isFetching: isFetching || items.isFetching,
  fetchUserItems: items.fetchUserItems,
  update, objects: _objects,
  isAuthorized, isAdmin,
  users, items,
});

@inject(mapStateToProps) @observer
export default class UserItemsPage extends Component {
  setUser = id => {
    const user = this.props.users.find(it => (it.id || it._id) === id);
    this.props.users.updateCurrent(user);
    return user;
  };

  componentWillMount() {
    const {match: {params: {id}}} = this.props;

    if (id) {
      this.setUser(id);
      return this.props.users.fetchUsers(() => {
        const user = this.setUser(id);

        this.props.users.updateCurrent(user);
        this.props.fetchUserItems(user.objects);
      })
    }

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
    const {
      data, name, isAuthorized, isFetching,
      match: {params: {id}}, users,
    } = this.props;
    const userName = id ? users.current.name || '' : name;

    if (!isAuthorized) {
      return <Redirect to="/login"/>
    }

    return (
      <div className={s.wrapper}>
        <Helmet title={id ? `Объявления ${userName}` : 'Ваши объявления'}/>
        {isFetching && <LoadingAnimation />}
        <Container>
          <FlexGrid className={s.title} justify="space-between" align="center">
            <Title nooffsets size="1">
              {id ? `Объявления ${userName}` : `Ваши объявления, ${userName}`}
            </Title>
            <LinkIcon className={s.link} to="/m" gray>Посмотреть на карте</LinkIcon>
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

