import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { ItemStatistics } from 'components'
import {
  OBJECT_VIEW, PHONE_VIEW,
  FAVORITE_UNSET, FAVORITE_SET
} from 'constants/itemConstants/views'

const mapStateToProps = store => ({
  data: store.items.users
})

@inject(mapStateToProps) @observer
export default class ItemStatisticsContainer extends Component {
  state = {
    data: [], minViews: 0, maxViews: 0,
    minPhoneViews: 0, maxPhoneViews: 0,
    viewsSum: 0, phoneViewsSum: 0, id: 0
  };

  index = 0;
  hasSetByUser = false;

  createMonthArray = (start, end, {prevMonth, date, currentYear}) => {
    let emptyArray = [];

    for (let i = start, l = end; i <= l; i++) {
      if (i !== 0) {
        emptyArray.push(i);
      }
    }

    return emptyArray.map(item => {
      let current = parseInt(item, 10);
      const isPrev = current < 0;
      current = isPrev ? -current : +current;
      const year = isPrev ? currentYear : date.getFullYear();
      const month = isPrev ? prevMonth : date.getMonth();

      return {
        day: current.toString().length < 2 ? '0' + current : current,
        date: new Date(year, month, current)
      }
    });
  }
  // create empty month
  createEmptyMonth = () => {
    const date = new Date;
    const lastDay = date.getDate();
    let startDay = 0;

    const daysInTheMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    let prevMonth, currentYear;

    if (lastDay < daysInTheMonth) {
      prevMonth = date.getMonth() - 1 >= 0 ? date.getMonth() - 1 : 12;
      currentYear = prevMonth === 12 ? date.getFullYear() - 1 : date.getFullYear();
      const daysInPastMonth = new Date(currentYear, prevMonth, 0).getDate();

      startDay = -(daysInPastMonth - lastDay);
    }

    return this.createMonthArray(startDay, lastDay, {
      prevMonth, currentYear, date
    })
  };

  // get name of statistic view
  getPropName = type => {
    let prop;
    switch(type) {
      case OBJECT_VIEW:
        prop = 'views';
        break;
      case PHONE_VIEW:
        prop = 'phoneViews';
        break;
      case FAVORITE_SET:
        prop = 'favorites';
        break;
      case FAVORITE_UNSET:
        prop = 'unsetFavorites';
        break;
    }

    return prop;
  }
  // get statistics by date
  parseObjectStatistics = data => {
    let res = [];
    data.forEach(item => {
      if (!item)
        return null;

      const __date = new Date(item.date);
      const foundIndex = res.findIndex(it => {
        const theDate = typeof it.date === 'string' ? new Date(it.date) : it.date;
        if (theDate.getFullYear() !== __date.getFullYear()) {
          return false;
        }
        if (theDate.getMonth() !== __date.getMonth()) {
          return false;
        }
        if (theDate.getDate() !== __date.getDate()) {
          return false;
        }

        return true;
      })
      const prop = this.getPropName(item.type) || 'views';

      if (foundIndex >= 0) {
        const prevValue = res[foundIndex][prop] || 0
        return res[foundIndex][prop] = prevValue + 1;
      }

      res.push({
        ...item,
        date: __date,
        [prop]: 1,
      })
    })

    return res;
  }
  // get data limits
  getLimits = data => {
    let minViews;
    let maxViews = 0;
    let minPhoneViews;
    let maxPhoneViews = 0;
    let minFavorites;
    let maxFavorites = 0;
    let minFavoritesUnset;
    let maxFavoritesUnset = 0;
    let viewsSum = 0;
    let phoneViewsSum = 0;
    let favoritesSum = 0;
    let favoritesUnsetSum = 0;

    data.map(day => {
      const {
        phoneViews = 0, views = 0,
        favorites = 0, unsetFavorites = 0
      } = day;
      if (minViews == null || views < minViews) {
        minViews = views;
      }
      if (minPhoneViews == null || phoneViews < minPhoneViews) {
        minPhoneViews = phoneViews;
      }
      if (minFavorites == null || favorites < minFavorites) {
        minFavorites = favorites;
      }
      if (minFavoritesUnset == null || unsetFavorites < minFavoritesUnset) {
        minFavoritesUnset = unsetFavorites;
      }
      if (views > maxViews) {
        maxViews = views;
      }
      if (phoneViews > maxPhoneViews) {
        maxPhoneViews = phoneViews;
      }
      if (favorites > maxFavorites) {
        maxFavorites = favorites;
      }
      if (unsetFavorites > maxFavoritesUnset) {
        maxFavoritesUnset = unsetFavorites;
      }

      viewsSum+=views; phoneViewsSum+=phoneViews;
      favoritesSum+=favorites; favoritesUnsetSum+=unsetFavorites;
    })

    return {
      minViews: minViews || 0, maxViews,
      minPhoneViews: minPhoneViews || 0,
      maxPhoneViews, minFavorites: minFavorites || 0,
      maxFavorites, minFavoritesUnset: minFavoritesUnset || 0,
      maxFavoritesUnset, viewsSum,
      phoneViewsSum, favoritesSum,
      favoritesUnsetSum
    }
  }

  getBiggestIndex = (props = this.props) => {
    let index = 0;
    let max = 0;
    props.data.forEach((item, idx) => {
      if (item.statistics && item.statistics.length > max) {
        index = idx;
        max = item.statistics.length
      }
    })

    return index;
  };

  update = (props = this.props) => {
    const index = !this.hasSetByUser ? this.getBiggestIndex(props) : this.index;
    const object = props.data[index] || {};
    const objectStatistics = object.statistics || [];
    const month = this.createEmptyMonth();
    const statistics = this.parseObjectStatistics(objectStatistics);
    const limits = this.getLimits(statistics);

    const data = month.map(day => {
      const dayDate = typeof day.date === 'string' ? new Date(day.date) : day.date;
      const res = statistics.find(it => {
        const theDate = typeof it.date === 'string' ? new Date(it.date) : it.date;
        if (theDate.getFullYear() !== dayDate.getFullYear()) {
          return false;
        }
        if (theDate.getMonth() !== dayDate.getMonth()) {
          return false;
        }
        if (theDate.getDate() !== dayDate.getDate()) {
          return false;
        }

        return true;
      }) || {};

      this.isFirst = false;

      return {
        ...day,
        views: res.views || 0,
        phoneViews: res.phoneViews || 0,
        favorites: res.favorites || 0,
        favoritesUnset: res.favoritesUnset || 0,
      }
    })

    return {
      data, ...limits,
      id: object.order || 0
    }
  }

  nextObject = () => {
    const max = this.props.data.length - 1;
    let index = this.index + 1;

    if (index > max) {
      index = 0;
    }

    this.index = index;
    this.hasSetByUser = true;
    this.forceUpdate();
  }
  prevObject = () => {
    const max = this.props.data.length - 1;
    let index = this.index - 1;

    if (index < 0) {
      index = max;
    }

    this.index = index;
    this.hasSetByUser = true;
    this.forceUpdate();
  }

  componentDidMount() {
    this.props.changeBackground('#2b2c3c');
  }

  render() {
    const data = this.update();
    return <ItemStatistics onPrevClick={this.prevObject}
                           onNextClick={this.nextObject}
                           {...data}/>
  }
}

