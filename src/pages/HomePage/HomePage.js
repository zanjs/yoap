import React, { Component } from 'react'
import { Intro } from 'components'
import s from './HomePage.sass'


export default class HomePage extends Component {
  render() {
    return (
      <div className={s.homepage}>
        <Intro />
      </div>
    )
  }
}

