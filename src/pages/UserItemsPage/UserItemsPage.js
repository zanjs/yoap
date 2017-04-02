import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Helmet from 'react-helmet'
import {
  Container, FlexGrid, Title, LinkIcon,
  ItemTile
} from 'components'
import s from './UserItemsPage.sass'

const mapStateToProps = ({user: {name, objects}}) => ({
  data: objects, name
});

@inject(mapStateToProps) @observer
export default class UserItemsPage extends Component {
  componentDidMount() {
  }

  render() {
    const { data, name } = this.props;
    return (
      <div className={s.wrapper}>
        <Helmet title="Ваши объявления"/>
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

