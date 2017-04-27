import React, { Component } from 'react'
import { FlexGrid, Button } from 'components'
import { classNames } from 'helpers'
import s from './InputNumber.sass'

const CircleButton = ({className, ...rest}) => (
  <button className={classNames(Button.resetClassName, s.btn, className)} {...rest}/>
)

export default class InputNumber extends Component {
  static defaultProps = {
    step: 1, defaultValue: 0, maxValue: 100, minValue: 0
  };

  state = {value: this.props.defaultValue};
  timoutTime = 450;
  intervalTime = 100;
  timeoutId;
  intervalId;
  isHolding = true;

  checkLimit = (value, props = this.props) => {
    if (value < props.minValue) return props.minValue;
    if (value > props.maxValue) return props.maxValue;

    return value;
  };

  increase = () => this.setState(({value}) => ({
    value: this.checkLimit(value + this.props.step)
  }));
  decrease = () => this.setState(({value}) => ({
    value: this.checkLimit(value - this.props.step)
  }))

  clearTimeouts = () => {
    this.isHolding = false;
    clearTimeout(this.timeoutId);
    clearInterval(this.intervalId);
  };

  setHold = cb => {
    cb();
    this.isHolding = true;
    this.timeoutId = setTimeout(() => {
      if (this.isHolding) {
        this.intervalId = setInterval(() => {
          cb();
        }, this.intervalTime);
      }
    }, this.timoutTime);
  };

  increaseMouseDownHandler = () => {
    this.setHold(this.increase);
  };
  increaseMouseUpHandler = () => {
    this.clearTimeouts();
  };
  decreaseMouseDownHandler = () => {
    this.setHold(this.decrease);
  };
  decreaseMouseUpHandler = () => {
    this.clearTimeouts();
  };

  componentWillReceiveProps(nextProps) {
    const { minValue, maxValue } = this.props;
    if (minValue !== nextProps.minValue || maxValue !== nextProps.maxValue) {
      this.setState(state => ({
        value: this.checkLimit(state.value, nextProps)
      }))
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.onChange && this.state.value !== nextState.value) {
      this.props.onChange(nextState.value);
    }
  }
  componentWillUnmount() {
    this.clearTimeouts();
  }

  render() {
    const {
      className, buttonsClassName, children, title,
      minValue, maxValue, step, ...rest
    } = this.props;
    const {
      increaseMouseDownHandler,
      increaseMouseUpHandler,
      decreaseMouseDownHandler,
      decreaseMouseUpHandler
    } = this;
    return (
      <FlexGrid tag="span" justify="stretch" align="center"
                className={classNames(s.wrapper, className)} {...rest}>
        {children}
        <FlexGrid tag="span" justify="stretch" align="center"
                  className={classNames(buttonsClassName, s.buttons)}>
          <CircleButton onMouseDown={decreaseMouseDownHandler}
                        onMouseUp={decreaseMouseUpHandler}
                        className={s.minus} />
          {title}
          <CircleButton onMouseDown={increaseMouseDownHandler}
                        onMouseUp={increaseMouseUpHandler}
                        className={s.plus} />
        </FlexGrid>
      </FlexGrid>
    )
  }
}

