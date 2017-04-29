import React, { Component, PropTypes } from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import {
  UserCustomAddress, Container, FlexGrid,
  LoadingAnimation, UserSubscription,
  Dashboard, UserFeatured,
  UserObjects
} from 'components'
import {
  UserDataEditContainer
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
  isLoading = true;

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
  render() {
    const {
      data, featured, isFetching,
      isAuthorized
    } = this.props;

    if (!isAuthorized) {
      return <Redirect to="/login"/>
    }

    return (
      <div>
        <Dashboard />
        {isFetching && <LoadingAnimation />}

        <Container className={s.content}>
          <FlexGrid justify="space-between" align="start">

            <div className={s.info}>
              <UserDataEditContainer />
              <UserCustomAddress />
              <UserSubscription />
            </div>

            <div className={s.data}>
              <UserObjects data={data}/>
              <UserFeatured data={featured}/>
            </div>

          </FlexGrid>
        </Container>
      </div>
    )
  }
}
