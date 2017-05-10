import React, { Component } from 'react'
import { BaseFilterItem, InputClean, FlexGrid } from 'components'
import s from './BaseFilterPrice.sass'


export default class BaseFilterPrice extends Component {
  static defaultProps = {
    min: 25000,
    max: 45000,
    minValue: 25000,
    maxValue: 45000
  };

  state = {
    min: this.props.min,
    max: this.props.max,
    isActive: false
  };

  componentWillReceiveProps(nextProps) {
    const { props, state } = this;

    // if this values was not changed
    // we should not change anything
    if (
      nextProps.minValue === props.minValue
      && nextProps.maxValue === props.maxValue
    ) {
      return false;
    }

    // if price filter was not changed
    if (state.min === props.minValue && state.max === props.minValue) {
      this.setInputs(nextProps.minValue, nextProps.maxValue);
      return this.setState({
        min: nextProps.minValue,
        max: nextProps.maxValue
      })
    }

    if (
      state.min < nextProps.minValue
      || state.min > nextProps.maxValue
      || state.max < nextProps.minValue
      || state.max > nextProps.maxValue
    ) {
      const min = state.min < nextProps.minValue
        ? nextProps.minValue
        : state.min > nextProps.maxValue
          ? nextProps.maxValue : state.min;
      const max = state.max < nextProps.minValue
        ? nextProps.minValue
        : state.max > nextProps.maxValue
          ? nextProps.maxValue : state.max;

      this.setInputs(min, max);
      return this.setState({
        min, max
      })
    }
  }

  minHandler = ({target: {value}}) => {
    const min = parseInt(value, 10);
    const { minValue, maxValue } = this.props;
    const { max } = this.state;

    if (min < minValue || min > maxValue) {
      let _max = max < minValue
        ? minValue
        : max > maxValue
          ? maxValue : max;
      let _min = min < minValue
        ? minValue
        : min > maxValue
          ? maxValue : min;

      this.setInputs(
        _min, _max
      );
      return this.setState({min: _min, max: _max}, this.onChange);
    }

    if (min >= max) {
      this.setInputs(min, min);
      return this.setState({min, max: min}, this.onChange);
    }

    return this.setState({min}, this.onChange);
  };
  maxHandler = ({target: {value}}) => {
    const max = parseInt(value, 10);
    const { minValue, maxValue } = this.props;
    const { min } = this.state;

    if (max < minValue || max > maxValue) {
      let _max = max < minValue
        ? minValue
        : max > maxValue
          ? maxValue : max;
      let _min = min < minValue
        ? minValue
        : min > maxValue
          ? maxValue : min;

      this.setInputs(
        _min, _max
      );
      return this.setState({min: _min, max: _max}, this.onChange);
    }

    if (max <= min) {
      this.setInputs(max, min);
      return this.setState({min: max, max}, this.onChange);
    }

    return this.setState({max}, this.onChange);
  };

  onChange = () => {
    if (this.props.onChange) {
      const { min, max } = this.state;
      this.props.onChange(
        [min, max]
      )
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
      props: {
        min, max,
        minValue, maxValue
      },
      getMaxRef, getMinRef,
      maxHandler, minHandler
    } = this;
    return (
      <BaseFilterItem noborder title="Стоимость в месяц">
        <div className={s.offset}/>
        <div className={s.wrapper}>
          <FlexGrid justify="start" align="center"
                    className={s.item}>
            <span className={s.title}>от</span>
            <InputClean type="number" step="1000"
                        className={s.input}
                        onChange={minHandler}
                        min={minValue} max={maxValue}
                        getRef={getMinRef}
                        defaultValue={min} focus/>
          </FlexGrid>
          <FlexGrid justify="start" align="center"
                    className={s.item}>
            <span className={s.title}>до</span>
            <InputClean type="number" step="1000"
                        className={s.input}
                        onChange={maxHandler}
                        min={minValue} max={maxValue}
                        getRef={getMaxRef}
                        defaultValue={max} focus/>
          </FlexGrid>
        </div>
      </BaseFilterItem>
    )
  }
}

