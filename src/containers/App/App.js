import React, { Component, } from 'react'
import Helmet from 'react-helmet'
import DevTools from 'mobx-react-devtools'
import { HomePage } from 'pages'
import {
  BrowserRouter as Router,
  Route, Redirect
} from 'react-router-dom'
import {
  PagesTransitions, Overlay,
  Defender, PathNotify
} from 'components'
import { NavContainer } from 'containers'

import s from './App.sass'


export default class App extends Component {
  state = {
    currentPage: 0,
    userHasAuthorized: !!module.hot
  };

  submitHandler = value => {
    if (value !== ___PW) {
      return 'Password is not correct!'
    }

    this.setState({userHasAuthorized: true})
  };

  render() {
    const { userHasAuthorized } = this.state;

    return (
      <Router>
        <div className={s.root}>
          {/* React Helmet component for page info management */}
          <Helmet
            htmlAttributes={{lang: "en", amp: undefined}} // amp takes no value
            titleTemplate="%s — yoap"
            defaultTitle="yoap"
          />

          {/* Defend your project. Works only in production mode. */}
          {/*{!userHasAuthorized && <Redirect to="/defender"/>}*/}

          {/*<Route path="/defender" render={() => (*/}
            {/*<Defender userHasAuthorized={userHasAuthorized} submitHandler={this.submitHandler}/>*/}
          {/*)}/>*/}

          {/* Place for Navigation, Sidebar, Modal, etc.  */}
          <NavContainer />

          {/* Routes */}
          <PagesTransitions className={s.content}>
            <PathNotify index={0} path="/" exact component={HomePage}/>
          </PagesTransitions>

          {/* Whole App overlay. */}
          {/* You can use this component everywhere */}
          {/* all the actions with it & duplicates will be synced by redux */}
          <Overlay />

          {/* MobX Devtools */}
          <DevTools />
        </div>
      </Router>
    )
  }
}
