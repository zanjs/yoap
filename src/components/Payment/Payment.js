import React, { Component } from 'react'
import { Title, Content, Button, FlexGrid, ButtonIcon, Svg } from 'components'
import { classNames } from 'helpers'
import s from './Payment.sass'

import closeIcon from 'icons/ui/close.svg'
import cardIcon from 'icons/ui/card.svg'
import walletIcon from 'icons/ui/wallet.svg'
import cellphoneIcon from 'icons/ui/cellphone.svg'

export default class Payment extends Component {
  render() {
    const { getRef, onClose, className } = this.props;
    return (
      <FlexGrid justify="space-between" wrap="true"
                className={classNames(s.wrapper, className)} getRef={getRef}>
        <Svg onClick={onClose} src={closeIcon} className={s.close}/>
        <div className={s.col}>
          <Title className={s.title} size="5" light>
            Расширенный
          </Title>
          <Content className={s.content} lightColor>
            Сразу после оплаты Вы
            получите максимальный доступ к нашей базе объявлений
            на 30 дней с возможностью просмотра 120 номеров телефонов собственников
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
            Расширенный доступ – 30 дней и 120 номеров телефонов собственников
          </Content>
          <div className={s.price__wrapper}>
            <strong className={s.price}>₽990</strong>
            <span className={s.term}>30 дней</span>
          </div>
          <Button className={s.btn} rounded type="blue">
            Оплатить
          </Button>
        </div>
      </FlexGrid>
    )
  }
}

