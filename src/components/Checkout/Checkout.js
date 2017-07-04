import React, { Component } from 'react'
import {
  Container, Title, Content,
  Payment, PricingBanner
} from 'components'
import s from './Checkout.sass'


export default class Checkout extends Component {
  dur = .3;
  ease = Cubic.easeOut;

  blocks = {};

  getPricingRef = b => this.blocks.pricing = b;
  getPaymentRef = b => this.blocks.payment = b;

  fadeIn = onComplete => {
    const { blocks, dur, ease } = this;

    TweenMax.fromTo(blocks.payment, dur, {
      opacity: 0,
      display: 'none'
    }, {
      opacity: 1,
      display: 'flex',
      ease
    });

    TweenMax.fromTo(blocks.pricing, dur, {
      opacity: 1
    }, {
      opacity: 0,
      ease, onComplete
    })
  };

  fadeOut = onComplete => {
    const { blocks, dur, ease } = this;

    TweenMax.fromTo(blocks.payment, dur, {
      opacity: 1,
      display: 'flex'
    }, {
      opacity: 0,
      display: 'none',
      ease
    });

    TweenMax.fromTo(blocks.pricing, dur, {
      opacity: 0
    }, {
      opacity: 1,
      ease, onComplete
    })
  };

  openPayment = () => {
    this.fadeIn();
  };
  closePayment = () => {
    this.fadeOut();
  };

  render() {
    return (
      <div className={s.wrapper}>
        <Container>
          <Title nooffsets size="2" center light>
            Станьте хозяином уже сегодня!
          </Title>
          <Content center lightGray size="3">
            Активируйте подписку для просмотра<br/>
            и публикации объявлений
          </Content>
          <div className={s.content}>
            <Payment onClose={this.closePayment} className={s.payment} getRef={this.getPaymentRef}/>
            <PricingBanner className={s.pricing} getRef={this.getPricingRef}
                           onClick={this.openPayment}/>
          </div>
        </Container>
      </div>
    )
  }
}

