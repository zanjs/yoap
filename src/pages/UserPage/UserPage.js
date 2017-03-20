import React, { Component } from 'react'
import { inject } from 'mobx-react'
import {
  ItemPageUser, ItemPageInfoTitle,
  UserCustomAddress,
  Container, FlexGrid,
  LinkIcon, ItemTile,
  Svg
} from 'components'
import s from './UserPage.sass'

import addIcon from 'icons/ui/add.svg'

const mapStateToProps = ({items: {data}, user: {name, phone, email}}) => ({
  data,
  name, phone, email
});

@inject(mapStateToProps)
export default class UserPage extends Component {
  render() {
    const { data, name, phone, email } = this.props;
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
            </div>

            <div className={s.data}>
              <div className={s.item}>
                <ItemPageInfoTitle title="Мои объявления">
                  <LinkIcon gray to="/y">Все объявления</LinkIcon>
                </ItemPageInfoTitle>
                <FlexGrid justify="start" align="center">
                  <ItemTile data={data[0]}/>
                  <Svg src={addIcon} className={s.add} />
                </FlexGrid>
              </div>
              <div className={s.item}>
                <ItemPageInfoTitle title="Избранное">
                  <LinkIcon gray to="/y">Все избранные</LinkIcon>
                </ItemPageInfoTitle>
                <FlexGrid justify="start" align="center">
                  {data.map((item, key) => (
                    <ItemTile key={key} data={item}/>
                  ))}
                </FlexGrid>
              </div>
            </div>

          </FlexGrid>
        </Container>

      </div>
    )
  }
}
