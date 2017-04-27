import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import s from './PagesTransitions.sass'


@withRouter
export default class PagesTransitions extends Component {
  dur = .7;
  ease = Cubic.easeOut;

  componentDidMount() {
    this.update();
  }

  componentDidUpdate({location}) {
    // compare old and new location
    // to detect changes and prevent
    // launching animation when
    // we don't need that
    const isEqual = this.shallowEqual(
      location, this.props.location
    );

    if (!isEqual) {
      this.update()
    }
  }

  shallowEqual(prev, next) {
    if (prev.hash !== next.hash) {
      return false;
    }
    if (prev.search !== next.search) {
      return false;
    }

    return prev.pathname === next.pathname
  }

  update() {
    this.animation();
  }

  animation() {
    //if (!this.wrapper) return;
    //const { dur, ease } = this;

    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    // TweenMax.fromTo(this.wrapper, dur, {
    //   opacity: 0,
    //   //y: 200
    // }, {
    //   opacity: 1,
    //   //y: 0,
    //   ease
    // })
  }

  getRef = b => {
    this.wrapper = b;
  };

  render() {
    return (
      <div className={s.wrapper} ref={this.getRef}>
        {this.props.children}
      </div>
    )
  }
}

