import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { observer, inject } from 'mobx-react'
import { LoginFormContainer } from 'containers'
import { Image, FlexGrid, Container, } from 'components'
import {
  MobileHeaderRatio, DesktopHeaderRatio,
  pagesTitles
} from 'config'
import s from './LoginPage.sass'
import image from 'images/loginImage'

const mapStateToProps = ({
  device: { height }
}) => ({
  height: `${height}px`
});

@inject(mapStateToProps) @observer
export default class LoginPage extends Component {
  render() {
    const {
      height
    } = this.props;

    const title = pagesTitles.LoginPage;

    return (
      <FlexGrid direction="column" justify="center"
                className={s.wrapper} style={{minHeight: height}}>
        <Helmet title={title}/>

        <Container type="article" className={s.container}>
          <LoginFormContainer className={s.form} />
        </Container>
        <div className={s.image_container}>
          <Image withLoading src={image} className={s.image}/>
        </div>
      </FlexGrid>
    )
  }
}
