import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { UserCustomAddress } from 'components'
import { isEmpty } from 'helpers'

const mapStateToProps = ({user: {personalPoints, updateUserData}}) => ({
  data: personalPoints,
  updateUserData
});

@inject(mapStateToProps) @observer
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
      this.getDefaultPoint(),
      ...props.data
    ];

    this.setState({data});
  };

  componentWillMount() {
    this.updateData();
  }
  componentWillReceiveProps(nextProps) {
    this.updateData(nextProps);
  }

  validate = (state = this.state) => {
    const { position, address, title, icon } = state.newAddress;

    if (isEmpty(position) || !position[0] || !position[1]) {
      return null;
    }

    if (isEmpty(address) || isEmpty(title)) {
      return null;
    }

    return {
      position,
      address,
      title,
      icon: icon || ''
    }
  }
  clickHandler = () => {
    if (this.state.isEdit) {
      const data = this.validate();

      if (!data) {
        return console.log('validation error!');
      }
      console.log('user will be updated', data);
      this.props.updateUserData({personalPoints:
        [...this.props.data, data]
      })

      return this.setState({isEdit: false})
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

