import React, { Component, PropTypes } from 'react'
import { inject, observer } from 'mobx-react'
import { Link as RouterLink, Redirect } from 'react-router-dom'
import {
  ItemPageInfoTitle,
  UserCustomAddress,
  Container, FlexGrid,
  LinkIcon,
  Svg, Content, LoadingAnimation,
  Dashboard
} from 'components'
import {
  UserDataEditContainer, ItemTileContainer
} from 'containers'
import { classNames } from 'helpers'
import s from './UserPage.sass'

import addIcon from 'icons/ui/add.svg'

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
  name: user.name,
  phone: user.phone,
  email: user.email,
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
      data, featured, name,
      phone, email, isFetching,
      isAuthorized
    } = this.props;
    const object = data && data.length ? data[0] : null;

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
              {/*<ItemPageUser title="Мой профиль" phone={phone}*/}
                            {/*email={email} link="/y" isVerified>*/}
                {/*{name}*/}
              {/*</ItemPageUser>*/}
              <UserDataEditContainer />

              <UserCustomAddress />
              <div className={s.item}>
                <ItemPageInfoTitle title="Подписка" />
                <Content nooffsets light size="3">Расширенный тариф до 21.04.17</Content>
                <Content nooffsets light size="3">Осталось 30 дней и 293 открытия</Content>
              </div>

            </div>

            <div className={s.data}>
              <div className={s.item}>
                <ItemPageInfoTitle title="Мои объявления">
                  <LinkIcon gray to="/you/yours">
                    Все объявления{data.length ? ` (${data.length})` : ''}
                  </LinkIcon>
                </ItemPageInfoTitle>
                <FlexGrid className={s.items__wrapper} justify="start"
                          align="start" wrap="false">
                  {object && <ItemTileContainer edit data={object}/>}
                  <RouterLink to="/manage/create">
                    <Svg className={classNames(s.add, !!object && s.add_last)}
                         src={addIcon} />
                  </RouterLink>
                </FlexGrid>
              </div>
              <div className={s.item}>
                <ItemPageInfoTitle title="Избранное">
                  <LinkIcon gray to="/you/featured">
                    Все избранные{featured.length ? ` (${featured.length})` : ''}
                  </LinkIcon>
                </ItemPageInfoTitle>
                {featured && <FlexGrid justify="start" align="start">
                  {featured.map((item, key) => (
                    <ItemTileContainer key={key} data={item}/>
                  ))}
                </FlexGrid>}
              </div>
            </div>

          </FlexGrid>
        </Container>

      </div>
    )
  }
}
