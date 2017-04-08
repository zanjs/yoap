import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { BaseFilterPrice } from 'components'

const mapStateToProps = ({filter: {price, priceLimit, changePrice}}) => ({
  price, priceLimit, changePrice
});

@inject(mapStateToProps) @observer
export default class BaseFilterPriceContainer extends Component {
  onChange = price => {
    this.props.changePrice(price);
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {
      onChange,
      props: {
        price: [min, max],
        priceLimit
      }
    } = this;
    return <BaseFilterPrice onChange={onChange}
                            minValue={priceLimit[0]}
                            maxValue={priceLimit[1]}
                            min={min} max={max}/>
  }
}

