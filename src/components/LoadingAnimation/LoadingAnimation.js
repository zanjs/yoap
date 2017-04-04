import React, { Component } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import s from './LoadingAnimation.sass'


export default class LoadingAnimation extends Component {
  dur = .7; ease = Cubic.easeInOut;
  easeOut = Cubic.easeOut;

  animationState;
  block;
  isMount = false;
  interval;

  mount = () => {
    const block = this.block = document.createElement('div');
    block.className = s.wrapper;
    document.body.appendChild(block);
    this._render();
    this.isMount = true;
  };
  unMount = () => {
    this.fadeOut(() => {
      unmountComponentAtNode(this.block);
      document.body.removeChild(this.block);
      this.block = null;
      this.isMount = false;
    })
  };

  componentDidMount() {
    this.mount(); this.fadeIn();
  }
  componentWillUnmount() {
    this.fadeOut(this.unMount)
  }

  fadeIn = onComplete => {
    //this.animate();
    this.loadingAnimation()
  };
  fadeOut = onComplete => {
    this.stopAnimation();
    const { dur, easeOut } = this;

    TweenMax.to(this.bar, dur, {
      x: '100%',
      ease: easeOut,
      onComplete:
        () => setTimeout(onComplete, 100)
    })
  };

  stopAnimation = () => {
    clearInterval(this.interval);
    return this.animationState && this.animationState.kill()
  };

  animate = () => {
    if (!this.isMount && !this.bar)
      return this.stopAnimation();

    const { dur, ease } = this;

    this.animationState =
      TweenMax.fromTo(this.bar, dur, {
        x: '-100%',
        opacity: 1
      }, {
        x: '100%',
        ease
      })
  };
  loadingAnimation = () => {
    this.interval = setInterval(
      this.animate, this.dur * 1000
    )
  };

  getBarRef = b => this.bar = b;

  _render() {
    render(
      <div ref={this.getBarRef} className={s.bar} />,

      this.block
    )
  }
  render() {
    return null
  }
}

