import React, { Component } from 'react'
import { FlexGrid } from 'components'
import { classNames } from 'helpers'
import s from './Slider.sass'


export default class Slider extends Component {
  static defaultProps = {
    data: [1,2,3,4,5]
  };

  state = {current: 0};

  slides = [];
  dur = .3; ease = Cubic.easeOut;

  getSlideRef = index => b =>
    this.slides[index] = b;


  to = index => {
    const { dur, ease, props: {getCurrentSlide} } = this;
    this.slides.forEach((slide, key) => {
      let animation = {
        opacity: 0,
        display: 'none',
        ease
      };

      if (key === index) {
        animation = {
          opacity: 1,
          display: 'block',
          ease
        };

        this.setState({current: index}, () => {
          if (getCurrentSlide) {
            getCurrentSlide(index);
          }
        });
      }

      TweenMax.to(slide, dur, animation)
    });
  };

  componentDidMount() {
    this.to(0);
  }

  getWrapperRef = b => {
    this.wrapper = b;

    if (this.props.getWrapperRef) {
      this.props.getWrapperRef(b);
    }
  };

  render() {
    const {
      props: {
        data, className,
        onMouseMove,
      },
      state: { current },
      getSlideRef, getWrapperRef,
      to,
    } = this;

    const needNav = !!(data && data.length > 1);

    return (
      <div ref={getWrapperRef} onMouseMove={onMouseMove}
           className={classNames(s.wrapper, className)}>
        <div className={s.frame}>
          {data.map((item, index) => (
            <div ref={getSlideRef(index)} key={index} className={s.slide}>
              {item}
            </div>
          ))}
        </div>
        {needNav && <FlexGrid justify="center" align="center"
                              className={s.nav}>
          {data.map((item, index) => (
            <div onClick={() => to(index)} key={index}
                 className={classNames(s.nav__item, index === current && s.nav__item_active)} />
          ))}
        </FlexGrid>}
      </div>
    )
  }
}

