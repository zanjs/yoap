import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { NotificationSlider } from 'components'
import { statusTypes } from 'constants'
import { shallowEqual } from 'helpers'
import s from './DashboardNotification.sass'

import coolIcon from 'images/emoji/1.png'
import fiveIcon from 'images/emoji/2.png'
import kindIcon from 'images/emoji/3.png'
import spyIcon from 'images/emoji/4.png'
import eyesIcon from 'images/emoji/5.png'
import starsIcon from 'images/emoji/6.png'

const mapStateToProps = ({items: {users}, user}) => {
  const {
    _objects,
    banned,
    verified,
  } = user;

  return {
    data: [...users],
    objects: _objects,
    banned, verified
  }
};

@inject(mapStateToProps) @observer
export default class DashboardNotification extends Component {
  state = {
    slides: []
  };

  slidesConstructors = {
    banned: () => ({
      color: '#37474f',
      title: (
        <span>
          Мы подозреваем, что Вы агент. <br/>
          Ваш аккаунт и объявления заблокированы.
        </span>
      ),
      icon: spyIcon,
      buttons: [
        {
          children: 'Связь с модератором',
          type: 'gray'
        },
        {
          children: 'Подробнее',
          type: 'text'
        }
      ]
    }),
    restricted: link => ({
      color: '#616161',
      title: (
        <span>
          Объявление не прошло проверку. <br/>
          Пожалуйста, исправьте ошибки, мы проверим все ещё раз.
        </span>
      ),
      icon: eyesIcon,
      buttons: [
        {
          children: 'Исправить',
          type: 'blue',
          to: `/manage/${link}`
        },
        {
          children: 'Связь с модератором',
          type: 'text'
        }
      ]
    }),
    justCreated: link => ({
      color: '#1976d2',
      title: (
        <span>
          Ваше объявление успешно добавлено.
          Мы опубликуем его после проверки.
        </span>
      ),
      icon: starsIcon,
      buttons: [
        {
          children: 'Просмотр',
          type: 'pink',
          to: `/y/${link}`
        },
        {
          children: 'Изменить',
          type: 'text',
          to: `/manage/${link}`
        }
      ]
    }),
    verified: () => ({
      color: '#448aff',
      title: (
        <span>
          Ура! Ваш аккаунт подтвержден. <br/>
          Теперь Вы можете опубликовать свое первое объявление.
        </span>
      ),
      icon: coolIcon,
      buttons: [
        {
          children: 'Начать',
          type: 'pink',
          to: '/manage/create'
        },
        {
          children: 'Подробнее',
          type: 'text'
        }
      ]
    }),
    notVerified: () => ({
      color: '#ff8a80',
      title: (
        <span>
          Здравствуйте!<br/>
          Мы отправили Вам на почту письмо для активации аккаунта.
        </span>
      ),
      icon: fiveIcon,
      buttons: [
        {
          children: 'Повторить',
          type: 'blue'
        },
        {
          children: 'Подробнее',
          type: 'text'
        }
      ]
    }),
    onModeration: link => ({
      color: '#42d08a',
      title: (
        <span>
          Ваше объявление успешно отредактировано.
          Мы опубликуем его после проверки.
        </span>
      ),
      icon: kindIcon,
      buttons: [
        {
          children: 'Просмотр',
          type: 'blue',
          to: `/y/${link}`
        },
        {
          children: 'Изменить',
          type: 'text',
          to: `/manage/${link}`
        }
      ]
    }),
  };

  updateSlides = props => {
    const { data, verified, objects, banned } = props || this.props;
    const { types } = statusTypes;
    const create = this.slidesConstructors;
    let slides = [];

    // user has banned
    if (banned) {
      this.isChanged = true;
      const slide = create.banned();
      return this.setState({
        slides: [slide]
      })
    }

    if (verified && !objects.length) {
      slides.push(create.verified())
    }

    if (!verified) {
      slides.push(create.notVerified())
    }

    if (!data || !data.length)
      return this.setState({slides});

    // check restricted objects
    const restricted = data.find(
      item => item.status === types[2].id
    );
    if (restricted) {
      slides.push(
        create.restricted(restricted._link)
      )
    }

    // check on moderation objects
    const onModeration = data.find(
      item => !item.justCreated && item.status === types[0].id
    );
    if (onModeration) {
      slides.push(
        create.onModeration(onModeration._link)
      )
    }

    // check on just added objects
    const justCreated = data.find(
      item => item.justCreated
    );
    if (justCreated) {
      slides.push(
        create.justCreated(justCreated._link)
      )
    }

    if (slides.length)
      this.isChanged = true;

    return this.setState({slides})
  };

  componentWillMount() {
    this.updateSlides()
  }
  componentWillReceiveProps(nextProps, nextState) {
    if (this.isChanged)
      return this.isChanged = false;

    this.updateSlides(nextProps);
  }

  render() {
    return <NotificationSlider slides={this.state.slides}
                               changeBackground={this.props.changeBackground} />
  }
}

