import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { SignupFormContainer } from 'containers'
import { FlexGrid } from 'components'
import { pagesTitles } from 'config'
import {
  Header, Title, Container,
} from 'components'
import s from './SignupPage.sass'


const mapStateToProps = ({
  device: { height }
}) => ({
  height: `${height}px`
});

@inject(mapStateToProps) @observer
export default class SignupPage extends Component {
  render() {
    const {
      isFetching, isAuthorized, height
    } = this.props;

    const title = pagesTitles.SignupPage;

    if (isAuthorized) {
      return <Redirect to="/you"/>
    }

    return (
      <FlexGrid justify="center" align="center" direction="column"
                style={{minHeight: height}} className={s.wrapper}>
        <Helmet title={title}/>
        <Container type="article" className={s.container}>
          <SignupFormContainer />
        </Container>
      </FlexGrid>
    )
  }
}
