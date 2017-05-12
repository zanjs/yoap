import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import {
  Container, FlexGrid,
  LoadingAnimation, UserSubscription,
  UserFeatured,
  UserObjects
} from 'components'
import {
  UserDataEditContainer,
  UserCustomAddressContainer,
  DashboardContainer
} from 'containers'
import s from './UserPage.sass'

const mapStateToProps = ({
    items: {
      users, featured, isFetching,
      fetchUserItems, fetchUserFeatured,
    },
    user,
    theme: { setTheme, currentThemeName }
  }) => ({
  data: users,
  featured,
  isFetching: isFetching || user.isFetching,
  isAuthorized: user.isAuthorized,
  _objects: user._objects,
  _featured: user._featured,
  verified: user.verified,
  update: user.update,
  saveValues: user.saveValues,
  clearRedirect: () => user.redirectWhenLogin(null),
  redirect: user.redirect,

  setTheme, currentThemeName,

  fetchUserItems, fetchUserFeatured
});

@inject(mapStateToProps) @observer
export default class UserPage extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillMount() {
    if (!this.props.isAuthorized)
      return;

    this.props.update(() => {
      this.updateUserItems();
      this.updateUserFeatured();
    });
    this.prevTheme = this.props.currentThemeName + '';
    this.props.setTheme('black');
    this.props.saveValues({
      isUserPage: true
    })

    if (this.props.redirect) {
      this.context.router.history.push(
        this.props.redirect + ''
      )
      console.log('redirect from UserPage to', this.props.redirect + '');
      this.props.clearRedirect();
    }
  }
  componentWillUnmount() {
    this.props.setTheme(this.prevTheme);
    this.props.saveValues({
      isUserPage: false
    })
  }
  updateUserItems = (objects = this.props._objects) => {
    if (objects && objects.length) {
      this.props.fetchUserItems(
        objects
      );
    }
  };
  updateUserFeatured = (featured = this.props._featured) => {
    if (featured && featured.length) {
      this.props.fetchUserFeatured(
        featured
      );
    }
  };
  compare = (prev, next) => {
    if (!prev && !next || !prev.length && !next.length)
      return;

    return (
      !prev && next || prev.length !== next.length
    )
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.isFetching)
      return;

    const {
      props: {_featured, _objects, featured, objects},
      compare
    } = this;

    if (compare(_objects, nextProps._objects, objects)) {
      this.updateUserItems(nextProps._objects)
    }

    if (compare(_featured, nextProps._featured, featured)) {
      this.updateUserFeatured(nextProps._featured)
    }
  }
  emptyDashboardHandler = dashEmpty => {
    if (dashEmpty) {
      if (this.props.currentThemeName === 'white')
        return;

      return this.props.setTheme('white')
    }

    if (this.props.currentThemeName === 'black')
      return;

    return this.props.setTheme('black')
  }

  render() {
    const {
      data, featured, isFetching,
      isAuthorized, verified
    } = this.props;

    if (!isAuthorized) {
      return <Redirect to="/login"/>
    }

    return (
      <div>
        <Helmet>
          <title>Мой профиль</title>
          <meta name="description" content="Просматривайте свои объявления, избранные, добавляйте адреса - меняйте информацию профиля или же просмотрите уведомления или статистику своего объявления!"/>
        </Helmet>
        <DashboardContainer onEmpty={this.emptyDashboardHandler} />
        {isFetching && <LoadingAnimation />}

        <Container className={s.content}>
          <FlexGrid className={s.grid} justify="space-between" align="start">
            <div className={s.info}>
              <UserDataEditContainer />
              <UserCustomAddressContainer />
              <UserSubscription />
            </div>

            <div className={s.data}>
              <UserObjects notAllowed={!verified} data={data}/>
              <UserFeatured data={featured}/>
            </div>
          </FlexGrid>
        </Container>
      </div>
    )
  }
}
