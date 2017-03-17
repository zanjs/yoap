import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Button, FormGroup, Title, FlexGrid, Content } from 'components'
import { classNames, isEmpty } from 'helpers'
import { createHandleChange, createHandleBlur } from 'validation/userValidation'
import s from './SignupForm.sass'


export default class SignupForm extends Component {
  placeholders = {
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    password: 'Password',
  };

  initialState = {
    name: '',
    email: '',
    phone: '',
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
      this.props.signup();
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
    this.nameInput && this.nameInput.focus();
  }

  render() {
    const {
      isFetching, isAuthorized
    } = this.props;

    return (
      <form onSubmit={this.submitHandler} className={s.wrapper}>
        <Title size="2" light>Регистрация</Title>
        <FormGroup {...this.extendInputProps('name')} getRef={b => this.nameInput = b}/>
        <FormGroup {...this.extendInputProps('email')} getRef={b => this.emailInput = b}/>
        <FormGroup {...this.extendInputProps('phone')} getRef={b => this.phoneInput = b}/>
        <FormGroup {...this.extendInputProps('password')} getRef={b => this.passwordInput = b}/>
        <FlexGrid align="center" className={s.buttons}>
          <Button disabled={isFetching} buttonType='submit' type="pink"
                  className={s.button}>
            Готово
          </Button>
          <Content tag={RouterLink} to="/login"
                   gray size="5" className={s.reset}>
            Уже есть аккаунт? Вход
          </Content>
        </FlexGrid>
      </form>
    )
  }
}
