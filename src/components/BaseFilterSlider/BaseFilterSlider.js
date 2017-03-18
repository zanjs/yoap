import React, { Component } from 'react'
import { classNames } from 'helpers'
import s from './BaseFilterSlider.sass'


export default class BaseFilterSlider extends Component {
  scrollNeeded = false;
  wrapperWidth = 181; scrollerWidth = 181;
  offset = 54; position = 0; step = 5;

  componentDidMount() {
    setTimeout(this.resize, 300);
    window.addEventListener('resize', this.resizeHandler);
  }
  componentWillMount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  resize = () => {
    const wrapperWidth = this.wrapperWidth = parseInt(this.wrapper.clientWidth, 10);
    const scrollerWidth = this.scrollerWidth = parseInt(this.scroller.clientWidth, 10);
    this.offset = parseInt(this.wrapper.offsetLeft, 10);

    if (scrollerWidth > wrapperWidth) {
      this.scrollNeeded = true;
    } else {
      this.scrollNeeded = false;
    }

    this.setWrapperHeight();
  }
  resizeHandler = () => setTimeout(this.resize, 60);

  setWrapperHeight = () => {
    const [firstChild] = this.scroller.children;
    if (!firstChild)
      return;

    this.wrapper.style.height = `${parseInt(firstChild.clientHeight, 10)}px`;
  }
  getWrapperRef = b => this.wrapper = b;
  getScrollerRef = b => this.scroller = b;

  scroll = percent => {
    if (percent > 100) {
      percent = 100;
    }
    if (percent < 0) {
      percent = 0;
    }

    if (this.position === percent)
      return;

    this.position = percent;

    TweenMax.to(this.scroller, .3, {
      x: `-${percent - 20}%`,
      ease: Cubic.easeOut
    })
  }

  mouseMoveHandler = e => {
    if (!this.scrollNeeded) {
      return this.scroll(0)
    }

    const wrapperPercent = ((e.pageX - this.offset) / this.wrapperWidth) * 100;
    this.scroll(wrapperPercent);
  }
  wheelHandler = e => {
    if (!this.scrollNeeded) {
      return this.scroll(0)
    }

    e.preventDefault();
    const { position, step } = this;
    const y = e.deltaY;
    const x = e.deltaX;

    if (y !== 0) {
      if (y > 0) this.scroll(position + step)
      if (y < 0) this.scroll(position - step)
      return;
    }

    if (x !== 0) {
      if (x > 0) this.scroll(position + step)
      if (x < 0) this.scroll(position - step)
    }

    return false;
  }

  render() {
    const { className, children } = this.props;

    return (
      <div ref={this.getWrapperRef} onMouseMove={this.mouseMoveHandler}
           onWheel={this.wheelHandler}
           className={classNames(s.wrapper, className)}>
        <div ref={this.getScrollerRef} className={s.scroller}>
          {children}
        </div>
      </div>
    )
  }
}

