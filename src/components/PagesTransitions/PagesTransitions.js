import React, { Component } from 'react'
import { withRouter, Switch } from 'react-router-dom'
import s from './PagesTransitions.sass'


@withRouter
export default class PagesTransitions extends Component {
  dur = .4;
  ease = Power1.easeInOut;
  Afterlag;

  componentWillMount() {
    System.import('afterlag-js').then(data => {
      this.Afterlag = window.Afterlag;
    })
  }
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
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    if (!this.wrapper) return;
    const { dur, ease } = this;

    if (this.Afterlag) {
      TweenMax.set(this.wrapper, {
        opacity: 1,
        display: 'block'
      });

      const afterlag = new Afterlag({
        delay: 60,
        timeout: 300
      });

      return afterlag.run(() => {
        TweenMax.to(this.wrapper, dur, {
          opacity: 0,
          display: 'none',
          ease
        })
      })
    }

    TweenMax.fromTo(this.wrapper, dur, {
      opacity: 1,
      display: 'block'
      //y: 200
    }, {
      opacity: 0,
      display: 'none',
      //y: 0,
      ease
    })
  }

  getRef = b => {
    this.wrapper = b;
  };

  render() {
    return (
      <div className={s.wrapper}>
        <Switch>{this.props.children}</Switch>
        <div className={s.overlay} ref={this.getRef}/>
      </div>
    )
  }
}

