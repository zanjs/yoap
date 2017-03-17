import React, { Component } from 'react'
import { Route } from 'react-router-dom'



export default class RouteNotify extends Component {
  renderMatch = props => {
    const RouterComponent = this.props.component || this.props.render;

    return <RouterComponent {...props} ref={b => this.update(b)}/>
  };

  update = (wrapper) => {
    const { index, currentPage, notify } = this.props;
    if (wrapper && notify && index !== currentPage) {
      notify(index)
    }
  };


  render() {
    return (
      <Route {...this.props}/>
    )

    // const {component, index, ...restProps} = this.props;
    //
    // return (
    //   <Route {...restProps} render={this.renderMatch}/>
    // )
  }
}
