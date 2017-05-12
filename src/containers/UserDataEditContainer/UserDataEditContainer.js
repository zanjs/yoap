import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { UserDataEdit } from 'components'
import { imagesUpload } from 'api'
import { isEmpty } from 'helpers'

const mapStateToProps = ({user: {name, image, phone, email, isError, isFetching, verified, updateUserData, password}}) => ({
  user: {name, isError, isFetching, image, email, phone, verified, password},
  updateUserData
})

@inject(mapStateToProps) @observer
export default class UserDataEditContainer extends Component {
  state = {isFetching: false}

  filterValues = (prevValues, values) => {
    let newValues = {};
    Object.keys(values).forEach(prop => {
      const newValue = values[prop];
      const prevValue = prevValues[prop];

      if (isEmpty(newValue) || prop === 'id' || prop === '_id')
        return;

      if (newValue !== prevValue || prop.indexOf('password') !== -1) {
        newValues[prop] = newValue;
      }
    })

    return newValues;
  }
  saveUserData = (__values) => {
    const data = this.getData();
    const values = this.filterValues(data, __values);

    if (!isEmpty(values)) {
      const id = data._id || data.id;
      this.props.updateUserData(values, () => this.setState({
        success: true
      }), id);
    }
  };
  getData = () => this.props.data || this.props.user;
  onUpload = files => {
    this.setState({isFetching: true})
    imagesUpload(files).then(data => {
      this.saveUserData({image: data[0]})
      this.setState({isFetching: false});
    })
  }
  render() {
    const data = this.getData();

    return <UserDataEdit noEdit={this.props.noEdit}
                         onUpload={this.onUpload}
                         onSubmit={this.saveUserData}
                         title={this.props.title}
                         {...data}
                         isFetching={data.isFetching || this.state.isFetching} />
  }
}

