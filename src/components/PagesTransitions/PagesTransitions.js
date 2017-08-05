import React, { Component } from 'react'
import { withRouter, Switch } from 'react-router-dom'
import s from './PagesTransitions.sass'


@withRouter
export default class PagesTransitions extends Component {
  dur = .4;
  ease = Power1.easeInOut;
  Afterlag;

  exceptions = [
    {path: '/checkout', noCheck: true},
  ];

  whiteList = [];

  componentWillMount() {
    System.import('afterlag-js').then(data => {
      this.Afterlag = window.Afterlag;
    })
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
      this.update(this.props.location.pathname, location.pathname)
    }
  }

  isException = (prev, next) => {
    const { exceptions, whiteList } = this;
    const noCheck = exceptions.filter(it => it.noCheck);

    const isException = !!exceptions.find(it => (
      prev.indexOf(it.path) !== -1 && next.indexOf(it.path) !== -1
    ));

    if (!isException)
      return isException;

    const isWhite = !!whiteList.find(it => (
      prev.indexOf(it.path) !== -1 || next.indexOf(it.path) !== -1
    ));

    if (isWhite)
      return false;

    return !!noCheck.find(it => (
      prev.indexOf(it.path) !== -1 || next.indexOf(it.path) !== -1
    ));
  };

  shallowEqual(prev, next) {
    if (prev.hash !== next.hash) {
      return false;
    }
    if (prev.search !== next.search) {
      return false;
    }

    return prev.pathname === next.pathname
  }

  update(prev, next) {
    if (!prev || !next) {
      return this.animation();
    }

    const isException = this.isException(prev, next);

    if (isException) {
      return this.animation(isException);
    }

    this.animation();
  }

  animation(isException) {
    if (isException)
      return null;

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

