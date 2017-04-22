import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'

const mapStateToProps = ({user: { logout }}) => ({
  logout
})

@inject(mapStateToProps) @observer
export default class LogoutPage extends Component {
  componentWillMount() {
    this.props.logout()
  }
  render() {
    return (
      <Redirect to="/"/>
    )
  }
}

