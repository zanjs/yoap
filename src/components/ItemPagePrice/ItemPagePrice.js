import React, { Component } from 'react'
import {
  Content, FlexGrid,
  Title,
} from 'components'
import { termTypes } from 'constants'
import s from './ItemPagePrice.sass'

const types = termTypes.types;

const PriceItem = ({deposit, value, id, name}) => (
  <FlexGrid className={s.item} align="center"
            justify="space-between">
    <FlexGrid className={s.item__price} align="center"
              justify="space-between">
      <Content lightColor light size="2" nooffsets>
        {name || types.find(item => item.id === id).name}
      </Content>
      <Content lightColor regular size="3" nooffsets>
        {`₽${value}`}
      </Content>
    </FlexGrid>
    {!!deposit && <Content className={s.item__deposit} lightColor
                         regular size="3" nooffsets>
      {`₽${deposit}`}
    </Content>}
  </FlexGrid>
);

export default class ItemPagePrice extends Component {
  types = types;

  hasDeposit = data => {
    return !!data.find(item => !!item.deposit);
  };

  render() {
    const { data, dewa } = this.props;

    const deposit = this.hasDeposit(data);

    return (
      <div className={s.wrapper}>
        {/* Header */}
        <FlexGrid justify="space-between" align="center"
                  className={s.header}>
          <Title className={s.title} nooffsets regular size="6">
            Стоимость
          </Title>
          <Title gray={!deposit} nooffsets regular
                 onClick={this.switchDeposit}
                 className={s.title} size="6">
            {deposit ? 'Залог' : 'Без залога'}
          </Title>
        </FlexGrid>
        <FlexGrid className={s.grid} wrap="true" justify="start" align="start">
          {data.map(item => (
            <PriceItem key={item.id} {...item}/>
          ))}
          {!!dewa && <PriceItem value={dewa} name="Ком. услуги"/>}
        </FlexGrid>
      </div>
    )
  }
}
