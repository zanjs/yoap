import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Helmet from 'react-helmet'
import {
  Container, FlexGrid, Title, LinkIcon,
  LoadingAnimation
} from 'components'
import { ItemTileContainer } from 'containers'
import s from './UserFeaturedPage.sass'

const mapStateToProps =
  ({
    user: {name, _featured, isFetching},
    items: {fetchUserFeatured, featured}
  }) => ({
    data: featured, name,
    update: data => fetchUserFeatured(_featured || data),
    isFetching: isFetching
});

@inject(mapStateToProps) @observer
export default class UserFeaturedPage extends Component {
  componentWillMount() {
    let id;

    // if (this) {
    //
    // }

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
              <ItemTileContainer data={item} key={key} />
            ))}
          </FlexGrid>
        </Container>
      </div>
    )
  }
}

