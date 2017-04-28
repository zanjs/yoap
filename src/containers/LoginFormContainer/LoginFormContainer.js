import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { LoginForm } from 'components'

const mapStateToProps = ({
  user: {
    saveValues, login,

    email, password,

    isFetching, isError, isAuthorized,
    errorMessage
  }
}) => ({
  saveValues, login,

  initialValues: {
    email, password
  },

  isFetching, isError, isAuthorized,
  errorMessage
});

@inject(mapStateToProps) @observer
export default class LoginFormContainer extends Component {
  render() {
    const {
      saveValues, login,

      initialValues: {
        email, phone, password
      },
      className,
      isFetching, isError, isAuthorized,
      errorMessage
    } = this.props;

    if (isAuthorized) {
      return <Redirect to="/you"/>
    }

    const props = {
      saveValues, login,

      initialValues: {
        identifier: (phone || email),
        password
      },
      className, errorMessage,

      isFetching, isError
    }

    return (
      <LoginForm {...props}/>
    )
  }
}

