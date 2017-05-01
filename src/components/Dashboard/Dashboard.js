import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import {
  Container, DashboardNotification
} from 'components'
import s from './Dashboard.sass'

@inject('dash') @observer
export default class Dashboard extends Component {
  state = {color: '#448aff', isEmpty: true};

  changeBackground = color => this.setState({
    color
  });

  isEmpty = (cond) => {
    this.setState({
      isEmpty: cond
    })
  }
  componentWillMount() {
    this.props.dash.update();
  }

  render() {
    const {
      state: {color, isEmpty},
      changeBackground
    } = this;

    const display = isEmpty ? 'none' : 'block';

    return (
      <div style={{backgroundColor: color, display}} className={s.wrapper}>
        <Container>
          <span className={s.subtitle}>
            Уведомления
          </span>
          <DashboardNotification isEmpty={this.isEmpty}
                                 changeBackground={changeBackground} />
        </Container>
      </div>
    )
  }
}

