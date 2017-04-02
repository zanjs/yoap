import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Helmet from 'react-helmet'
import { inject, observer } from 'mobx-react'
import {
  Container, FlexGrid, Title, LinkIcon,
  ItemTileManage, LoadingAnimation,
  ManageItemsSort
} from 'components'
import { statusTypes } from 'constants'
import s from './ManageItemsPage.sass'

const mapStateToProps = ({items, user}) => ({
  items, user
});

@inject(mapStateToProps) @observer
export default class ManageItemsPage extends Component {
  statuses = statusTypes.types;
  state = {data: null};

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

  sortHandler = q => {
    const query  = q.toLowerCase();
    const compare = s => (s + '').toLowerCase().indexOf(query) !== -1;
    let data = [];

    this.props.items.data.forEach(item => {
      if (item.title) {
        if (compare(item.title))
          return data.push(item);
      }
      if (item.location) {
        const { location } = item;

        if (compare(location.address))
          return data.push(item);
        if (compare(location.subway[0].name))
          return data.push(item);
      }
      if (item.category) {
        if (compare(item.category.name))
          return data.push(item);
      }
      if (item.rating) {
        if (compare(item.rating))
          return data.push(item);
      }

      //if (item.types) {
      //  let isMatched = false;
      //  item.types.forEach(type => {
      //    if (compare(type.name))
      //      isMatched = true;
      //  });
      //  if (isMatched)
      //    return data.push(item);
      //}
    });

    this.setState({
      data: data.length ? data : null
    })
  };

  sortStatusHandler = status => {
    let data = null;

    if (status)
      data = this.props.items.manage.filter(
        item => item.status === status
      );

    this.setState({data});
  };

  publish = id => {
    this.changeStatus(id, this.statuses[1].id);
  };
  decline = id => {
    this.changeStatus(id, this.statuses[2].id);
  };

  selectStatusHandler = (id, status) => {
    this.changeStatus(id, status)
  };

  render() {
    const { manage, isFetching } = this.props.items;
    const { data } = this.state;
    const { isAdmin } = this.props.user;
    const {
      publish, decline,
      selectStatusHandler,
      sortStatusHandler,
      sortHandler,
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
          <ManageItemsSort onSort={sortHandler}
                           onSortStatusChange={sortStatusHandler}
                           className={s.sort} />

          <FlexGrid wrap="true" justify="start" align="start">
            {(data || manage).map((item, key) => (
              <ItemTileManage onAccept={publish}
                              onDecline={decline}
                              onStatusChange={selectStatusHandler}
                              data={item} key={key}/>
            ))}
          </FlexGrid>
        </Container>
        {isFetching && <LoadingAnimation />}
      </div>
    )
  }
}

