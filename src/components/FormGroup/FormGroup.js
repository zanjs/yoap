import React, { Component } from 'react'
import { classNames, isEmpty } from 'helpers'
import { Input } from 'components'
import { BLUE_COLOR, PINK_COLOR, GREEN_COLOR } from 'constants'
import s from './FormGroup.sass'


export default class FormGroup extends Component {
  componentDidMount() {
    if (this.props.defaultValue && this.props.onBlur) {
      setTimeout(() => {
        if (this.input && this.input.focus) {
          this.input.focus();
          this.input.blur();
        }
      }, 1000);
    }
  }

  renderMessage = (type, message) => {
    if (!type) {
      return null;
    }

    let color = '';
    switch(type) {
      case 'error':
        color = PINK_COLOR;
        break;
      case 'success':
        color = GREEN_COLOR;
        break;
      case 'normal':
        color = BLUE_COLOR;
        break;
    }

    if (isEmpty(message)) {
      return null;
    }

    return <span className={classNames(s.msg, this.props.disabled && s.msg_disabled)}
                 style={{color, borderColor: color}}>
      {message}
    </span>

  };

  getRef = (b) => {
    this.input = b;

    if (this.props.getRef) {
      this.props.getRef(b);
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { props } = this;

    if (props.defaultValue !== nextProps.defaultValue) {
      return false;
    }

    return true;
  }

  render() {
    const {
      name, getRef, isError,
      isSuccess, isNormal, ph,
      defaultValue, type, msg,
      required, disabled, wrapperClassName, ...rest
    } = this.props;

    let status = '';

    if (isError) {
      status = 'error'
    }

    if (isSuccess) {
      status = 'success'
    }

    if (isNormal) {
      status = 'normal'
    }

    return (
      <div className={classNames(s.group, wrapperClassName)}>
        <Input disabled={disabled} getRef={this.getRef} name={name} type={type ? type : 'text'}
               required={required} defaultValue={defaultValue} placeholder={ph} {...rest}/>
        {required && this.renderMessage(status, msg)}
      </div>
    )
  }
}

