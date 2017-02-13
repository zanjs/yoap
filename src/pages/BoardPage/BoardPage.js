import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { observer, inject } from "mobx-react";
import { classNames, isEmpty } from 'helpers'

import {
  MobileHeaderRatio, DesktopHeaderRatio,
  pagesTitles, dur as duration, ease as easeConfig
} from 'config'

import {
  Header, Title, Container,
} from 'components'

import s from './BoardPage.sass'


const mapStateToProps = ({
  device: {
    height, width, isMobile
  },
  items: {
    data
  }
}) => ({
  height, width, isMobile, data
});

@inject(mapStateToProps) @observer
export default class BoardPage extends Component {


  render() {
    const props = this.props;
    const { isMobile, data } = props;
    const height = props.height * (isMobile ? MobileHeaderRatio : DesktopHeaderRatio ) + 'px';

    return (
      <div className={s.about}>
        <Helmet title={pagesTitles.BoardPage}/>

        <Header style={{height}} className={s.header}>
          <Title type="1">Board Page</Title>
        </Header>

        <Container type="article">
          {data.map(item => {
            const data = item.prettyData;

            return (
              <div className={s.item} key={data.id}>
                {Object.keys(data).map((item, key) => (
                  <div key={key}>
                    <strong>{item}:</strong>
                    <span>{JSON.stringify(data[item])}</span>
                  </div>
                ))}
                <hr/>
              </div>
            )
          })}
        </Container>
      </div>
    )
  }
}
