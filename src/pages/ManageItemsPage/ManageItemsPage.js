import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { inject, observer } from 'mobx-react'
import {
  Container, FlexGrid, Title, LinkIcon,
  ItemTileManage, LoadingAnimation
} from 'components'
import s from './ManageItemsPage.sass'

@inject('items') @observer
export default class ManageItemsPage extends Component {
  componentWillMount() {
    this.props.items.getAllManageItems((items) => {
      console.log('items to moderate loaded', items);
    })
  }

  render() {
    const { manage, isFetching } = this.props.items;

    return (
      <div className={s.wrapper}>
        <Helmet title="Все объявления"/>
        <Container>
          <FlexGrid className={s.title} justify="space-between" align="center">
            <Title nooffsets size="1">
              На модерации {manage.length}
            </Title>
            <LinkIcon className={s.link} to="/y" gray>
              Опубликованные
            </LinkIcon>
          </FlexGrid>

          <FlexGrid wrap="true" justify="start" align="start">
            {manage.map((item, key) => (
              <ItemTileManage data={item} key={key}/>
            ))}
          </FlexGrid>
        </Container>
        {isFetching && <LoadingAnimation />}
      </div>
    )
  }
}

