import React, { Component, PropTypes } from 'react'
import { inject, observer } from 'mobx-react'
import { LoadingAnimation } from 'components'
import {
  ItemPageParametersContainer,
  ItemPageInfoContainer,
  ItemPageLocationContainer
} from 'containers'
import { randomNumber, normalizeScroll, isEmpty } from 'helpers'
import s from './ItemPage.sass'

const mapStateToProps = ({items, theme, user}) => ({
  items, user, theme
});

@inject(mapStateToProps) @observer
export default class ItemPage extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

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

  backButtonClickHandler = e => {
    e.preventDefault();

    this.context.router.history.goBack();

    return false;
  };

  componentWillMount() {
    normalizeScroll(true);
    this.setData();

    const routerAction = this.context.router && this.context.router
        .history.action.toLowerCase();

    if (routerAction === 'push') {
      const { isAuthorized } = this.props.user;
      this.props.theme.changeNav({
        isCustomMainButton: true,
        mainButton: {
          to: '/y',
          content: 'Назад',
          onClick: this.backButtonClickHandler
        },
        links: [{
          to: isAuthorized ? '/you' : '/login',
          content: isAuthorized ? 'Профиль' : 'Войти'
        }]
      })
    }
  }
  componentWillUnmount() {
    normalizeScroll(false);
    this.props.items.setCurrent({});

    this.props.theme.changeNav({
      isCustomMainButton: false,
      mainButton: {
        to: '',
        content: ''
      },
      links: null
    })
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
  };

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
        <ItemPageParametersContainer data={types} size={_size} />
      </div>
    )
  }
}

