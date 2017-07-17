import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import {
  Container, Title, Content,
  Payment, PricingBanner
} from 'components'
import s from './Checkout.sass'

const mapStateToProps = ({subscription, payment}) => ({
  subscription, payment
});

@inject(mapStateToProps) @observer
export default class Checkout extends Component {
  dur = .3;
  ease = Cubic.easeOut;
  isOpened = false;

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

  openPayment = data => {
    if (this.isOpened)
      return;

    this.props.onPriceClick(data);
    this.fadeIn();
    this.isOpened = true;
  };
  closePayment = () => {
    if (!this.isOpened)
      return;

    this.props.onPriceClick(this.props.paymentData);
    this.fadeOut();
    this.isOpened = false;
  };

  update = (props = this.props) => {
    if (props.isPayment) {
      return this.openPayment(this.props.paymentData)
    }
    if (props.isBanner) {
      this.closePayment()
    }
  };
  componentDidMount() {
    setTimeout(this.update, 300);
  }
  componentWillReceiveProps(props) {
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => this.update(props), 300);
  }

  render() {
    const { subscription: {data}, onAboutClick} = this.props;
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
            <Payment onClose={this.closePayment} className={s.payment}
                     onAboutClick={onAboutClick} getRef={this.getPaymentRef}/>
            <PricingBanner className={s.pricing} getRef={this.getPricingRef}
                           onClick={this.openPayment} data={data}/>
          </div>
        </Container>
      </div>
    )
  }
}

