import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { NotificationSlider } from 'components'
import { isEmpty } from 'helpers'

const mapStateToProps = ({dash: {notifications}}) => ({
  data: notifications
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
    console.log(this.props.data.length, this.props.data);
    return <NotificationSlider slides={this.props.data}
                               changeBackground={this.props.changeBackground} />
  }
}

