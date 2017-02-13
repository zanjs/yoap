import React, { Component } from 'react'
import { Route } from 'react-router-dom'


export default class PathNotify extends Component {
  static defaultProps = {
    notify: () => {}
  };

  renderMatch = (props) => {
    const RouterComponent = this.props.component;

    return <RouterComponent {...props} ref={b => this.update(b)}/>
  };

  update = (wrapper) => {
    const { index, currentPage, notify } = this.props;
    if (wrapper && index !== currentPage) {
      notify(index)
    }
  };

  render() {
    const {component, index, ...restProps} = this.props;

    return (
      <Route {...restProps} render={this.renderMatch}/>
    )
  }
}

