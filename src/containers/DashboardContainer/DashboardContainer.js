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
  state = {color: '#448aff', isEmpty: true, isFetching: true};
  isMount = false;

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
    this.isMount = true;
  }
  componentWillUnmount() {
    this.isMount = false;
  }
  componentDidMount() {
    setTimeout(() => {
      this.isMount && this.setState({isFetching: false})
    }, 2000)
  }

  render() {
    const {
      state: {color, isEmpty, isFetching},
      props,
      changeBackground
    } = this;

    const display = isEmpty ? 'none' : 'block';
    const isLoading = isFetching || props.isFetching;

    return (
      <div style={{backgroundColor: color, display}} className={s.wrapper}>
        <Container>
          <span className={s.subtitle}>
            {isLoading ? 'Синхронизация' : 'Уведомления'}
          </span>
          {isLoading && <DashboardSync isEmpty={this.isEmpty} changeBackground={changeBackground}/>}
          {!isLoading && <Dashboard isEmpty={this.isEmpty} changeBackground={changeBackground} />}
        </Container>
      </div>
    )
  }
}

