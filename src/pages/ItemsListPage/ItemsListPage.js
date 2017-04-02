import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Helmet from 'react-helmet'
import {
  Container, FlexGrid, Title, LinkIcon,
  ItemTilesGrid, LoadingAnimation
} from 'components'
import s from './ItemsListPage.sass'

const mapStateToProps = ({items: {isFetching, fetchItems}}) => ({
  isFetching, update: fetchItems
});

@inject(mapStateToProps) @observer
export default class ItemsListPage extends Component {
  componentWillMount() {
    if (!this.props.isFetching)
      this.props.update();
  }

  render() {
    const { isFetching } = this.props;
    return (
      <div className={s.wrapper}>
        <Helmet title="Все объявления"/>
        {isFetching && <LoadingAnimation />}
        <Container>
          <FlexGrid className={s.title} justify="space-between" align="center">
            <Title nooffsets size="1">Все объявления</Title>
            <LinkIcon className={s.link} to="/y" gray>Посмотреть на карте</LinkIcon>
          </FlexGrid>
          <ItemTilesGrid />
        </Container>
      </div>
    )
  }
}

