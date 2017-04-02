import React, { Component } from 'react'
import {
  Content, FlexGrid,
  Select, InputClean,
  Title
} from 'components'
import { termTypes } from 'constants'
import { classNames, shallowEqual } from 'helpers'
import s from './ItemPagePriceEdit.sass'

const types = termTypes.types;

export default class ItemPagePriceEdit extends Component {
  types = types;

  state = {
    edit: false, deposit: false,
    chosen: [], dewa: false
  };

  importProps = (props) => {
    let res = {};
    if (props.dewa) {
      res.dewa = this.createDewa(props.dewa).dewa;
    }
    if (props.data) {
      res.chosen = [...props.data].map(item => ({
        value: item.value,
        id: item.id,
        deposit: item.deposit,
        name: this.types.find(block => block.id === item.id).name
      }))
    }
    if (res.chosen && res.chosen.find(item => !!item.deposit)) {
      res.deposit = true;
    }

    console.log('imported props', window.res = res);

    this.setState(res, this.onChange);
  };

  componentWillMount() {
    this.importProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.data && !!nextProps.data) {
      this.importProps(nextProps);
    }
  }

  onChange = () => {
    if (this.props.onChange) {
      const { dewa, chosen } = this.state;

      this.props.onChange({
        dewa: dewa && parseInt(dewa.value, 10),
        price: chosen
      });
    }
  };

  toggleEditMode = val =>
    this.setState(({edit}) => ({
      edit: val != null ? val : !edit
    }));

  togglePrices = value => {
    let data;

    if (typeof value === 'string' || !value.id || !value.name) {
      if (typeof value !== 'string') {
        value = value.target.value;
      }

      data = types.find(
        item => item.name === value || item.id === value
      )
    }

    const chosenData = data || value;
    const { id } = chosenData;
    const { chosen } = this.state;
    const hasAdded = !!chosen.find(item => item.id === id);

    if (hasAdded) {
      return this.setState({
        chosen: chosen.filter(item => item.id !== id),
        edit: false
      })
    }

    return this.setState({
      chosen: [
        ...chosen,
        chosenData
      ],
      edit: false
    })
  };

  switchDeposit = () => {
    this.setState({deposit: true})
  };

  changePrice = (id, value) => {
    this.setState(({chosen}) => ({
      chosen: chosen.map(item => {
        if (item.id === id) {
          item.value = parseInt(value, 10);
        }

        return item;
      })
    }), this.onChange)
  };
  changeDeposit = (id, value) => {
    this.setState(({chosen}) => ({
      chosen: chosen.map(item => {
        if (item.id === id) {
          item.deposit = parseInt(value, 10);
        }

        return item;
      })
    }), this.onChange)
  };
  changeDewa = (id, value) => {
    this.setState({
      dewa: {
        value,
        name: this.state.dewa.name
      }
    }, this.onChange)
  };
  createDewa = value => {
    const noChange = typeof value === 'number' || typeof value === 'string';
    console.log(value);

    const data = {
      dewa: {
        value: noChange ? parseInt(value, 10) : 0,
        name: 'Ком. услуги'
      }
    };

    if (noChange)
      return data;


    this.setState(data)
  };
  renderEditSelect = () => {
    const types = this.types.filter(item => {
      const hasAdded = !!this.state.chosen.find(
        value => item.id === value.id
      );

      return !hasAdded;
    }).map(item => item.name);

    if (!types && !types.length)
      return null;

    if (types.length === 1) {
      this.togglePrices(types[0]);

      return null;
    }

    return (
      <Content lightColor light size="2" nooffsets>
        <Select inherit onChange={this.togglePrices}
                values={types}/>
      </Content>
    )
  };
  renderInput = (value, id, onChange, className) => (
    <Content className={classNames(s.input, className)}
             lightColor regular size="3" nooffsets>
      <FlexGrid tag="span" justify="start" align="center">
        <span>₽</span>
        <InputClean type="number" min="0" step="500"
                    onChange={({target}) => onChange(id, target.value)}
                    className={s.inputNumber}>
          {value || 0}
        </InputClean>
      </FlexGrid>
    </Content>
  );
  renderItem = (item, key, deposit, onChange) => (
    <FlexGrid key={key} className={s.item} align="center"
              justify="start">
      <Content className={s.item__des} lightColor light size="2" nooffsets>
        {item.name}
      </Content>
      {this.renderInput(item.value, item.id, onChange || this.changePrice)}
      {deposit && this.renderInput(
        item.deposit, item.id, this.changeDeposit,
        s.deposit
      )}
    </FlexGrid>
  );

  render() {
    const { edit, chosen, deposit, dewa } = this.state;
    const maximum = chosen.length === this.types.length;

    return (
      <div className={s.wrapper}>
        {/* Header */}
        <FlexGrid justify="space-between" align="center"
                  className={s.header}>
          <Title className={s.title} nooffsets regular size="6">
            Укажите стоимость
          </Title>
          <Title gray={!deposit} nooffsets regular
                 onClick={this.switchDeposit}
                 className={s.title} size="6">
            Укажите залог
          </Title>
        </FlexGrid>

        <FlexGrid wrap="true" justify="start" align="start">
          {/* Prices grid */}
          {!!chosen && !!chosen.length &&
            chosen.map((item, key) =>
              this.renderItem(item, key, deposit))
          }
          {dewa && this.renderItem(dewa, 0, false, this.changeDewa)}
          {/* Add new one */}
          {!maximum && !edit && <Content lightColor regular size="3" className={s.add}
                                         nooffsets onClick={this.toggleEditMode}>+</Content>}
          {edit && this.renderEditSelect()}

          {!dewa && <Title gray nooffsets light
                           onClick={this.createDewa}
                           className={s.title_bottom}
                           size="6">
            Укажите стоимость ком. услуг
          </Title>}
        </FlexGrid>
      </div>
    )
  }
}
