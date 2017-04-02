import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link as RouterLink, Redirect } from 'react-router-dom'
import {
  ItemPageUser, ItemPageInfoTitle,
  UserCustomAddress,
  Container, FlexGrid,
  LinkIcon, ItemTile,
  Svg, Content, LoadingAnimation
} from 'components'
import s from './UserPage.sass'

import addIcon from 'icons/ui/add.svg'

const mapStateToProps = ({
    items: {
      users, featured, isFetching,
      fetchUserItems, fetchUserFeatured,
    },
    user
  }) => ({
  data: users, featured,
  name: user.name,
  phone: user.phone,
  email: user.email,
  isFetching: isFetching || user.isFetching,
  isAuthorized: user.isAuthorized,

  fetchUserItems, fetchUserFeatured
});

@inject(mapStateToProps) @observer
export default class UserPage extends Component {
  componentWillMount() {
    this.props.fetchUserItems();
    this.props.fetchUserFeatured();
  }
  render() {
    const {
      data, featured, name,
      phone, email, isFetching,
      isAuthorized
    } = this.props;
    const object = data && data.length ? data[data.length-1] : null;

    if (!isAuthorized) {
      return <Redirect to="/login"/>
    }

    return (
      <div>
        <div className={s.dashboard} />
        {isFetching && <LoadingAnimation />}

        <Container className={s.content}>
          <FlexGrid justify="space-between" align="start">

            <div className={s.info}>
              <ItemPageUser title="Мой профиль" phone={phone}
                            email={email} link="/y" isVerified>
                {name}
              </ItemPageUser>

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
                <FlexGrid className={s.items__wrapper} justify="start" align="center" wrap="true">
                  {object && <ItemTile edit data={object}/>}
                  <RouterLink to="/manage/create">
                    <Svg src={addIcon} className={s.add} />
                  </RouterLink>
                </FlexGrid>
              </div>
              <div className={s.item}>
                <ItemPageInfoTitle title="Избранное">
                  <LinkIcon gray to="/y">Все избранные</LinkIcon>
                </ItemPageInfoTitle>
                {featured && <FlexGrid justify="start" align="center">
                  {featured.map((item, key) => (
                    <ItemTile key={key} data={item}/>
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
