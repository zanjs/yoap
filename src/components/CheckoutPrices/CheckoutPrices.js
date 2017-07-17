import React, { Component } from 'react'
import { PricingBannerFull } from 'components'
import { CheckoutContainer } from 'containers'


export default class CheckoutPrices extends Component {
  id = 'prices-banner';
  scrollTo = () => {
    TweenMax.to(window, .7, {
      scrollTo: `#${this.id}`,
      ease: Cubic.easeOut
    });
  };

  render() {
    return (
      <div>
        <CheckoutContainer onAboutClick={this.scrollTo} {...this.props}/>
        <PricingBannerFull id={this.id} />
      </div>
    )
  }
}

