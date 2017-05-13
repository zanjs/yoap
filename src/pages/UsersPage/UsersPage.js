import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Helmet from 'react-helmet'
import { Redirect } from 'react-router-dom'
import {
  Container, FlexGrid,
  UserObjects,
  UserFeatured, UserSubscription,
  LoadingAnimation
} from 'components'
import {
  UserDataEditContainer,
  UserCustomAddressContainer,
  DashboardContainer
} from 'containers'
import { isEmpty } from 'helpers'
import s from './UsersPage.sass'

const mapStateToProps = ({users, user, items, theme}) => {
  const { updateCurrent, find, fetchUsers, current } = users;
  const { fetchUserItems, fetchUserFeatured, } = items;
  const { setTheme, currentThemeName } = theme;

  return {
    updateCurrent, fetchUsers,
    fetchUserItems, fetchUserFeatured,
    data: items.users,
    featured: items.featured,
    findUser: find,
    isAuthorized: user.isAuthorized,
    isAdmin: user.isAdmin,
    user: current,
    isFetching: items.isFetching || user.isFetching || users.isFetching,
    setTheme, currentThemeName
  }
}

@inject(mapStateToProps) @observer
export default class UsersPage extends Component {
  setUser = id => {
    const user = this.props.findUser(it => (it.id || it._id) === id);
    this.props.updateCurrent(user);
    return user;
  };
  update = () => {
    const { id } = this.props.match.params;
    if (isEmpty(id))
      return;

    this.prevTheme = this.props.currentThemeName + '';
    this.props.setTheme('black');

    this.setUser(id);
    this.props.fetchUsers(() => {
      const user = this.setUser(id);

      this.props.updateCurrent(user);
      this.props.fetchUserItems(user.objects);
      this.props.fetchUserFeatured(user.featured);
    })
  }
  componentWillMount() {
    this.update();
  }
  componentWillUnmount() {
    this.props.setTheme(this.prevTheme);
  }

  render() {
    const {
      data, featured, isFetching,
      isAuthorized, isAdmin, user,
      match: {params: {id}}
    } = this.props;

    if (!isAuthorized || !id || !isAdmin) {
      return <Redirect to="/y" />
    }

    const title = user.isDummy ? 'Фиктивный пользователь' : 'Настоящий пользователь';

    return (
      <div>
        {isFetching && <LoadingAnimation />}
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <DashboardContainer onlyStats/>

        <Container className={s.content}>
          <FlexGrid className={s.grid} justify="space-between" align="start">

            <div className={s.info}>
              <UserDataEditContainer title={title} noEdit data={user} />
              <UserCustomAddressContainer noEdit __data={user.personalPoints}/>
              <UserSubscription />
            </div>

            <div className={s.data}>
              <UserObjects allObjects={`/they/${id}/objects`}
                           newObject={`/they/manage/${id}/create`}
                           data={data}/>
              <UserFeatured allFeatured={`/they/${id}/featured`}
                            data={featured}/>
            </div>
          </FlexGrid>
        </Container>
      </div>
    )
  }
}

