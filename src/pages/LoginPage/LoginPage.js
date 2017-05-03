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
  device: { height, isMobile }
}) => ({
  height: `${height}px`,
  isMobile
});

@inject(mapStateToProps) @observer
export default class LoginPage extends Component {
  render() {
    const {
      height, isMobile
    } = this.props;

    const title = pagesTitles.LoginPage;

    return (
      <FlexGrid direction="column" justify="center"
                className={s.wrapper} style={{minHeight: height}}>
        <Helmet title={title}/>

        <Container type="article" className={s.container}>
          <LoginFormContainer className={s.form} />
        </Container>
        {!isMobile && <div className={s.image_container}>
          <Image withLoading src={image} className={s.image}/>
        </div>}
      </FlexGrid>
    )
  }
}
