import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Nav } from 'components'

const mapStateToProps = ({
  device: {saveValues, scrollY, width},
  user: {name}
}) => ({
  navResize: h => saveValues({navHeight: h}),
  scrollY, width, name
});
@inject(mapStateToProps) @observer
export default class NavContainer extends Component {
  limit = 100;
  state = {navHidden: false, navFull: false};
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
  ];

  getNavRef = b => this.wrapper = b;
  resize = () => {
    this.props.navResize(
      parseInt(this.wrapper.clientHeight, 10)
    )
  };

  getNavState = (prev, next, newState) => {
    const { limit } = this;
    const { navHidden, navFull } = newState || this.state;

    if (next < limit && navHidden) {
      return this.setState({navHidden: false, navFull: false})
    } else if (next < limit) {
      if (navFull) return this.setState({navFull: false})
      return;
    }

    if (prev < next && !navHidden) {
      return this.setState({navHidden: true, navFull: false})
    }

    if (prev > next && navHidden) {
      return this.setState({navHidden: false, navFull: true})
    }
  };

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
    const { navHidden, navFull } = this.state;

    return (
      <Nav hidden={navHidden} name={this.props.name} full={navFull} width={this.props.width}
           getRef={this.getNavRef} links={this.links}/>
    )
  }
}

