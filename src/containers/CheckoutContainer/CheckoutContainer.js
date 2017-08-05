import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { Checkout } from 'components'
import { inject, observer } from 'mobx-react'

const mapStateToProps = ({subscription, payment, user: {redirectWhenLogin}}) => ({
  subscription, payment, redirectWhenLogin
});

@inject(mapStateToProps) @withRouter @observer
export default class CheckoutContainer extends Component {
  priceClickHandler = item => {
    this.props.subscription.setTemp(item);
  };

  notAuthenticated = () => {
    console.log('will redirect', this.props.location.pathname);
    this.props.payment.cleanError();
    this.props.redirectWhenLogin(
      this.props.location.pathname
    );
  };

  render() {
    const { subscription, payment, ...rest } = this.props;

    if (payment.isError && payment.isError.status === 403) {
      this.notAuthenticated();
      return <Redirect to="/login?payment"/>
    }

    return <Checkout onPriceClick={this.priceClickHandler} {...rest}/>
  }
}

