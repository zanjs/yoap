import React, { Component } from 'react'
import { Checkout } from 'components'
import { inject, observer } from 'mobx-react'

const mapStateToProps = ({subscription}) => ({
  subscription
});

@inject(mapStateToProps) @observer
export default class CheckoutContainer extends Component {
  priceClickHandler = item => {
    this.props.subscription.setTemp(item);
  };

  render() {
    const { subscription, ...rest } = this.props;
    return <Checkout onAboutClick={this.props.onAboutClick}
                     onPriceClick={this.priceClickHandler} {...rest}/>
  }
}

