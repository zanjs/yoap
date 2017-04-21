import React, { Component } from 'react'
import {
  Title, Button, FlexGrid
} from 'components'
import { shallowEqual, isEmpty as isEmptyData } from 'helpers'
import s from './NotificationSlider.sass'

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

export default class NotificationSlider extends Component {
  dur = .35;
  easeInOut = Power0.easeNone;
  easeIn = Cubic.easeOut;
  easeOut = Cubic.easeIn;
  delay = 11;

  current = -1;
  state = {
    slide: {}
  };

  isFocus = true;
  isEmpty = (props = this.props) =>
    !props.slides || !props.slides.length;

  nextSlide = props => {
    if (this.isEmpty(props))
      return;

    if (!this.isFocus)
      return this.props.slides
        && this.props.slides.length > 1
        && this.startProgress();

    this.to(this.current + 1, props);
  };

  to = (num, props = this.props, slideData) => {
    this.fadeOut(() => {
      // slide num can't be bigger than length
      // and smaller than zero
      const maxSlide = props.slides.length - 1;

      let slideNum = num;
      if (slideNum > maxSlide) {
        slideNum = 0;
      }

      if (slideNum < 0) {
        slideNum = maxSlide;
      }

      // set slide
      const slide = slideData || props.slides[slideNum];
      this.current = slideNum;
      maxSlide && this.startProgress();
      this.setState({slide}, this.fadeIn);

      // change bg color
      if (this.props.changeBackground)
        this.props.changeBackground(slide.color);
    })
  };

  fadeOut = onComplete => {
    const { dur, easeOut, wrapper } = this;

    if (!wrapper)
      return onComplete && onComplete();

    TweenMax.fromTo(wrapper, dur, {
      opacity: 1,
      y: 0
    }, {
      opacity: 0,
      ease: easeOut,
      onComplete
    })
  };
  fadeIn = onComplete => {
    const { dur, easeIn, wrapper } = this;

    if (!wrapper)
      return;

    TweenMax.fromTo(wrapper, dur, {
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
    const { delay, easeInOut, bar } = this;

    if (!bar)
      return;

    TweenMax.fromTo(bar, delay, {
      x: '0%'
    }, {
      x: '100%',
      ease: easeInOut
    })
  };

  startCycle = (toEmpty, props) => {
    if (this.isEmpty())
      return;
    if (toEmpty)
      this.current = -1;
    if (this.props.slides.length < 2)
      return this.nextSlide();

    this.nextSlide();
    clearInterval(this.interval);
    this.interval = setInterval(
      this.nextSlide,

      ((this.dur * 2) + this.delay) * 1000
    )
  };

  stopCycle = () => {
    clearInterval(this.interval);
  };

  componentDidMount() {
    this.startCycle();
    window.addEventListener('blur', this.blurPageHandler);
    window.addEventListener('focus', this.focusPageHandler);
  }
  componentWillUnmount() {
    this.stopCycle();
    window.removeEventListener('blur', this.blurPageHandler);
    window.removeEventListener('focus', this.focusPageHandler);
  }
  componentWillReceiveProps(nextProps) {
    if (
      shallowEqual(nextProps.slides, this.props.slides)
      || this.isEmpty() && !this.isEmpty(nextProps)
    ) {
      return this.setState({newProps: true})
    }

    if (nextProps.slides && nextProps.slides.length < 2 && nextProps.slides[0]) {
      this.to(0, nextProps, nextProps.slides[0]);
    }
  }
  componentDidUpdate() {
    if (this.state.newProps) {
      this.setState({
        newProps: false
      }, () => this.startCycle(true))
    }
  }

  blurPageHandler = () => this.isFocus = false;
  focusPageHandler = () => this.isFocus = true;

  clickHandler = () => {
    if (this.props.slides.length < 2)
      return;

    return this.startCycle();
  };

  getBarRef =     b => this.bar = b;
  getWrapperRef = b => this.wrapper = b;

  render() {
    if (this.isEmpty() || isEmptyData(this.state.slide))
      return null;

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

