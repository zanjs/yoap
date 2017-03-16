import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
