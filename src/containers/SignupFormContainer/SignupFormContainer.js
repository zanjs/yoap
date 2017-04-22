import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { SignupForm } from 'components'

const mapStateToProps = ({
  user: {
    saveValues, signup,

    name, email, phone, password,

    isFetching, isError, isAuthorized,
  }
}) => ({
  saveValues, signup,

  initialValues: {
    name, email, phone, password,
  },

  isFetching, isError, isAuthorized,
});

@inject(mapStateToProps) @observer
export default class SignupFormContainer extends Component {
  render() {
    const {
      saveValues, signup,

      initialValues: {
        name, email, phone, password,
      },

      isFetching, isError, isAuthorized,
    } = this.props;

    const props = {
      saveValues, signup,

      initialValues: {
        name, email, phone, password,
      },

      isFetching, isError,
    };

    if (isAuthorized) {
      return <Redirect to="/you"/>
    }

    return (
      <SignupForm {...props}/>
    )
  }
}

