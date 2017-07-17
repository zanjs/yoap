import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Title, Content, Button, FlexGrid, ButtonIcon, Svg } from 'components'
import { classNames, isEmpty, declination } from 'helpers'
import s from './Payment.sass'

import closeIcon from 'icons/ui/close.svg'
import cardIcon from 'icons/ui/card.svg'
import walletIcon from 'icons/ui/wallet.svg'
import cellphoneIcon from 'icons/ui/cellphone.svg'

const mapStateToProps = ({subscription: {temp}}) => ({
  data: temp
});

@inject(mapStateToProps) @observer
export default class Payment extends Component {
  termDecl = declination([
    'день', 'дня', 'дней'
  ]);

  render() {
    const { getRef, onClose, className, data } = this.props;
    const { termDecl } = this;

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
          <Button className={s.btn} rounded type="light">
            Подробнее
          </Button>
        </div>

        <div className={s.col}>
          <Title className={s.title} size="5" light>
            Выберите способ оплаты:
          </Title>
          <div>
            <ButtonIcon className={s.btn_icon} icon={cardIcon}>
              Visa/Mastercard
            </ButtonIcon>
            <ButtonIcon className={s.btn_icon} icon={walletIcon}>
              Яндекс.Деньги
            </ButtonIcon>
            <ButtonIcon className={s.btn_icon} icon={cellphoneIcon}>
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
          <Button className={s.btn} rounded type="blue">
            Оплатить
          </Button>
        </div>
      </FlexGrid>
    )
  }
}

