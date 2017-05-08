import React, { Component, PropTypes } from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import {
  ItemPageInfoEdit,
  ItemLocationEdit,
  ItemParametersEdit,
  ItemPageInfoScroller,
  ButtonsAction,
  LoadingAnimation,
  Button
} from 'components'
import {
  ItemPhotoEditContainer
} from 'containers'
import { randomNumber } from 'helpers'
import s from './ItemPageEdit.sass'

@inject(({filter, items, user, users, theme, manage}) => ({
  filter, manage,
  isFetching: user.isFetching || items.isFetching,
  user, items, users,
  theme
})) @observer
export default class ItemPageEdit extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  isMount = false;
  state = {
    saved: false,
    isEmpty: true
  };
  redirect = () => {
    return this.context.router.history.push('/login');
  }
  checkRules = (link, id, props = this.props) => {
    if (!props.user.isAuthorized) {
      return false;
    }
    if (!link || props.user.isAdmin) {
      return true;
    }
    if (!!id && props.user._objects.length) {
      return !!props.user._objects.find(objId => objId === id);
    } else if (!!id) {
      return false;
    }

    if (props.user._objects.length && !id) {
      return this.checkRules.bind(this, link);
    }

    return false;
  }
  getData = (cb) => {
    const { link } = this.props.match.params;
    const isBlank = this.isBlank(link);
    const isAuthorized = this.checkRules(!isBlank && link);

    if (!isAuthorized) {
      return this.redirect();
    }

    if (!isBlank) {
      this.props.items.findByLink(link, 'users', data => {
        const objId = data.id || data._id;
        if (typeof isAuthorized === 'function' && !isAuthorized(objId)) {
          return this.redirect();
        }

        this.props.manage.Import(data);
        this.setState({isEmpty: false})
      });

      return true;
    }

    return false;
  };
  isBlank = _link => {
    const link = _link || this.props.match.params.link;

    return link === 'create' || link === 'add' || link === 'new';
  }

  componentWillReceiveProps(nextProps) {
    const { link } = this.props.match.params;
    const newLink = nextProps.match.params;

    if (link !== newLink && this.isBlank(newLink)) {
      this.props.manage.CreateNew();
      this.setState({isEmpty: false})
    }
  }
  // entry point of initialize page
  // if this page exist at db -> insert that data
  // if not -> generate clean params
  componentWillMount() {
    const isExist = this.getData();
    const { userId } = this.props.match.params;

    if (!isExist) {
      this.props.manage.CreateNew(userId);
      this.setState({isEmpty: false})
    }

    this.props.theme.changeNav({
      isCustomMainButton: true,
      mainButton: {
        content: 'Сохранить',
        to: '/you',
        onClick: this.saveButtonClickHandler
      },
      links: [
        {
          to: '/you',
          content: 'Профиль'
        }
      ]
    })
  }
  componentDidMount() {
    this.isMount = true;
    setTimeout(() => this.isMount && this.forceUpdate(), 2000);
  }
  componentWillUnmount() {
    this.isMount = false;
    this.props.theme.changeNav({
      isCustomMainButton: false,
      mainButton: {
        content: '',
        to: ''
      },
      links: null
    })
  }

  onChange = () => {
    const shouldUpdate = randomNumber(1111,9999);

    this.setState({
      shouldUpdate
    })
  };

  submitHandler = () => {
    this.props.manage.Send(() => {
      this.setState({
        saved: true
      })
    });
  };

  saveButtonClickHandler = e => {
    e.preventDefault();

    this.submitHandler();

    return false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { state, props } = this;

    if (state.saved !== nextState.saved) {
      return true;
    }

    if (props.isFetching !== nextProps.isFetching) {
      return true;
    }

    return state.shouldUpdate !== nextState.shouldUpdate;
  }

  render() {
    const {
      state: {shouldUpdate, saved, isEmpty},
      props: {isFetching, user, match: {params}},
      submitHandler,
      onChange
    } = this;

    if (!user.isAuthorized || user.isAuthorized && params.userId && !user.isAdmin) {
      return <Redirect to='/login'/>
    }

    if (!user.verified) {
      return <Redirect to='/you'/>
    }

    if (saved) {
      return <Redirect to={user.isAdmin ? '/manage' : "/you"}/>
    }

    if (isEmpty) {
      return <div className={s.empty}>
        <LoadingAnimation />
      </div>
    }

    return (
      <div style={{opacity: isFetching ? .8 : 1}}>
        <ItemPageInfoScroller shouldUpdate={shouldUpdate} fixed={(
          <ItemPhotoEditContainer />
        )}>
          <ItemPageInfoEdit user={user} className={s.info} onUpdate={onChange} />
        </ItemPageInfoScroller>

        <ItemLocationEdit onUpdate={onChange} shouldUpdate={shouldUpdate}/>

        <ItemParametersEdit />
        <ButtonsAction withContainer>
          <Button type="text">Отменить</Button>
          <Button onClick={submitHandler} type="green">Готово</Button>
        </ButtonsAction>
        {isFetching && <LoadingAnimation />}
      </div>
    )
  }
}

