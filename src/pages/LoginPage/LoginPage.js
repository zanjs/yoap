import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Redirect } from 'react-router-dom'
import { observer, inject } from "mobx-react";
import { Button, FormGroup } from 'components'
import { classNames, isEmpty, createHandleChange, createHandleBlur  } from 'helpers'

import {
  MobileHeaderRatio, DesktopHeaderRatio,
  pagesTitles
} from 'config'

import {
  Header, Title, Container,
} from 'components'

import s from './LoginPage.sass'


const mapStateToProps = ({
  user: {
    saveValues, login,

    email, password,

    isFetching, isError, isAuthorized,
  }
}) => ({
  saveValues, login,

  initialValues: {
    email, password
  },

  isFetching, isError, isAuthorized,
});

@inject(mapStateToProps) @observer
export default class LoginPage extends Component {
  placeholders = {
    email: 'Email',
    password: 'Password'
  };

  initialState = {
    email: '',
    password: '',

    errors: {},
    success: {},
    normal: {},
  };

  state = {
    ...this.initialState,
    ...(this.props.initialValues || {})
  };

  onBlur = createHandleBlur(this);
  onChange = createHandleChange(this);

  extendInputProps = name => {
    const { isFetching, isError } = this.props;
    const { success, errors, normal } = this.state;
    return {
      name,
      ph: this.placeholders[name],

      // TODO: Fix default value update
      defaultValue: this.props.initialValues[name],

      isSuccess: success[name],
      isError: errors[name],
      isNormal: normal[name],

      msg: errors[name] || success[name],

      onBlur: this.onBlur,
      onChange: this.onChange,

      required: true,
      type: name,


      disabled: isFetching
    }
  };

  isValid = () => {
    return isEmpty(this.state.errors);
  };

  submitHandler = (e) => {
    e.preventDefault();

    if (this.isValid()) {
      this.props.login();
    }

    return false;
  };
  saveValues = (values) => {
    const {normal, errors, success, ...rest} = values;
    this.props.saveValues(rest);
  };

  clearAll = () => this.setState({
    ...this.initialState
  });

  componentWillUpdate(nextProps, nextState) {
    this.saveValues(nextState);
  }
  componentDidMount() {
    this.emailInput && this.emailInput.focus();
  }

  render() {
    const {
      isFetching, isAuthorized
    } = this.props;

    const title = pagesTitles.LoginPage;

    if (isAuthorized) {
      return <Redirect to="/you"/>
    }

    return (
      <div className={s.about}>
        <Helmet title={title}/>

        <Header className={s.header}>
          <Title type="1">{title}</Title>
        </Header>

        <Container tag="form" type="article" className={s.container} onSubmit={this.submitHandler}>
          <FormGroup {...this.extendInputProps('email')} getRef={b => this.emailInput = b}/>
          <FormGroup {...this.extendInputProps('password')} getRef={b => this.passwordInput = b}/>
          <Button disabled={isFetching} buttonType='submit' type="blue" className={s.button}>Enter</Button>
          <Button disabled={isFetching} buttonType='reset' type="gray" className={s.button} onClick={this.clearAll}>Clear All</Button>
        </Container>
      </div>
    )
  }
}
