import React, { Component } from 'react'
import { ItemPageInfo, ItemPageInfoEdit, Container } from 'components'
import s from './ItemPage.sass'


export default class ItemPage extends Component {
  render() {
    return (
      <Container style={{padding: '200px 0'}}>
        <ItemPageInfoEdit />
        <ItemPageInfo />
      </Container>
    )
  }
}

