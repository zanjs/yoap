import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { UserDataEdit } from 'components'
import { isEmpty } from 'helpers'

const mapStateToProps = ({user: {name, image, phone, email, verified, updateUserData, password}}) => ({
  user: {name, image, email, phone, verified, password},
  updateUserData
})

@inject(mapStateToProps) @observer
export default class UserDataEditContainer extends Component {
  filterValues = (prevValues, values) => {
    let newValues = {};
    Object.keys(values).forEach(prop => {
      const newValue = values[prop];
      const prevValue = prevValues[prop];

      if (isEmpty(newValue))
        return;

      if (newValue !== prevValue) {
        newValues[prop] = newValue;
      }
    })

    return newValues;
  }
  saveUserData = (__values) => {
    const values = this.filterValues(this.props.user, __values);

    if (!isEmpty(values)) {
      console.log('to save', values);
      this.props.updateUserData(values);
    }
  };
  render() {
    return <UserDataEdit onSubmit={this.saveUserData} {...this.props.user}/>
  }
}

