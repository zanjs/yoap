import React, { Component } from 'react'
import {
  Container, DashboardNotification
} from 'components'
import s from './Dashboard.sass'

export default class Dashboard extends Component {
  state = {color: '#448aff'};

  changeBackground = color => this.setState({
    color
  });

  render() {
    const {
      state: {color},
      changeBackground
    } = this;
    return (
      <div style={{backgroundColor: color}} className={s.wrapper}>
        <Container>
          <span className={s.subtitle}>
            Уведомления
          </span>
          <DashboardNotification changeBackground={changeBackground} />
        </Container>
      </div>
    )
  }
}

