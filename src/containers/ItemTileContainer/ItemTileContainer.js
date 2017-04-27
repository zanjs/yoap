import React, { Component, PropTypes } from 'react'
import { inject, observer } from 'mobx-react'
import { ItemTile } from 'components'
import { objectTypes, termTypes, subwaySpb } from 'constants'

const mapStateToProps = ({user: { isAdmin, _objects, isAuthorized, redirectWhenLogin, _featured }, items: {toggleFeaturedItem}}) => ({
  isAdmin, objects: _objects, featured: _featured,
  isAuthorized, toggleFeaturedItem,
  redirectWhenLogin
});

@inject(mapStateToProps) @observer
export default class ItemTileContainer extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  state = {fav: null};

  getPrice = () => {
    const { price } = this.props.data;

    if (price.length) {
      const monthlyId = termTypes.types[2].id;
      const monthly = price.find(item => item.id === monthlyId);

      if (monthly) {
        return {
          term: 'месяц',
          price: monthly.value
        }
      }

      const { id, value } = price[0];
      const { name } = termTypes.types.find(item => item.id === id);

      return {
        term: name.toLowerCase(),
        price: value
      }
    }

    return {price: price.amount || price, term: 'месяц'};
  };
  getSize = () => {
    let output = {};
    const { size, type } = this.props.data;

    if (size) {
      output.squares = size.squares && size.squares.total || size.squares;
      if (size.rooms && type.id !== objectTypes.types[2].id) {
        output.rooms = size.rooms;
      }
    }

    output.type = type && type.name;

    return output;
  };
  getSubway = loc => {
    if (loc && loc.subway && loc.subway.length) {
      const [station] = loc.subway;
      return {
        ...station,
        color: subwaySpb.find(station.id).color
      }
    }

    return {};
  };

  clickHandler = (e) => {
    e.preventDefault();

    const link =  this.wrapper.getAttribute('href');
    this.context.router.history.push(link);

    return false;
  };

  editClickHandler = () => {
    this.context.router.history.push(
      `/manage/${this.props.data._link}`
    )
  };

  isEditMode = () => {
    if (!this.props.isAuthorized)
      return false;

    if (this.props.edit)
      return true;

    if (this.props.isAdmin)
      return true;

    const { objects } = this.props;
    if (!objects || !objects.length)
      return false;

    return !!this.props.objects.find(
      item => item === this.props.data.id
    );
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

  isFeatured = () => {
    if (this.state.fav !== null) {
      return this.state.fav;
    }

    const { featured, data } = this.props;

    if (featured && featured.length) {
      const { id } = data;
      return !!featured.find(item => item === id);
    }

    return false;
  };
  getRef = b => {
    this.wrapper = b;
    if (this.props.getRef) {
      this.props.getRef(b);
    }
  }

  componentDidMount() {
    this.redirectWhenLogin(true);
  }
  render() {
    const {
      props: {
        className, contentClassName,
        imageClassName, data
      },
      clickHandler,
      editClickHandler,
      favoriteClickHandler,
      getRef
    } = this;

    if (!data)
      return null;

    const {
      title, location,
      category, link,
      images, rating
    } = data;

    const { squares, rooms, type } = this.getSize();
    const { price, term } = this.getPrice();
    const subway = this.getSubway(location);
    const featured = this.isFeatured();

    const props = {
      featured, squares, rooms, type, price,
      term, title, category, images, rating,
      subway, location, link,
      edit: this.isEditMode(),

      contentClassName, imageClassName,
      className, getRef,

      onFavoriteClick: favoriteClickHandler,
      onClick: clickHandler,
      onEditClick: editClickHandler
    }

    return <ItemTile {...props}/>
  }
}

