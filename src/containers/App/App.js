import React, { Component, } from 'react'
import Helmet from 'react-helmet'
import { inject, observer } from 'mobx-react'
import {
  HomePage, LoginPage, SignupPage,
  ItemsListPage, ItemPage, UserPage,
  ItemPageEdit, ManageItemsPage, UserItemsPage,
  UserFeaturedPage, LogoutPage,
  ManageUsersPage, UsersPage
} from 'pages'
import {
  BrowserRouter as Router,
  Route, Redirect
} from 'react-router-dom'
import {
  PagesTransitions, Overlay, Footer
} from 'components'
import { NavContainer, DefenderContainer } from 'containers'
import s from './App.sass'

const mapStateToProps = ({user: {isAllowed}, device: {isMobile}}) => ({
  isAllowed,
  isMobile
})

@inject(mapStateToProps) @observer
export default class App extends Component {
  state = {DevTools: null};
  componentWillMount() {
    console.log('isMobile', this.props.isMobile);
    if (module.hot && !this.props.isMobile) {
      System.import('mobx-react-devtools').then(data => {
        this.setState({DevTools: data.default})
      })
    }
  }
  render() {
    const { DevTools } = this.state;
    const { isAllowed } = this.props;
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
          {!isAllowed && <Redirect to="/defender"/>}
          <Route path="/defender" component={DefenderContainer} />

          {/* Place for Navigation, Sidebar, Modal, etc.  */}
          <NavContainer />

          {/* Routes */}
          <PagesTransitions>
            <Route path="/" exact component={HomePage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/signup" component={SignupPage} />
            <Route path="/logout" exact component={LogoutPage}/>
            <Route path="/y" exact component={ItemsListPage}/>
            <Route path="/y/:link" exact component={ItemPage}/>
            <Route path="/you" exact component={UserPage}/>
            <Route path="/you/yours" exact component={UserItemsPage} />
            <Route path="/you/featured" exact component={UserFeaturedPage} />
            <Route path="/they" exact component={ManageUsersPage} />
            <Route path="/they/:id" exact component={UsersPage}/>
            <Route path="/manage" exact component={ManageItemsPage}/>
            <Route path="/manage/:link" component={ItemPageEdit}/>
            <Route path="/they/manage/:userId/:link" component={ItemPageEdit}/>
            <Route render={() => {
              return <Redirect to="/y"/>
            }}/>
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
          {DevTools && <DevTools />}
        </div>
      </Router>
    )
  }
}
