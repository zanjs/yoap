import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Helmet from 'react-helmet'
import {
  Container, FlexGrid, Title, LinkIcon,
  ItemTile, LoadingAnimation
} from 'components'
import s from './UserItemsPage.sass'

const mapStateToProps = ({user: {name, objects, isFetching}, items}) => ({
  data: objects, name,
  isFetching: isFetching || items.isFetching
});

@inject(mapStateToProps) @observer
export default class UserItemsPage extends Component {
  render() {
    const { data, name, isFetching } = this.props;
    return (
      <div className={s.wrapper}>
        <Helmet title="Ваши объявления"/>
        {isFetching && <LoadingAnimation />}
        <Container>
          <FlexGrid className={s.title} justify="space-between" align="center">
            <Title nooffsets size="1">Ваши объявления, {name}</Title>
            <LinkIcon className={s.link} to="/y" gray>Посмотреть на карте</LinkIcon>
          </FlexGrid>
          <FlexGrid wrap="true" justify="start"
                    align="start">
            {data && data.map((item, key) => (
              <ItemTile edit data={item} key={key} />
            ))}
          </FlexGrid>
        </Container>
      </div>
    )
  }
}

