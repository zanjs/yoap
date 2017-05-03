import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { DashboardSlider } from 'components'
import { isEmpty } from 'helpers'

const mapStateToProps = ({dash: {notifications}}) => ({
  notifications
});

@inject(mapStateToProps) @observer
export default class DashboardNotification extends Component {
  setEmpty = cond => {
    if (this.props.isEmpty) {
      this.props.isEmpty(cond)
    }
  }
  update = (props = this.props) => {
    if (isEmpty(props.data)) {
      return this.setEmpty(true)
    }
    return this.setEmpty(false)
  }
  componentWillReceiveProps(props) {
    this.update(props);
  }
  componentWillMount() {
    this.update();
  }
  render() {
    const slides = this.props.notifications.length && this.props.notifications || [];
    return <DashboardSlider slides={slides} changeBackground={this.props.changeBackground} />
  }
}

