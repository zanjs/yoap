import React, { Component } from 'react'
import { classNames } from 'helpers'
import s from './BaseFilterSlider.sass'


export default class BaseFilterSlider extends Component {
  scrollNeeded = false;
  wrapperWidth = 181; scrollerWidth = 181;
  offset = 54; position = 0; step = 5;
  isMount = false;

  componentWillMount() {
    this.isMount = true;
  }
  componentDidMount() {
    const { defaultValue, snap, defaultSnapElement } = this.props;
    setTimeout(() => {
      this.resize();

      if (defaultValue != null) {
        this.scroll(defaultValue, true);
      }

      if (snap && defaultSnapElement != null) {
        if (typeof defaultSnapElement === 'function') {
          const block = defaultSnapElement();
          block && this.__scroll(-(block.offsetLeft + 5));
        }
      }
    }, 300);
    window.addEventListener('resize', this.resizeHandler);
  }
  componentWillUnmount() {
    this.isMount = false;
    window.removeEventListener('resize', this.resizeHandler);
  }

  resize = () => {
    if (!this.isMount)
      return;

    const wrapperWidth = this.wrapperWidth = parseInt(this.wrapper.clientWidth, 10);
    const scrollerWidth = this.scrollerWidth = parseInt(this.scroller.clientWidth, 10);
    this.offset = parseInt(this.wrapper.offsetLeft, 10);

    if (scrollerWidth > wrapperWidth) {
      this.scrollNeeded = true;
    } else {
      this.scrollNeeded = false;
    }

    this.setWrapperHeight();
  };
  resizeHandler = () => setTimeout(this.resize, 60);

  setWrapperHeight = () => {
    const [firstChild] = this.scroller.children;
    if (!firstChild)
      return;

    this.wrapper.style.height = `${parseInt(firstChild.clientHeight, 10)}px`;
  };
  getWrapperRef = b => this.wrapper = b;
  getScrollerRef = b => this.scroller = b;

  __scroll = x => {
    TweenMax.to(this.scroller, .3, {
      x,
      ease: Cubic.easeOut
    })
  }

  scroll = (_percent, noOffset) => {
    let percent = _percent;

    if (percent > 1) {
      percent = 1;
    }
    if (percent < 0) {
      percent = 0;
    }

    if (noOffset) {
      percent += .2;
    }

    if (this.position === percent)
      return;

    this.position = percent;

    this.__scroll(-(this.scrollerWidth * percent));
  };

  mouseMoveHandler = e => {
    if (!this.scrollNeeded) {
      return this.scroll(0)
    }

    const wrapperPercent = ((e.pageX - this.offset) / this.wrapperWidth);
    this.scroll(wrapperPercent);
  };
  wheelHandler = e => {
    if (!this.scrollNeeded) {
      return this.scroll(0)
    }

    e.preventDefault();
    const { position, step } = this;
    const y = e.deltaY;
    const x = e.deltaX;

    if (y !== 0) {
      if (y > 0) this.scroll(position + step);
      if (y < 0) this.scroll(position - step);
      return;
    }

    if (x !== 0) {
      if (x > 0) this.scroll(position + step);
      if (x < 0) this.scroll(position - step);
    }

    return false;
  };
  clickHandler = e => {
    if (!this.props.snap)
      return;
    const { target } = e;
    const { className } = target;
    if (className.indexOf(s.wrapper) === -1 && className.indexOf(s.scroller) === -1) {
      this.snap = -(target.offsetLeft + 5)
    }
  };
  mouseLeaveHandler = () => {
    if (this.snap != null) {
      this.__scroll(this.snap);
    }
  }

  render() {
    const { className, children } = this.props;

    return (
      <div ref={this.getWrapperRef} onMouseMove={this.mouseMoveHandler}
           onWheel={this.wheelHandler} onClick={this.clickHandler}
           onMouseLeave={this.mouseLeaveHandler}
           className={classNames(s.wrapper, className)}>
        <div ref={this.getScrollerRef} className={s.scroller}>
          {children}
        </div>
      </div>
    )
  }
}

