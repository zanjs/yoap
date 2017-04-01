import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link as RouterLink } from 'react-router-dom'
import {
  ItemPageUser, ItemPageInfoTitle,
  UserCustomAddress,
  Container, FlexGrid,
  LinkIcon, ItemTile,
  Svg, Content
} from 'components'
import s from './UserPage.sass'

import addIcon from 'icons/ui/add.svg'

const mapStateToProps = ({items: {users, featured}, user: {name, phone, email, update}}) => ({
  data: users, featured,
  name, phone, email, update
});

@inject(mapStateToProps) @observer
export default class UserPage extends Component {
  componentWillMount() {
    this.props.update();
  }
  render() {
    const { data, featured, name, phone, email } = this.props;
    return (
      <div>
        <div className={s.dashboard} />

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
                  <LinkIcon gray to="/y">Все объявления</LinkIcon>
                </ItemPageInfoTitle>
                <FlexGrid justify="start" align="center">
                  {data.map((item, key) => (
                    <ItemTile edit data={item} key={key}/>
                  ))}
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
