import React, { Component } from 'react'
import { FlexGrid } from 'components'
import { classNames } from 'helpers'
import s from './RadioButton.sass'


export default class RadioButton extends Component {
  state = {
    isChecked: this.props.defaultValue === true || this.props.defaultValue == 'on'
  };
  triggerButton = () => {
    const isChecked = !this.state.isChecked;
    const onClick = this.props.onClick;
    const onChange = this.props.onChange;

    this.setState({isChecked});

    if (typeof onClick === 'function') {
      onClick(value);
    }

    if (typeof onChange === 'function') {
      onChange({
        target: this.input,
        isChecked
      });
    }
  };

  render() {
    const { name, className, label, isDisabled } = this.props;
    const { isChecked } = this.state;
    return (
      <FlexGrid onClick={this.triggerButton} justify="start" align="center"
                className={classNames(s.radio, className, isDisabled && s.disabled)}>
        <input disabled={isDisabled} readOnly name={name} checked={isChecked}
               type="radio" className={s.input} ref={b => this.input = b} />
        <span className={classNames(s.icon, isChecked && s.icon_active)} />
        {label && <label htmlFor={name} className={s.label}>{label}</label>}
      </FlexGrid>
    )
  }
}
