import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Helmet from 'react-helmet'
import { inject, observer } from 'mobx-react'
import {
  Container, FlexGrid, Title, LinkIcon,
  ItemTileManage, LoadingAnimation
} from 'components'
import { statusTypes } from 'constants'
import s from './ManageItemsPage.sass'

const mapStateToProps = ({items, user}) => ({
  items, user
});

@inject(mapStateToProps) @observer
export default class ManageItemsPage extends Component {
  statuses = statusTypes.types;

  componentWillMount() {
    this.props.items.getAllManageItems((items) => {
      console.log('items to moderate loaded');
    })
  }

  update = () => {
    this.props.items.getAllManageItems(items => {
      console.log('items to moderate updated', items.length);
    })
  };

  getObjectId = _id => {
    let id = _id;
    if (typeof id !== 'string')
      id = _id.id;

    return id;
  };

  changeStatus = (_id, status) => {
    const id = this.getObjectId(_id);

    this.props.items.updateItem(id, {status}, data => {
      console.log('STATUS WAS CHANGED TO', data.status);
      this.update();
    });
  };

  publish = id => {
    this.changeStatus(id, this.statuses[1].id);
  };
  decline = id => {
    this.changeStatus(id, this.statuses[2].id);
  };

  render() {
    const { manage, isFetching } = this.props.items;
    const { isAdmin } = this.props.user;
    const {
      publish, decline
    } = this;

    if (!isAdmin) {
      return <Redirect to="/y"/>
    }

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
              <ItemTileManage onAccept={publish}
                              onDecline={decline}
                              data={item} key={key}/>
            ))}
          </FlexGrid>
        </Container>
        {isFetching && <LoadingAnimation />}
      </div>
    )
  }
}

