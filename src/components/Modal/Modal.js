import React, { Component } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { classNames } from 'helpers'
import { Svg, Container } from 'components'
import { blockScroll } from 'helpers'
import s from './Modal.sass'

import closeIcon from 'icons/ui/close.svg'

const Header = ({className, onCloseClick, close, children, ...rest}) => (
  <header className={classNames(s.header, className)}
          {...rest}>
    {children}
    <Svg src={closeIcon} className={s.close}
         onClick={onCloseClick} {...close}/>
  </header>
);

export default class Modal extends Component {
  static Header = Header;
  ease = Cubic.easeOut; dur = .3;
  y = 30;
  display;
  state = {shouldUpdate: false};

  block;
  isMount = false;

  mount() {
    const block = this.block =
      document.createElement('div');

    block.className = s.container;
    this.display = 'block';
    block.style.display = 'none';

    document.body.appendChild(block);
    this._render();
    this.fadeIn();
  }
  unMount() {
    //this.props.triggerOverlay(false);
    this.fadeOut(() => {
      unmountComponentAtNode(this.block);
      document.body.removeChild(this.block);
      this.block = null;
      this.isMount = false;
    });
  }

  fadeIn = onComplete => {
    const { dur, ease, y, block, display } = this;

    blockScroll(true);

    //this.props.triggerOverlay(true);
    TweenMax.fromTo(block, dur, {
      opacity: 0,
      y,
      display: 'none'
    }, {
      opacity: 1,
      y: 0,
      ease,
      display,
      onComplete
    })
  };
  fadeOut = onComplete => {
    const { dur, ease, y, block } = this;

    TweenMax.to(block, dur, {
      opacity: 0,
      y,
      ease,
      onComplete: () => {
        blockScroll(false);

        if (onComplete) {
          onComplete();
        }
      }
    })
  };

  componentWillMount() {
    if (this.props.overlay) {
      this.props.changeOverlay(this.props.overlay);
    }

    this.mount();
  }
  componentWillUnmount() {
    this.unMount();
  }
  componentDidUpdate() {
    this._render();
  }


  close = () => {
    if (this.props.close) {
      this.props.close()
    }
  };

  _render() {
    const { className, wrapperClassName, children } = this.props;

    return render(
      <div className={classNames(s.wrapper, wrapperClassName)}>
        <Container type="article"
                   className={classNames(s.block, className)}>
          {children}
        </Container>
        <div onClick={this.close} className={s.overlay} />
      </div>,

      this.block
    )
  }
  render() {
    return null;
  }
}
