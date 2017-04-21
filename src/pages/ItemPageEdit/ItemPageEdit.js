import React, { Component } from 'react'
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

@inject(({filter, items, user, manage}) => ({
  filter, manage,
  isFetching: user.isFetching || items.isFetching,
  user, items
})) @observer
export default class ItemPageEdit extends Component {
  isMount = false;
  state = {
    saved: false,
    isEmpty: true
  };

  getData = () => {
    const { link } = this.props.match.params;

    if (!this.isBlank(link)) {
      this.props.items.findByLink(link, 'users', data => {
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

    if (!isExist) {
      this.props.manage.CreateNew();
      this.setState({isEmpty: false})
    }
  }
  componentDidMount() {
    this.isMount = true;
    setTimeout(() => this.isMount && this.forceUpdate(), 2000);
  }
  componentWillUnmount() {
    this.isMount = false;
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
      props: {isFetching, user},
      submitHandler,
      onChange
    } = this;

    if (saved) {
      return <Redirect to={user.isAdmin ? '/manage' : "/you"}/>
    }

    if (isEmpty) {
      return <div className={s.empty}>
        <LoadingAnimation />
      </div>
    }

    return (
      <div style={{opacity: isFetching ? .5 : 1}}>
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

