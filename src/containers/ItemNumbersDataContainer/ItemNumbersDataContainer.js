import React, { Component } from 'react'
import{ ItemNumbersData } from 'components'


export default class ItemNumbersDataContainer extends Component {
  render() {
    const { views, featured, createdAt } = this.props.data;

    return <ItemNumbersData isFeaturedActive={false} views={views}
                            date={createdAt} featured={featured}/>
  }
}

