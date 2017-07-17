import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Title, Content, Button, FlexGrid, ButtonIcon, Svg } from 'components'
import { classNames, isEmpty, declination } from 'helpers'
import {
  PAYMENT_TYPE_CARD,
  PAYMENT_TYPE_BALANCE,
  PAYMENT_TYPE_YANDEX
} from 'constants/paymentConstants'
import s from './Payment.sass'

import closeIcon from 'icons/ui/close.svg'
import cardIcon from 'icons/ui/card.svg'
import walletIcon from 'icons/ui/wallet.svg'
import cellphoneIcon from 'icons/ui/cellphone.svg'

const mapStateToProps = ({subscription: {temp}, payment: {PayForSubscription}}) => ({
  data: temp, onSubmit: PayForSubscription
});

@inject(mapStateToProps) @observer
export default class Payment extends Component {
  state = {type: PAYMENT_TYPE_CARD};
  isPushed = false;
  termDecl = declination([
    'день', 'дня', 'дней'
  ]);

  changeTypeHandler = type => () => {
    this.setState({type});
  };
  onSubmit = () => {
    if (this.isPushed)
      return;

    this.isPushed = true;

    const { type } = this.state;
    const { data } = this.props;

    this.props.onSubmit(data, {
      paymentType: type
    })
  };

  render() {
    const { getRef, onClose, className, data, onAboutClick } = this.props;
    const { type } = this.state;
    const { termDecl, changeTypeHandler, onSubmit } = this;

    return (
      <FlexGrid justify="space-between" wrap="true"
                className={classNames(s.wrapper, className)} getRef={getRef}>
        <Svg onClick={onClose} src={closeIcon} className={s.close}/>
        <div className={s.col}>
          <Title className={s.title} size="5" light>
            {data.title}
          </Title>
          <Content className={s.content} lightColor>
            Сразу после оплаты Вы
            получите {data.about}
          </Content>
          <Button onClick={onAboutClick} className={s.btn}
                  rounded type="light">
            Подробнее
          </Button>
        </div>

        <div className={s.col}>
          <Title className={s.title} size="5" light>
            Выберите способ оплаты:
          </Title>
          <div>
            <ButtonIcon onClick={changeTypeHandler(PAYMENT_TYPE_CARD)}
                        isActive={type === PAYMENT_TYPE_CARD}
                        className={s.btn_icon} icon={cardIcon}>
              Visa/Mastercard
            </ButtonIcon>
            <ButtonIcon onClick={changeTypeHandler(PAYMENT_TYPE_YANDEX)}
                        isActive={type === PAYMENT_TYPE_YANDEX}
                        className={s.btn_icon} icon={walletIcon}>
              Яндекс.Деньги
            </ButtonIcon>
            <ButtonIcon onClick={changeTypeHandler(PAYMENT_TYPE_BALANCE)}
                        isActive={type === PAYMENT_TYPE_BALANCE}
                        className={s.btn_icon} icon={cellphoneIcon}>
              Счёт Мобильного
            </ButtonIcon>
          </div>
        </div>

        <div className={s.col}>
          <Title className={s.title} size="5" light>
            Итого к оплате:
          </Title>
          <Content nooffsets lightColor>
            {data.title} доступ – {data.term} {termDecl(data.term)} и {data.openAmountSum} номеров телефонов собственников
          </Content>
          <div className={s.price__wrapper}>
            <strong className={s.price}>₽{data.sum}</strong>
            <span className={s.term}>{data.term} {termDecl(data.term)}</span>
          </div>
          <Button className={s.btn} onClick={onSubmit}
                  rounded type="blue">
            Оплатить
          </Button>
        </div>
      </FlexGrid>
    )
  }
}

