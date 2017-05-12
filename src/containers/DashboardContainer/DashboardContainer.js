import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import {
  Container, Dashboard,
  DashboardSync
} from 'components'
import s from './DashboardContainer.sass'

const mapStateToProps = ({dash, user, items}) => ({
  dash, isFetching: dash.isFetching || user.isFetching || items.isFetching,
})

@inject(mapStateToProps) @observer
export default class DashboardContainer extends Component {
  state = {color: '#448aff', isEmpty: true};

  changeBackground = color => this.setState({
    color
  });

  isEmpty = (cond) => {
    this.setState({
      isEmpty: cond
    })

    if (!this.props.onEmpty)
      return;

    this.props.onEmpty(cond)
  }
  componentWillMount() {
    this.props.dash.update();
  }

  render() {
    const {
      state: {color, isEmpty},
      props: {isFetching},
      changeBackground
    } = this;

    const display = isEmpty ? 'none' : 'block';

    return (
      <div style={{backgroundColor: color, display}} className={s.wrapper}>
        <Container>
          <span className={s.subtitle}>
            {isFetching ? 'Синхронизация' : 'Уведомления'}
          </span>
          {isFetching && <DashboardSync isEmpty={this.isEmpty} changeBackground={changeBackground}/>}
          {!isFetching && <Dashboard isEmpty={this.isEmpty} changeBackground={changeBackground} />}
        </Container>
      </div>
    )
  }
}

