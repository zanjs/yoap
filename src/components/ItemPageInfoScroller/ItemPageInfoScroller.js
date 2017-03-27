import React, { Component } from 'react'
import { inject } from 'mobx-react'
import s from './ItemPageInfoScroller.sass'

@inject(({device: {scrollY, height}}) => ({
  scrollY, height
}))
export default class ItemPageInfoScroller extends Component {
  state = {min: this.props.min, max: this.props.max};

  componentWillReceiveProps({scrollY, shouldUpdate}) {
    if (this.props.scrollY !== scrollY) {
      this.scroll(scrollY);
    }
    if (this.props.shouldUpdate !== shouldUpdate) {
      this.resizeHandler();
    }
  }

  resize = cb => {
    const { height } = this.props;
    const footerOffset = parseInt(this.footer.offsetTop, 10) - height;
    let { offsetTop, clientHeight } = this.wrapper;
    offsetTop = parseInt(offsetTop, 10);
    clientHeight = parseInt(clientHeight, 10);

    let min = offsetTop;
    let max = (offsetTop + clientHeight) - height;

    if (max > footerOffset) {
      max = footerOffset;
    }

    this.setState({
      min, max
    }, cb);
  };
  resizeHandler = () => setTimeout(() => {
    this.resize(() => this.scroll(this.props.scrollY));
  }, 100);

  componentDidMount() {
    this.footer = document.querySelector('footer');
    this.resizeHandler();
    window.addEventListener('resize', this.resizeHandler);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  scroll = pos => {
    const { min, max } = this.state;
    let y = pos + 0;

    if (y <= min)
      y = min;
    if (y >= max)
      y = max;

    console.log({
      y,
      min, max
    });

    this.static.style.top = `${y}px`;
  };

  getStaticRef = b => this.static = b;
  getWrapperRef = b => this.wrapper = b;
  getScrollerRef = b => this.scroller = b;

  render() {
    const { children, fixed, height, style } = this.props;

    return (
      <div ref={this.getWrapperRef} className={s.wrapper}>
        <div style={{height: `${height}px`}} ref={this.getStaticRef} className={s.static}>
          {fixed}
        </div>
        <div ref={this.getScrollerRef} className={s.scroller} style={style}>
          <div className={s.container}>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

