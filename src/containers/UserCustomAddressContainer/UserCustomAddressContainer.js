import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { UserCustomAddress } from 'components'

@observer
export default class UserCustomAddressContainer extends Component {
  state = {data: []};

  getDefaultPoint = () => {
    return {
      location: [59.92517, 30.32243900000003],
      title: 'Центр',
      address: 'Санкт-Петербург',
      icon: 'center'
    }
  };
  updateData = (props = this.props) => {
    let data = [
      this.getDefaultPoint()
    ];

    this.setState({data});
  };

  componentWillMount() {
    this.updateData();
  }
  componentWillReceiveProps(nextProps) {
    this.updateData(nextProps);
  }

  render() {
    return <UserCustomAddress data={this.state.data} />
  }
}

