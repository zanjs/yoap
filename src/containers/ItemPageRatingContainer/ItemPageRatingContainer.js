import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { ItemPageRating } from 'components'

const mapStateToProps = ({user: {isAdmin}}) => ({
  isAdmin
})

@inject(mapStateToProps) @observer
export default class ItemPageRatingContainer extends Component {
  render() {
    const { isAdmin, data, value, id } = this.props;
    return <ItemPageRating id={id} edit={isAdmin} value={value} data={data}/>
  }
}

