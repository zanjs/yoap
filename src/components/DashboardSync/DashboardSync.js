import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { DashboardSlider } from 'components'

@observer
export default class DashboardSync extends Component {
  slide = [{
    color: '#2b2b3c',
    title: (
      <span>
        Подождите.<br/>
        Идет загрузка актуальных данных учетной записи.
      </span>
    ),
    loading: true
  }]
  render() {
    return <DashboardSlider slides={this.slide}
                            changeBackground={this.props.changeBackground}/>
  }
}

