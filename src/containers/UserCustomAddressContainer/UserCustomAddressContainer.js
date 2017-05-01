import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { UserCustomAddress } from 'components'

@observer
export default class UserCustomAddressContainer extends Component {
  state = {data: [], isEdit: false, newAddress: {}};

  getDefaultPoint = () => {
    return {
      position: [59.92517, 30.32243900000003],
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

  clickHandler = () => {
    if (this.isEdit) {
      return console.log('trying to save');
    }

    return this.setState({isEdit: true})
  };
  titleChangeHandler = ({target}) => {
    this.setState(state => ({
      newAddress: {
        ...state.newAddress,
        title: target.value
      }
    }))
  }
  addressChangeHandler = ({name, position}) => {
    this.setState(state => ({
      newAddress: {
        ...state.newAddress,
        address: name,
        position
      }
    }))
  }

  render() {
    return <UserCustomAddress onControlClick={this.clickHandler}
                              onTitleChange={this.titleChangeHandler}
                              onAddressChange={this.addressChangeHandler}
                              editData={this.state.newAddress}
                              isEdit={this.state.isEdit}
                              data={this.state.data} />
  }
}

