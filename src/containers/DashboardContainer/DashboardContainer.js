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
  isEmpty: !dash.data.length
})

@inject(mapStateToProps) @observer
export default class DashboardContainer extends Component {
  state = {color: '#448aff', isFetching: true};
  //state = {color: '#2b2c3c', isEmpty: false, isFetching: false};
  isMount = false;

  changeBackground = color => this.setState({
    color
  });

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
      state: {color, isFetching},
      props,
      changeBackground
    } = this;

    const { onlyStats, isEmpty } = props;
    const isLoading = isFetching || props.isFetching;
    const subtitle = isEmpty || onlyStats ? 'Статистика' : 'Уведомления'

    console.log({isEmpty, isLoading, onlyStats})

    return (
      <div style={{backgroundColor: color}} className={s.wrapper}>
        <Container>
          <span className={s.subtitle}>
            {isLoading ? 'Синхронизация' : subtitle}
          </span>
          {isEmpty && !isLoading &&
          <ItemStatisticsContainer changeBackground={changeBackground} />}
          {isLoading &&
          <DashboardSync changeBackground={changeBackground}/>}
          {!onlyStats && !isEmpty && !isLoading &&
          <Dashboard changeBackground={changeBackground} />}
        </Container>
      </div>
    )
  }
}

