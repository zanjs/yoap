import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { UserCustomAddress } from 'components'
import { isEmpty, getDefaultPersonalPoint } from 'helpers'

const mapStateToProps = ({user: {personalPoints, updateUserData}}) => ({
  data: personalPoints,
  updateUserData
});

@inject(mapStateToProps) @observer
export default class UserCustomAddressContainer extends Component {
  state = {data: [], isEdit: false, isNew: false, newAddress: {}};

  updateData = (props = this.props) => {
    let data = [
      getDefaultPersonalPoint(),
      ...((props.noEdit ? props.__data : props.data) || [])
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
    if (!this.state.isNew) {
      return null;
    }

    const { position, address, title } = state.newAddress;

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
    }
  }
  clickHandler = () => {
    if (this.props.noEdit)
      return null;

    if (this.state.isEdit) {
      const data = this.validate();
      const defaultPoint = getDefaultPersonalPoint();
      const personalPoints = (data ? [...this.state.data, data] : this.state.data)
        .filter(it => {
          if (!it)
            return false;

          if (it.id === defaultPoint.id) {
            return false
          };

          return true;
        });
      this.props.updateUserData({personalPoints})

      return this.setState({isEdit: false, isNew: false})
    }

    return this.setState({isEdit: true})
  };
  createHandler = () => {
    if (this.props.noEdit)
      return null;
    this.setState({
      isEdit: true,
      isNew: true
    })
  }
  removeHandler = (key) => {
    if (this.props.noEdit)
      return null;

    this.setState(state => ({
      data: state.data.filter((item, index) => (
        index !== key
      ))
    }))
  }
  titleChangeHandler = ({target}, key) => {
    if (this.props.noEdit)
      return null;

    if (key != null && typeof key === 'number') {
      return this.setState(state => ({
        data: state.data.map((item, index) => {
          if (index === key) {
            return {
              ...item,
              title: target.value
            }
          }

          return item;
        })
      }))
    }
    this.setState(state => ({
      newAddress: {
        ...state.newAddress,
        title: target.value
      }
    }))
  }
  addressChangeHandler = ({name, position}, key) => {
    if (this.props.noEdit)
      return null;

    if (key != null && typeof key === 'number') {
      return this.setState(state => ({
        data: state.data.map((item, index) => {
          if (index === key) {
            return {
              ...item,
              address: name,
              position
            }
          }

          return item;
        })
      }))
    }

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
                              onAddNew={this.createHandler}
                              onTitleChange={this.titleChangeHandler}
                              onAddressChange={this.addressChangeHandler}
                              onRemove={this.removeHandler}
                              editData={this.state.newAddress}
                              isEdit={this.state.isEdit}
                              isNew={this.state.isNew}
                              noEdit={this.props.noEdit}
                              data={this.state.data} />
  }
}

