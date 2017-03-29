import React, { Component, } from 'react'
import Helmet from 'react-helmet'
import DevTools, { configureDevtool } from 'mobx-react-devtools'
import {
  HomePage, LoginPage, SignupPage,
  ItemsListPage, ItemPage, UserPage,
  ItemPageEdit, ManageItemsPage
} from 'pages'
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'
import {
  PagesTransitions, Overlay,
  Defender, PathNotify, Footer
} from 'components'
import { NavContainer } from 'containers'
import s from './App.sass'

// configureDevtool({
//   // Turn on logging changes button programmatically:
//   logEnabled: true,
//   // Turn off displaying conponents' updates button programmatically:
//   updatesEnabled: false,
//   renderReporter: true
// });


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
            titleTemplate="%s — YOAP"
            defaultTitle="YOAP - Ваши апартаменты"
          />

          {/* Defend your project. Works only in production mode. */}
          {/*{!userHasAuthorized && <Redirect to="/defender"/>}*/}

          {/*<Route path="/defender" render={() => (*/}
            {/*<Defender userHasAuthorized={userHasAuthorized} submitHandler={this.submitHandler}/>*/}
          {/*)}/>*/}

          {/* Place for Navigation, Sidebar, Modal, etc.  */}
          <NavContainer />

          {/* Routes */}
          <PagesTransitions>
            <Switch>
              <Route path="/" exact component={HomePage}/>
              <Route path="/login" component={LoginPage}/>
              <Route path="/signup" component={SignupPage} />
              <Route path="/y" exact component={ItemsListPage}/>
              <Route path="/y/edit" exact component={ItemPageEdit}/>
              <Route path="/y/:link" exact component={ItemPage}/>
              <Route path="/you" exact component={UserPage}/>
              <Route path="/manage" exact component={ManageItemsPage}/>
            </Switch>
          </PagesTransitions>
          {/*<PagesTransitions className={s.content}>*/}
            {/*<PathNotify index={0} path="/" exact component={HomePage}/>*/}
            {/*<PathNotify index={1} path="/login" component={LoginPage}/>*/}
            {/*<PathNotify index={2} path="/signup" component={SignupPage}/>*/}
          {/*</PagesTransitions>*/}

          {/* App Footer */}
          <Footer />

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
