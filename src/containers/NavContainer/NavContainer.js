import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Nav } from 'components'

const mapStateToProps = ({
  device: {saveValues, scrollY, width}
}) => ({
  navResize: h => saveValues({navHeight: h}),
  scrollY, width
});
@inject(mapStateToProps) @observer
export default class NavContainer extends Component {
  limit = 100;
  state = {navHidden: false};
  links = [
    {
      to: '/',
      content: 'Стать хозяином'
    },
    {
      to: '/',
      content: 'Помощь'
    },
    {
      to: '/signup',
      content: 'Регистрация'
    }
  ]

  getNavRef = b => this.wrapper = b;
  resize = () => {
    this.props.navResize(
      parseInt(this.wrapper.clientHeight, 10)
    )
  };

  getNavState = (prev, next, newState) => {
    const { limit } = this;
    const { navHidden } = newState || this.state;

    if (next < limit && navHidden) {
      return this.setState({navHidden: false})
    } else if (next < limit) {
      return;
    }

    if (prev < next && !navHidden) {
      return this.setState({navHidden: true})
    }

    if (prev > next && navHidden) {
      return this.setState({navHidden: false})
    }
  }

  componentWillReceiveProps(nextProps) {
    const { width, scrollY } = this.props;

    if (width !== nextProps.width) {
      this.resize();
    }

    if (scrollY !== nextProps.width) {
      this.getNavState(scrollY, nextProps.scrollY);
    }
  }
  componentDidMount() {
    setTimeout(this.resize, 300);
  }


  render() {

    return (
      <Nav hidden={this.state.navHidden} width={this.props.width}
           getRef={this.getNavRef} links={this.links}/>
    )
  }
}

