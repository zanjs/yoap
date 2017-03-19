import React, { Component } from 'react'
import { ItemParamsRow, Content, InputNumber, FlexGrid } from 'components'
import { classNames } from 'helpers'
import s from './ItemParamsRowSize.sass'


export default class ItemParamsRowSize extends Component {
  state = {value: 0}
  bedroomChangeHandler = value => {

  }

  render() {
    const { title } = this.props;
    return (
      <div className={s.wrapper}>
        <ItemParamsRow title={title}>
          <Content size="2" light className={classNames(ItemParamsRow.itemClassName, s.item)}>
            <InputNumber className={s.input} onChange={value => this.setState({value})}>
              {this.state.value}+ спален
            </InputNumber>
          </Content>
          <Content size="2" light className={classNames(ItemParamsRow.itemClassName, s.item)}>
            <InputNumber className={s.input} onChange={value => this.setState({value})}>
              {this.state.value}+ кроватей
            </InputNumber>
          </Content>
          <Content size="2" light className={classNames(ItemParamsRow.itemClassName, s.item)}>
            <InputNumber className={s.input} onChange={value => this.setState({value})}>
              {this.state.value}+ ванных
            </InputNumber>
          </Content>
          <Content size="2" light className={classNames(ItemParamsRow.itemClassName, s.item)}>
            <InputNumber className={s.input} onChange={value => this.setState({value})}>
              {this.state.value} Этаж
            </InputNumber>
          </Content>

          <FlexGrid justify="flex-start" align="center" tag={Content} size="2" light
                    className={classNames(ItemParamsRow.itemClassName, s.item_big)}>
            Общая площадь
            <span className={s.item_big__content}>
              <InputNumber step={10} buttonsClassName={s.buttons} title={this.state.value} className={s.number}
                           onChange={value => this.setState({value})}>
                от
              </InputNumber>
              <InputNumber step={10} buttonsClassName={s.buttons} title={this.state.value} className={s.number}
                           onChange={value => this.setState({value})}>
                до
              </InputNumber>
              кв.м
            </span>
          </FlexGrid>
        </ItemParamsRow>
      </div>
    )
  }
}
