import React, { Component } from 'react'
import { Link } from 'components'
import { classNames } from 'helpers'
import { bigDur, ease as easeConfig } from 'config'
import s from './Button.sass'


export default class Button extends Component {
  dur = bigDur; ease = easeConfig.inOut();

  state = {isLoading: false, children: this.props.children, className: null};

  getType = (value) => {
    const type = value && value.replace(new RegExp(' ', 'gi'), '').replace(new RegExp('min', 'gi'), '');

    let className = s[type] ? s[type] : s.btn;

    return (value.indexOf('min') !== -1 ? `${className} ${s.min}` : className)
  };

  getElement = (b) => {
    if (!b) {
      return this.el;
    }

    if (
      typeof b === 'function' ||
      b.nodeType == null
    ) {
      return this.el;
    }

    this.el = b;

    if (typeof this.props.getRef === 'function') {
      this.props.getRef(this.el);
    }
  };

  renderLoader = (cb) => (
    <div ref={b => cb(b)} className={s.loader}/>
  );

  loadingAnimation = (isRequired) => {
    if (!this.el || !this.props.isLoading && !isRequired) return;
    const { dur, ease } = this;
    let block;

    const color = window.getComputedStyle(this.el).color;

    const firstStep = (block, cb) => {
      TweenMax.to(block, dur, {
        boxShadow: color + ' 0 0 0 1px', ease,
        onComplete: cb
      });
    };
    const secondStep = (block, cb) => {
      TweenMax.to(block, dur, {
        boxShadow: color + ' 0 0 0 10px', ease,
        onComplete: cb
      });
    };

    // animation loop
    const animation = (block = block) => {
      if (!this.props.isLoading) return;
      return firstStep(block, () => {
        return secondStep(block, animation)
      });
    };

    return this.setState({
      children: this.renderLoader((b) => {
        block = b;
        animation(b);
      }),
      className: s.loading
    });
  };
  // fadeInLoadingAnimation = () => {
  //   if (!this.el) return;
  //
  //   // TODO: Loading Fade In Animation on button
  // };
  // fadeOutLoadingAnimation = () => {
  //   if (!this.el) return;
  //   // TODO: Loading Fade Out Animation on button
  // };

  startLoadingAnimation = () => {
    this.loadingAnimation(true);
  };
  endLoadingAnimation = () => {
    //this.loadingAnimation();
  };

  componentDidMount() {
    if (this.props.isLoading) {
      this.startLoadingAnimation();
    }
  }

  componentWillUpdate() {
    if (this.props.isLoading) {
      this.startLoadingAnimation();
    } else {
      this.endLoadingAnimation();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { props } = this;

    if (props.children !== nextProps.children) {
      this.setState({children: nextProps.children});
    }
  }


  render() {
    const { tag, type, className, children,
      isLoading, getRef, isDisabled, buttonType,

      ...rest
    } = this.props;
    let Element = tag ? tag : rest.to ? Link : 'button';
    const stateChildren = this.state.children;
    const stateClassName = this.state.className;

    let _type = typeof type !== 'string' ? '' : type;

    return (
      <Element ref={this.getElement} disabled={isDisabled} type={buttonType}
               className={classNames(s.button, this.getType(_type), className, stateClassName)} {...rest}>
        {stateChildren}
      </Element>
    )
  }
}
