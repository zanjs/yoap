import React, { Component } from 'react'
import PropTypes from 'prop-types'
import{ ItemNumbersData } from 'components'
import { inject, observer } from 'mobx-react'

const mapStateToProps = ({user: { isAuthorized, redirectWhenLogin, _featured }, items: {toggleFeaturedItem}}) => ({
  isAuthorized, toggleFeaturedItem,
  redirectWhenLogin,
  featured: _featured,
});

@inject(mapStateToProps) @observer
export default class ItemNumbersDataContainer extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    isActive: null,
    featured: parseInt(this.props.data.featured, 10)
  }

  featuredHandler = val => {
    if (val < 0) {
      return 0;
    }

    return val;
  };
  featuredClickHandler = () => {
    if (!this.props.isAuthorized) {
      this.redirectWhenLogin();
      return this.context.router.history.push('/login');
    }
    if (this.props.data.id) {
      this.props.toggleFeaturedItem(this.props.data.id);
    }

    const isActive = this.isFeatured();
    const { featured } = this.state;

    this.setState({
      isActive: !isActive,
      featured: this.featuredHandler(isActive ? featured - 1 : featured + 1)
    })
  }

  isFeatured = () => {
    if (this.state.isActive !== null) {
      return this.state.isActive;
    }

    const { featured, data } = this.props;

    if (featured && featured.length) {
      const { id } = data;
      return !!featured.find(item => item === id);
    }

    return false;
  };

  redirectWhenLogin = (clear) => {
    this.props.redirectWhenLogin(
      clear
        ? null
        : this.context.router.route.match.url
    );
  };
  favoriteClickHandler = () => {
    if (!this.props.isAuthorized) {
      this.redirectWhenLogin();
      return this.context.router.history.push('/login');
    }

    const fav = this.isFeatured();
    this.setState({
      fav: !fav
    });

    this.props.toggleFeaturedItem(this.props.data.id);
  };

  componentWillUpdate(nextProps) {
    if (nextProps.data.featured !== this.props.data.featured) {
      this.setState({featured: parseInt(nextProps.data.featured, 10)});
    }
  }

  render() {
    const { views, createdAt } = this.props.data;
    const { children } = this.props;
    const { featured } = this.state;
    const { featuredClickHandler } = this;
    const isActive = this.isFeatured();

    return (
      <ItemNumbersData isFeaturedActive={isActive} views={views}
                       onFeaturedClick={featuredClickHandler}
                       date={createdAt} featured={featured}>
        {children}
      </ItemNumbersData>
    )
  }
}

