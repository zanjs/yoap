import React, { Component } from 'react'
import { Button, FormGroup, Title, FlexGrid, Content } from 'components'
import { Link as RouterLink } from 'react-router-dom'
import { createHandleChange, createHandleBlur  } from 'validation/userValidation'
import { classNames, isEmpty } from 'helpers'
import s from './LoginForm.sass'


export default class LoginForm extends Component {
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

  submitHandlerclearAll = () => this.setState({
    ...this.initialState
  });

  componentWillUpdate(nextProps, nextState) {
    this.saveValues(nextState);
  }
  componentDidMount() {
    this.emailInput && this.emailInput.focus();
  }

  getEmailInputRef = b => this.emailInput = b;
  getPasswordInputRef = b => this.passwordInput = b;

  render() {
    const { isFetching, isAuthorized, className } = this.props;

    return (
      <form onSubmit={this.submitHandler} className={classNames(s.wrapper, className, isFetching && s.wrapper_disabled)}>
        <Title size="2" light>Вход в личный <br/>кабинет</Title>
        <FormGroup {...this.extendInputProps('email')} getRef={this.getEmailInputRef}/>
        <FormGroup {...this.extendInputProps('password')} getRef={this.getPasswordInputRef}/>
        <FlexGrid align="center" className={s.buttons}>
          <Button disabled={isFetching} buttonType='submit' type="pink" className={s.button}>Готово</Button>
          <Content tag={RouterLink} to="/reset-password"
                   gray size="5" className={s.reset}>
            Забыли пароль?
          </Content>
        </FlexGrid>
      </form>
    )
  }
}
