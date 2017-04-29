import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Nav } from 'components'

const mapStateToProps = ({
  device: {saveValues, scrollY, width},
  user: {isAuthorized, isAdmin, name, isUserPage},
  theme: {current}
}) => ({
  navResize: h => saveValues({navHeight: h}),
  scrollY, width, theme: current,

  isAuthorized, isAdmin, name, isUserPage
});
@inject(mapStateToProps) @observer
export default class NavContainer extends Component {
  limit = 100;
  state = {navHidden: false, navFull: false};

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
      if (navFull)
        this.setState({navFull: false});

      return;
    }

    if (prev < next && !navHidden) {
      return this.setState({navHidden: true, navFull: false})
    }

    if (prev > next && navHidden) {
      return this.setState({navHidden: false, navFull: true})
    }
  };

  updateLinks = props => {
    const { isAuthorized, isAdmin } = props || this.props;
    let links = [];

    if (!isAuthorized) {
      links.push({
        to: '/signup',
        content: 'Стать хозяином'
      })
    } else {
      links.push({
        to: '/manage/create',
        content: 'Добавить'
      })
    }

    links.push({
      to: '/y',
      content: 'Объявления'
    });

    if (!isAuthorized) {
      links.push({
        to: '/signup',
        content: 'Регистрация'
      })
    }

    if (isAdmin) {
      links = [
        {
          to: '/manage',
          content: 'Управление'
        },
        {
          to: '/they',
          content: 'Пользователи'
        },
        ...links
      ]
    }

    this.setState({links});
  };

  componentWillMount() {
    this.updateLinks()
  }

  componentWillReceiveProps(nextProps) {
    const { width, scrollY, isAuthorized, isAdmin } = this.props;

    if (width !== nextProps.width) {
      this.resize();
    }

    if (scrollY !== nextProps.width) {
      this.getNavState(scrollY, nextProps.scrollY);
    }

    if (
      isAuthorized !== nextProps.isAuthorized
      || isAdmin !== nextProps.isAdmin
    ) {
      this.updateLinks(nextProps);
    }
  }

  componentDidMount() {
    setTimeout(this.resize, 300);
  }

  render() {
    const { navHidden, navFull, links } = this.state;
    const { width, children, className, name, theme, isUserPage } = this.props;

    return (
      <Nav hidden={navHidden} name={name} theme={theme} isLogout={isUserPage}
           full={navFull} width={width} className={className}
           getRef={this.getNavRef} links={links}>
        {children}
      </Nav>
    )
  }
}

