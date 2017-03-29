import React, { Component } from 'react'
import { BaseFilterItem, InputClean, FlexGrid } from 'components'
import s from './BaseFilterPrice.sass'


export default class BaseFilterPrice extends Component {
  static defaultProps = {
    min: 25000,
    max: 45000
  };

  state = {
    min: this.props.min,
    max: this.props.max,
    isActive: false
  };

  minHandler = ({target: {value}}) => {
    const min = parseInt(value, 10);
    const { max } = this.state;

    if (min >= max) {
      this.setInputs(min, min);
      return this.setState({min, max: min});
    }

    return this.setState({min});
  };
  maxHandler = ({target: {value}}) => {
    const max = parseInt(value, 10);
    const { min } = this.state;

    if (max <= min) {
      this.setInputs(max, min);
      return this.setState({min: max, max});
    }

    return this.setState({max});
  };

  onChange = () => {
    const { props, state } = this;

    if (state.isActive)
      return;

    if (state.min !== props.min || state.max !== props.max) {
      this.setState({isActive: true})
    }
  };

  setInputs = (min = this.state.min, max = this.state.max) => {
    this.inputMin.value = min;
    this.inputMax.value = max;
  };

  getMinRef = b => this.inputMin = b;
  getMaxRef = b => this.inputMax = b;

  render() {
    const {
      props: {min, max},
      state: {isActive},
      getMaxRef, getMinRef,
      maxHandler, minHandler
    } = this;
    return (
      <BaseFilterItem noborder title="Стоимость в месяц">
        <br/>
        <FlexGrid justify="start" align="center"
                  className={!isActive && s.inactive}>
          <span className={s.title}>от</span>
          <InputClean type="number" step="1000"
                      onChange={minHandler}
                      min="0" getRef={getMinRef}
                      defaultValue={min} focus/>
        </FlexGrid>
        <FlexGrid justify="start" align="center"
                  className={!isActive && s.inactive}>
          <span className={s.title}>до</span>
          <InputClean type="number" step="1000"
                      onChange={maxHandler}
                      min="0" getRef={getMaxRef}
                      defaultValue={max} focus/>
        </FlexGrid>
      </BaseFilterItem>
    )
  }
}

