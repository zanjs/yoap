import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { observer, inject } from "mobx-react";
import { classNames, isEmpty } from 'helpers'

import {
  MobileHeaderRatio, DesktopHeaderRatio,
  pagesTitles
} from 'config'

import {
  Header, Title, Container,
} from 'components'

import s from './InfoPage.sass'


const mapStateToProps = ({
  device: {
    height, width, isMobile, windowWidth,
    browser, support
  },
  todo: {
    addTodo, completedCount, length,

    clearCompleted, toggleAll, removeAll
  }
}) => ({
  height, width, isMobile,
  windowWidth, browser, support,

  addTodo, completedCount, length,
  clearCompleted, toggleAll, removeAll
});

@inject(mapStateToProps) @observer
export default class InfoPage extends Component {
  getLocalStorage = () => {
    return Object.keys(localStorage).filter(key => key.toLowerCase().indexOf('mobx') === -1);

    // let archive = {}, // Notice change here
    //   keys = Object.keys(localStorage),
    //   i = keys.length;
    //
    // while ( i-- ) {
    //   archive[ keys[i] ] = localStorage.getItem( keys[i] );
    // }
    // return archive;
  };

  render() {
    const props = this.props;
    const {
      isMobile, completedCount,
      length, windowWidth, width,
      browser, support
    } = props;

    const height = props.height * (isMobile ? MobileHeaderRatio : DesktopHeaderRatio ) + 'px';

    const data = [{
      hr: true,
      info: 'Application Width',
      value: width + 'px',
    }, {
      info: 'Application Height',
      value: props.height + 'px'
    }, {
      info: 'Application window Width',
      value: windowWidth + 'px'
    }, {
      hr: true,
      info: 'Current Browser',
      value: browser
    }, {
      info: 'Device Support',
      value: JSON.stringify(support)
    }, {
      info: 'isMobile',
      value: isMobile.toString()
    }, {
      hr: true,
      info: 'Completed Todo\'s',
      value: completedCount
    },  {
      info: 'Summary Todo\'s',
      value: length
    }, {
      hr: true,
      info: 'Saved keys in local storage',
      value: JSON.stringify(this.getLocalStorage())
    }];

    return (
      <div className={s.about}>
        <Helmet title={pagesTitles.InfoPage}/>

        <Header style={{height}} className={s.header}>
          <Title type="1">{pagesTitles.InfoPage}</Title>
        </Header>

        <Container type="article" className={s.container}>
          {data.map((item, key) => (
            <div key={key} className={classNames(s.block, item.hr && s.block_hr)}>
              <span className={s.info}>{item.info}</span>
              <span className={s.value}>{item.value}</span>
            </div>
          ))}
        </Container>
      </div>
    )
  }
}
