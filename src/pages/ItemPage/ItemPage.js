import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { LoadingAnimation } from 'components'
import {
  ItemPageParametersContainer,
  ItemPageInfoContainer,
  ItemPageLocationContainer
} from 'containers'
import { randomNumber, normalizeScroll, isEmpty } from 'helpers'
import s from './ItemPage.sass'

const mapStateToProps = ({items, user}) => ({
  items, user
});

@inject(mapStateToProps) @observer
export default class ItemPage extends Component {
  state = {
    shouldUpdate: 0
  };

  onChange = () => {
    const shouldUpdate = randomNumber(1111,9999);

    this.setState({
      shouldUpdate
    })
  };

  componentWillReceiveProps(nextProps) {
    const {match: {params}, data} = nextProps;
    const { props } = this;
    if (props.match.params.link !== params.link || data !== props.data) {
      this.setData(nextProps);
    }
  }

  setData = (props = this.props) => {
    const { match: {params} } = props;

    if (!params.link)
      return;

    this.props.items.findByLink(params.link, 'data', data => {
      this.props.items.setCurrent(data);
      this.updateViews();
    });
  };

  componentWillMount() {
    normalizeScroll(true);
    this.setData();
  }
  componentWillUnmount() {
    normalizeScroll(false);
    this.props.items.setCurrent({});
  }

  updateViews = () => {
    const { id } = this.props.items.current;
    if (isEmpty(id))
      return null;

    this.props.items.updateItemViews(id, () => {
      const views = this.props.items.current.views;
      this.props.items.changeCurrent({
        views: views + 1
      });
    });
  }

  render() {
    const {
      state: {shouldUpdate},
      props: {items: {current}},
      onChange
    } = this;

    if (isEmpty(current)) {
      return <div className={s.empty}>
        <LoadingAnimation />
      </div>
    }

    const { types, size, floors } = current;

    const _size = {
      ...size,
      floors
    };

    return (
      <div>
        {/* Object title, des, images, price, rating, etc. */}
        <ItemPageInfoContainer shouldUpdate={shouldUpdate}/>
        {/* Object location */}
        <ItemPageLocationContainer onChange={onChange} shouldUpdate={shouldUpdate}/>
        {/* Object params */}
        <ItemPageParametersContainer onChange={onChange} data={types} size={_size} />
      </div>
    )
  }
}

