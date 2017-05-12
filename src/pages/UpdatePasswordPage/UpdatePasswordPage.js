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
import s from './UpdatePasswordPage.sass'

const mapStateToProps = store => {
  const {
    device: {height},
    user: {
      errorMessage, message,
      isError, isFetching, updatePassword,
      isAuthorized
    }
  } = store;
  return {
    height: `${height}px`,
    errorMessage, message,
    isError, isFetching,
    onSubmit: updatePassword,
    isAuthorized
  }
}

@inject(mapStateToProps) @observer
export default class UpdatePasswordPage extends Component {
  state = {
    password: '',
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
    const name = 'password';

    return {
      name,
      ph: 'Password',
      defaultValue: this.props.email,
      isSuccess: success[name],
      isError: errors[name],
      isNormal: normal[name],

      msg: errors[name] || success[name],
      required: true,
      disabled: isFetching,

      onChange: this.onChange,
      onBlur: this.onBlur,
      type: 'password'
    }
  }

  submitHandler = e => {
    e.preventDefault();
    const password = this.state.password;
    const {match: {params: {id}}} = this.props;

    if (isEmpty(password)) {
      return this.setState({message: 'Вы не ввели новый пароль!'})
    }
    if (isEmpty(id)) {
      return this.setState({message: 'Вы перешли по некорректной ссылке, обратитесь к администратору!'})
    }

    this.props.onSubmit({
      password, id
    });
    this.setState({message: ''})

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
          <title>Восстановление пароля</title>
          <meta name="description" content="Придумайте новый надежный пароль"/>
        </Helmet>
        <Container type="article" className={s.container}>
          <Title size="2" light nooffsets>Восстановление <br/>пароля</Title>
          <Content regular gray size="3" className={s.content}>
            Придумайте новый надежный пароль
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

