import React, { Component } from 'react'
import {
  Container, Title, Button,
  FlexGrid
} from 'components'
import s from './DashboardNotification.sass'

import coolIcon from 'images/emoji/1.png'
import fiveIcon from 'images/emoji/2.png'
import kindIcon from 'images/emoji/3.png'
import spyIcon from 'images/emoji/4.png'
import eyesIcon from 'images/emoji/5.png'
import starsIcon from 'images/emoji/6.png'

const Notification = ({children, onClick, getRef, title, icon, buttons}) => (
  <div ref={getRef} onClick={onClick}
       className={s.wrapper}>
    {title && <FlexGrid justify="space-between" align="center"
              className={s.content}>
      <Title className={s.title} white size="1" nooffsets>
        {title}
      </Title>
      <img className={s.icon} src={icon}/>
    </FlexGrid>}
    {children}
    {buttons && <FlexGrid justify="start" align="center"
              tag="footer" className={s.footer}>
      {buttons.map(({children, ...rest}, key) => (
        <Button className={s.btn} key={key} {...rest}>
          {children}
        </Button>
      ))}
    </FlexGrid>}
  </div>
);

export default class DashboardNotification extends Component {
  dur = .35;
  easeInOut = Power0.easeNone;
  easeIn = Cubic.easeOut;
  easeOut = Cubic.easeIn;
  delay = 11;

  current = -1;
  state = {
    slide: {}
  };
  slides = [
    {
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
    },
    {
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
    },
    {
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
          type: 'blue'
        },
        {
          children: 'Подробнее',
          type: 'text'
        }
      ]
    },
    {
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
    },
    {
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
          children: 'Связь с модератором',
          type: 'blue'
        },
        {
          children: 'Подробнее',
          type: 'text'
        }
      ]
    },
    {
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
          type: 'pink'
        },
        {
          children: 'Подробнее',
          type: 'text'
        }
      ]
    }
  ];

  isFocus = true;

  nextSlide = () => {
    if (!this.isFocus)
      return this.startProgress();

    this.to(this.current + 1);
  };

  to = num => {
    this.fadeOut(() => {
      // slide num can't be bigger than length
      // and smaller than zero
      const maxSlide = this.slides.length - 1;

      let slideNum = num;
      if (slideNum > maxSlide) {
        slideNum = 0;
      }

      if (slideNum < 0) {
        slideNum = maxSlide;
      }

      // set slide
      const slide = this.slides[slideNum];
      this.current = slideNum;
      this.setState({slide});
      this.fadeIn();
      maxSlide && this.startProgress();

      // change bg color
      if (this.props.changeBackground)
        this.props.changeBackground(slide.color);
    })
  };

  fadeOut = onComplete => {
    const { dur, easeOut } = this;

    TweenMax.fromTo(this.wrapper, dur, {
      opacity: 1,
      y: 0
    }, {
      opacity: 0,
      ease: easeOut,
      onComplete
    })
  };
  fadeIn = onComplete => {
    const { dur, easeIn } = this;

    TweenMax.fromTo(this.wrapper, dur, {
      y: 20,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      ease: easeIn,
      onComplete
    })
  };
  startProgress = () => {
    const { delay, easeInOut } = this;

    TweenMax.fromTo(this.bar, delay, {
      x: '0%'
    }, {
      x: '100%',
      ease: easeInOut
    })
  };

  startCycle = () => {
    if (this.slides.length < 2)
      return this.nextSlide();

    this.nextSlide();
    clearInterval(this.interval);
    this.interval = setInterval(
      this.nextSlide,

      ((this.dur * 2) + this.delay) * 1000
    )
  };
  stopCycle = () => {
    this.clearInterval(this.interval);
  };

  componentDidMount() {
    this.startCycle();
    window.addEventListener('blur', this.blurPageHandler);
    window.addEventListener('focus', this.focusPageHandler);
  }
  componentWillUnmount() {
    window.removeEventListener('blur', this.blurPageHandler);
    window.removeEventListener('focus', this.focusPageHandler);
  }
  blurPageHandler = () => this.isFocus = false;
  focusPageHandler = () => this.isFocus = true;

  clickHandler = () => {
    return this.startCycle();
  };

  getBarRef =     b => this.bar = b;
  getWrapperRef = b => this.wrapper = b;

  render() {
    return (
      <Notification onClick={this.clickHandler}
                    getRef={this.getWrapperRef}
                    {...this.state.slide}>
        <div className={s.progress}>
          <div ref={this.getBarRef} className={s.bar} />
        </div>
      </Notification>
    )
  }
}

