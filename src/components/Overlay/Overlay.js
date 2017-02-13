import React, { Component } from 'react'
import { extendObservable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { classNames } from 'helpers'
import s from './Overlay.sass'

import { dur, ease } from 'config'


const mapStateToProps = ({device: {width, height}, dom: {update, data, params}}) => ({
  width, height,

  updateDom: (block, isOpen) => {
    extendObservable(block, {
      isOpen: false
    });

    update({
      name: 'overlay',
      block
    }, {
      isOpen
    })
  },

  isOpen: params.overlay && params.overlay.isOpen
});

@inject(mapStateToProps) @observer
export default class Overlay extends Component {
  dur = dur; ease = ease.in();

  state = {isMounted: false};

  show() {
    const { ease, dur } = this;

    TweenMax.fromTo(this.wrapper, dur, {
      opacity: 0,
      display: 'none'
    }, {
      opacity: this.props.opacity,
      display: 'block',
      ease
    })
  }
  hide() {
    const { ease, dur } = this;

    TweenMax.fromTo(this.wrapper, dur, {
      opacity: this.props.opacity,
      display: 'block'
    }, {
      opacity: 0,
      display: 'none',
      ease
    })
  }

  trigger(cond) {
    cond ? this.show() : this.hide();
  }

  componentWillReceiveProps(nextProps) {
    const props = this.props;

    if (nextProps.isOpen !== props.isOpen) {
      this.trigger(nextProps.isOpen);
    }
  }

  componentDidMount() {
    if (this.props.isOpen) {
      this.show();
    }

    this.setState({isMounted: true})
  }

  getRef = b => {
    this.props.updateDom(b, this.props.isOpen);
    console.log({props: this.props});
    this.wrapper = b;
  };

  render() {
    const { backgroundColor, zIndex, height, wrapperHeight, className, updateDom } = this.props;
    let styles = {
      backgroundColor,
      zIndex,
      height: wrapperHeight || (height + 'px')
    };

    if (!this.state.isMounted) {
      styles = {
        ...styles,
        opacity: 0,
        display: 'none'
      }
    }

    return (
      <div ref={this.getRef} style={styles}
           className={classNames(s.overlay, className)} />
    )
  }
}

