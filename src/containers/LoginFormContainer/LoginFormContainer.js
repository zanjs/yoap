import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { LoginForm } from 'components'

const mapStateToProps = ({
  user: {
    saveValues, login,

    email, password,

    isFetching, isError, isAuthorized,
  }
}) => ({
  saveValues, login,

  initialValues: {
    email, password
  },

  isFetching, isError, isAuthorized,
});

@inject(mapStateToProps) @observer
export default class LoginFormContainer extends Component {
  render() {
    const {
      saveValues, login,

      initialValues: {
        email, password
      },
      className,
      isFetching, isError, isAuthorized
    } = this.props;

    // if (isAuthorized) {
    //   return <Redirect to="/you"/>
    // }

    const props = {
      saveValues, login,

      initialValues: {
        email, password
      },
      className,

      isFetching, isError
    }

    return (
      <LoginForm {...props}/>
    )
  }
}

