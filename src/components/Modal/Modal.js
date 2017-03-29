import React, { Component, PropTypes } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { classNames } from 'helpers'
import { Svg, Container, RouterStoreProvider } from 'components'
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
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  static Header = Header;

  _block = null;
  set block(b) {
    if (b) {
      this._block = b;
    }
  }
  get block() {
    if (this._block)
      return this._block;

    return document.querySelector(`.${s.container}`)
  }

  ease = Cubic.easeOut; dur = .35;
  y = 30;
  display;
  state = {shouldUpdate: false};

  isMount = false;

  mount() {
    const block = this.block =
      document.createElement('div');

    block.className = s.container;
    this.display = 'block';
    block.style.display = 'none';

    document.body.appendChild(block);
    this._render(this.fadeIn);
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

  _render(cb) {
    const {
      className, wrapperClassName,
      overlayClassName,
      children, getRef, ...rest
    } = this.props;

    return render(
      <RouterStoreProvider onMount={cb} router={this.context.router}>
        <div className={classNames(s.wrapper, wrapperClassName)}>
          <Container className={classNames(s.block, className)}
                     getRef={getRef} type="article" {...rest}>
            {children}
          </Container>
          <div onClick={this.close}
               className={classNames(s.overlay, overlayClassName)} />
        </div>
      </RouterStoreProvider>,

      this.block
    )
  }
  render() {
    return null;
  }
}
