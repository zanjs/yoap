import React, { Component, PropTypes } from 'react'
import { Provider } from 'mobx-react'
import { store } from 'store'


export default class RouterStoreProvider extends Component {
  static childContextTypes = {
    router: PropTypes.object
  };

  getChildContext = () => {
    return {
      router: this.props.router
    };
  };

  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount();
    }
  }

  render() {
    return (
      <Provider {...store}>
        {this.props.children}
      </Provider>
    )
  }
}
