import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import {
  Title, Container,
  FormGroup, Button, FlexGrid,
  Content
} from 'components'
import { createHandleChange, createHandleBlur } from 'validation/userValidation'
import { isEmpty, classNames } from 'helpers'
import s from './ForgotPasswordPage.sass'

const mapStateToProps = store => {
  const {
    device: {height},
    user: {
      email, errorMessage, message,
      isError, isFetching, restorePassword,
      saveValues, isAuthorized
    }
  } = store;
  return {
    height: `${height}px`,
    email, errorMessage, message,
    isError, isFetching,
    onSubmit: restorePassword,
    saveValues, isAuthorized
  }
}

@inject(mapStateToProps) @observer
export default class ForgotPasswordPage extends Component {
  state = {
    email: '',
    errors: {},
    success: {},
    normal: {},
    message: ''
  }

  onChange = createHandleChange(this);
  onBlur = createHandleBlur(this)

  getInputProps = () => {
    const { isFetching, isError } = this.props;
    const { success, errors, normal } = this.state;
    const name = 'email';

    return {
      name,
      ph: 'E-mail',
      defaultValue: this.props.email,
      isSuccess: success[name],
      isError: errors[name],
      isNormal: normal[name],

      msg: errors[name] || success[name],
      required: true,
      disabled: isFetching,

      onChange: this.onChange,
      onBlur: this.onBlur,
      type: 'email'
    }
  }

  submitHandler = e => {
    e.preventDefault();
    const email = isEmpty(this.state.email) ? this.props.email : this.state.email;

    if (isEmpty(email)) {
      return this.setState({message: 'Вы не ввели почту!'})
    }

    this.props.saveValues({email});
    this.props.onSubmit(email); this.setState({message: ''})

    return false;
  }

  render() {
    const { height, errorMessage, isError, isFetching, isAuthorized } = this.props;
    const message = errorMessage || this.props.message || isError.message || isError || this.state.message;

    if (isAuthorized) {
      return <Redirect to="/you"/>
    }

    return (
      <FlexGrid justify="center" align="center" direction="column"
                style={{minHeight: height}} className={classNames(s.wrapper, isFetching && s.fetch)}>
        <Helmet>
          <title>Забыли пароль?</title>
          <meta name="description" content="Заполните форму и мы поможем вам восстановить его. 🎉"/>
        </Helmet>
        <Container type="article" className={s.container}>
          <Title size="2" light nooffsets>Восстановление <br/>пароля</Title>
          <Content regular gray size="3" className={s.content}>
            Укажите адрес Вашей электронной
            <br/>почты, и мы вышлем ссылку для <br/>
            восстановления доступа к аккаунту
          </Content>
          <form onSubmit={this.submitHandler}>
            <FormGroup {...this.getInputProps()}/>
            {message && <Content>{message}</Content>}
            <FlexGrid justify="space-between" align="center"
                      className={s.buttons}>
              <Button buttonType="submit" type="pink">Готово</Button>
              <Button to="/login" type="text">Отмена</Button>
            </FlexGrid>
          </form>
        </Container>
      </FlexGrid>
    )
  }
}

