import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Helmet from 'react-helmet'
import {
  Container, FlexGrid, Title, LinkIcon,
  ItemTile, LoadingAnimation
} from 'components'
import s from './UserFeaturedPage.sass'

const mapStateToProps =
  ({
    user: {name, _featured, isFetching},
    items: {fetchUserFeatured, featured}
  }) => ({
    data: featured, name,
    update: () => fetchUserFeatured(_featured),
    isFetching: isFetching || items.isFetching
});

@inject(mapStateToProps) @observer
export default class UserFeaturedPage extends Component {
  componentDidMount() {
    this.props.update();
  }

  render() {
    const { data, name, isFetching } = this.props;

    return (
      <div className={s.wrapper}>
        <Helmet title="Избранное вами"/>
        {isFetching && <LoadingAnimation />}
        <Container>
          <FlexGrid className={s.title} justify="space-between" align="center">
            <Title nooffsets size="1">Избранное вами, {name}</Title>
            <LinkIcon className={s.link} to="/y" gray>Посмотреть на карте</LinkIcon>
          </FlexGrid>
          <FlexGrid onClick={this.clickHandler} wrap="true" justify="start"
                    align="start">
            {data && data.map((item, key) => (
              <ItemTile data={item} key={key} />
            ))}
          </FlexGrid>
        </Container>
      </div>
    )
  }
}
