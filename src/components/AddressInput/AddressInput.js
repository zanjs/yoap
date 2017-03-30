import React, { Component } from 'react'
import { Content, InputClean } from 'components'
import { isEmpty, Predictions } from 'helpers'
import s from './AddressInput.sass'


export default class AddressInput extends Component {
  state = {
    addressInput: '',
    address: {},
    predictions: [],
    message: {
      content: '',
      isError: '',
      success: ''
    }
  };

  constructor(props) {
    super(props);

    this.Predictions = new Predictions({
      setMessage: this.setMessage,
      setPredictions: this.setPredictions,
      setAddress: this.setAddress,
      setPoint: this.setPoint,
      currentCity: 'Санкт-Петербург'
    });
  }

  setPoint = (props, setMap) => {
    if (setMap) {
      if (this.props.setPoint) {
        this.props.setPoint(props);
      }
      this.setState({
        address: props,
      }, this.setInput);

      return;
    }

    this.Predictions.setAddress(props);

    if (props.structured_formatting) {
      this.setInput(
        props.structured_formatting.main_text
      );
    }
  };
  setPredictions = props => {
    this.setState({predictions: props});
  };
  setMessage = message => {
    this.setState({message})
  };

  setInput = _value => {
    let value;
    if (typeof _value === 'string')
      value = _value;

    this.input.value =
      value || this.state.address.name;
  };

  onChange = ({target: {value}}) => {
    this.Predictions.onChange(value);
    if (this.state.message.content) {
      this.setState({message: {}});
    }
  };

  getInputRef = b => this.input = b;

  render() {
    const {
      onChange,
      setPoint,
      getInputRef,
      state: {
        predictions, message
      },
      props: {
        defaultValue
      }
    } = this;

    return (
      <Content tag="div" size="2" light lightColor>
        <InputClean onChange={onChange} placeholder="Введите адрес"
                    defaultValue={defaultValue} getRef={getInputRef}/>
        {predictions && <div className={s.predictions}>
          {predictions.map((item, key) => (
            <Content className={s.item} size="3" blue key={key} onClick={() => setPoint(item)}>
              {item.name || item.structured_formatting.main_text}
            </Content>
          ))}
        </div>}
        {message && message.content &&
        <Content>
          {message.content}
        </Content>}
      </Content>
    )
  }
}

