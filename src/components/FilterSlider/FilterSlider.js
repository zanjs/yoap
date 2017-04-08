import React, { Component } from 'react'
import ReactSlider from 'react-slider'
import { isEmpty, classNames } from 'helpers'
import s from './FilterSlider.sass'

// todo: fool proof & onchange on mouse up
export default class FilterSlider extends Component {
  static defaultProps = {
    min: 0, max: 100,
    minValue: 0, maxValue: 100
  };

  letterWidth = 12;
  inputBar = this.letterWidth * 3;
  inputTimeout;
  inputDelay = 700;

  state = {
    min: this.props.min, max: this.props.max
  };

  // set values
  setMinMax = ({min, max}, cb, nextProps) => {
    const { minValue, maxValue } = nextProps || this.props;
    let data = {};

    if (!isEmpty(min)) {
      if (min <= minValue || min >= maxValue) {
        min = minValue;
      }

      data.min = min;
    }

    if (!isEmpty(max)) {
      if (max >= maxValue || max <= minValue) {
        max = maxValue;
      }

      data.max = max;
    }

    this.setState(data, cb);
    if (!cb) {
      this.setInputs(min, max);
    }
  };

  // hack: react-slider doesn't support
  // custom class names for children
  addClassesToElements = () => {
    const applyClassNames = block => {
      const blockClassName = block.className;
      const index = parseInt(blockClassName[blockClassName.length - 1], 10);
      const classAlias = `bar-${index}`;
      const className = s[classAlias];

      if (className) {
        block.className += ` ${className}`;
      }
    };

    [...document.querySelectorAll(`.${s.bar}`)]
      .forEach(applyClassNames);
  };
  // initialize custom classes & values in inputs
  componentDidMount() {
    this.addClassesToElements();
    this.setInputs(this.props.min, this.props.max);
  }

  // set values to inputs & calculate width for them
  setInputs = (min, max) => {
    const getWidth = value => (letterWidth * value.toString().length) + inputBar + 'px';
    const { letterWidth, inputBar } = this;

    // set input min
    if (min) {
      this.inputMin.value = min;
      this.inputMin.style.width = getWidth(min);
    }

    // set input max
    if (max) {
      this.inputMax.value = max;
      this.inputMax.style.width = getWidth(max);
    }
  };
  // on change handler which saves values to local component state
  onChange = e => {
    const [min, max] = e;

    this.setMinMax({min, max})
  };
  // on change handler which send values to other handlers
  onAfterChange = e => {
    const [min, max] = e;

    if (this.props.onChange) {
      this.props.onChange(min, max)
    }
  };
  // special on change handler for inputs
  onInputChange = type => e => {
    const value = parseInt(e.target.value, 10);

    this.setMinMax({
      [type]: value
    }, () => {
      // check: if user still entering a values
      // -----
      // each new value removes old timeout and create new one
      // if timeout (by default it is 1s) fired, then it's call
      // other onChange handler
      clearTimeout(this.inputTimeout);
      this.inputTimeout = setTimeout(() => {
        const { min, max } = this.state;
        if (this.props.onChange) {
          this.props.onChange(min, max)
        }
        this.setInputs(min, max);
      }, this.inputDelay);
    });

  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.min !== nextProps.min ||
      this.props.max !== nextProps.max
    ) {
      const { min, max } = nextProps;

      this.setMinMax({
        min: min, max: max
      }, null, nextProps)
    }
  }

  render() {
    const { minValue, maxValue, children, className } = this.props;
    const { min, max } = this.state;

    return (
      <div className={s.wrapper}>
        <div className={classNames(s.title, className)}>
          Общая площадь: от
          <input type="number" min={minValue} max={maxValue}
                 onChange={this.onInputChange('min')} ref={b => this.inputMin = b}
                 className={s.title__from} defaultValue={minValue}/>
          до
          <input type="number" min={minValue} max={maxValue}
                 onChange={this.onInputChange('max')} ref={b => this.inputMax = b}
                 className={s.title__before} defaultValue={maxValue}/>
          кв.м
        </div>
        <ReactSlider min={minValue} max={maxValue}
                     value={[min, max]}
                     className={s.slider}
                     handleClassName={s.handle}
                     barClassName={s.bar}
                     onChange={this.onChange}
                     onAfterChange={this.onAfterChange}
                     minDistance={10}
                     withBars />
        {children}
      </div>
    )
  }
}

