import React, { Component } from 'react'
import { Checkout } from 'components'
import { inject, observer } from 'mobx-react'

const mapStateToProps = ({payment, subscription}) => ({
  payment, subscription
});

@inject(mapStateToProps) @observer
export default class CheckoutContainer extends Component {
  priceClickHandler = item => {
    this.props.subscription.setTemp(item);
  };

  render() {
    return <Checkout onPriceClick={this.priceClickHandler}/>
  }
}

