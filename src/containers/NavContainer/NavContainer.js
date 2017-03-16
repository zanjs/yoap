import React, { Component } from 'react'
import { Nav } from 'components'

const links = [
  {
    to: '/',
    content: 'Стать хозяином'
  },
  {
    to: '/',
    content: 'Помощь'
  },
  {
    to: '/',
    content: 'Регистрация'
  }
]

export default class NavContainer extends Component {
  render() {
    return (
      <Nav links={links}/>
    )
  }
}

