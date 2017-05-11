import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Helmet from 'react-helmet'
import {
  Container, FlexGrid, Title, LinkIcon,
  LoadingAnimation
} from 'components'
import { ItemTileContainer } from 'containers'
import s from './UserFeaturedPage.sass'

const mapStateToProps =
  ({
    user: {name, _featured, isFetching},
    items: {fetchUserFeatured, featured},
    users
  }) => ({
    data: featured, name,
    users,
    update: data => fetchUserFeatured(_featured || data),
    isFetching: isFetching
});

@inject(mapStateToProps) @observer
export default class UserFeaturedPage extends Component {
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
        this.props.update(user.featured || user._featured);
      })
    }

    this.props.update();
  }

  render() {
    const {
      data, name, users, isFetching,
      match: {params: {id}}
    } = this.props;
    const userName = id ? users.current.name || '' : name;
    const title = id ? `Избранное ${userName}` : `Избранное вами, ${userName}`;

    return (
      <div className={s.wrapper}>
        <Helmet title={title}/>
        {isFetching && <LoadingAnimation />}
        <Container>
          <FlexGrid className={s.title} justify="space-between" align="center">
            <Title nooffsets size="1">
              {title}
            </Title>
            <LinkIcon className={s.link} to="/m" gray>Посмотреть на карте</LinkIcon>
          </FlexGrid>
          <FlexGrid onClick={this.clickHandler} wrap="true" justify="start"
                    align="start">
            {data && data.map((item, key) => (
              <ItemTileContainer data={item} key={key} />
            ))}
          </FlexGrid>
        </Container>
      </div>
    )
  }
}

