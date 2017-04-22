import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { LoginForm } from 'components'

const mapStateToProps = ({
  user: {
    saveValues, loginUser,

    email, password,

    isFetching, isError, isAuthorized,
  }
}) => ({
  saveValues, loginUser,

  initialValues: {
    email, password
  },

  isFetching, isError, isAuthorized,
});

@inject(mapStateToProps) @observer
export default class LoginFormContainer extends Component {
  render() {
    const {
      saveValues, loginUser,

      initialValues: {
        email, phone, password
      },
      className,
      isFetching, isError, isAuthorized
    } = this.props;

    if (isAuthorized) {
      return <Redirect to="/you"/>
    }

    const props = {
      saveValues, loginUser,

      initialValues: {
        identifier: (phone || email),
        password
      },
      className,

      isFetching, isError
    }

    return (
      <LoginForm {...props}/>
    )
  }
}

