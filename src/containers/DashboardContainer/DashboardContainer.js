import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import {
  Container, Dashboard,
  DashboardSync
} from 'components'
import { ItemStatisticsContainer } from 'containers'
import s from './DashboardContainer.sass'

const mapStateToProps = ({dash, user, items}) => ({
  dash, isFetching: dash.isFetching || user.isFetching || items.isFetching,
})

@inject(mapStateToProps) @observer
export default class DashboardContainer extends Component {
  state = {color: '#448aff', isEmpty: true, isFetching: true};
  //state = {color: '#2b2c3c', isEmpty: false, isFetching: false};
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

    //this.props.onEmpty(cond)
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
      this.isMount && this.setState({isFetching: false}, () => {
        window.DashboardHasMounted = true;
      })
    }, window.DashboardHasMounted ? 1000 : 2000)
  }

  render() {
    const {
      state: {color, isEmpty, isFetching},
      props,
      changeBackground
    } = this;

    const isLoading = isFetching || props.isFetching;
    const subtitle = isEmpty ? 'Статистика' : 'Уведомления'

    return (
      <div style={{backgroundColor: color}} className={s.wrapper}>
        <Container>
          <span className={s.subtitle}>
            {isLoading ? 'Синхронизация' : subtitle}
          </span>
          {isEmpty && !isLoading && <ItemStatisticsContainer changeBackground={changeBackground} />}
          {isLoading && <DashboardSync changeBackground={changeBackground}/>}
          {!isEmpty && !isLoading && <Dashboard isEmpty={this.isEmpty} changeBackground={changeBackground} />}
        </Container>
      </div>
    )
  }
}

