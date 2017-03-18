import React, { Component } from 'react'
import { FlexGrid, Button } from 'components'
import { classNames } from 'helpers'
import s from './InputNumber.sass'

const CircleButton = ({className, onClick}) => (
  <button onClick={onClick} className={classNames(Button.resetClassName, s.btn, className)}/>
)

export default class InputNumber extends Component {
  static defaultProps = {
    step: 1, defaultValue: 0, maxValue: 100, minValue: 0
  };

  state = {value: this.props.defaultValue};

  checkLimit = value => {
    if (value < this.props.minValue) return this.props.minValue;
    if (value > this.props.maxValue) return this.props.maxValue;

    return value;
  };

  increase = () => this.setState(({value}) => ({
    value: this.checkLimit(value + this.props.step)
  }));
  decrease = () => this.setState(({value}) => ({
    value: this.checkLimit(value - this.props.step)
  }))

  componentWillUpdate(nextProps, nextState) {
    if (this.props.onChange && this.state.value !== nextState.value) {
      this.props.onChange(nextState.value);
    }
  }

  render() {
    const { className, buttonsClassName, children, title,
      minValue, maxValue, step, ...rest } = this.props;
    return (
      <FlexGrid tag="span" justify="stretch" align="center"
                className={classNames(s.wrapper, className)} {...rest}>
        {children}
        <FlexGrid tag="span" justify="stretch" align="center"
                  className={classNames(buttonsClassName, s.buttons)}>
          <CircleButton onClick={this.decrease} className={s.minus} />
          {title}
          <CircleButton onClick={this.increase} className={s.plus} />
        </FlexGrid>
      </FlexGrid>
    )
  }
}

